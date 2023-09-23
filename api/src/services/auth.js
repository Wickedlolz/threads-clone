/* eslint-disable quotes */
const User = require('../models/User');
const TokenBlacklist = require('../models/TokenBlacklist');
const Thread = require('../models/Thread');
const jwt = require('jsonwebtoken');
const { compare, hash } = require('bcrypt');
const { v2: cloudinary } = require('cloudinary');

exports.register = async function (email, password, name, username, photoURL) {
    const existing = await getUserByEmail(email);

    if (existing) {
        throw new Error('Email is taken');
    }

    const hashedPassword = await hash(
        password,
        Number(process.env.SALT_ROUNDS)
    );

    const user = new User({
        email,
        password: hashedPassword,
        name,
        username,
        photoURL,
    });

    await user.save();

    return user;
};

exports.login = async function (email, passsword) {
    const user = await getUserByEmail(email);

    if (!user) {
        throw new Error('Incorect email or password!');
    }

    const isIdentical = await compare(passsword, user.password);

    if (!isIdentical) {
        throw new Error('Incorect email or password!');
    }

    return user;
};

exports.resetPassword = async function (userId, newPassword) {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found!');
    }

    const newHashedPassword = await hash(
        newPassword,
        Number(process.env.SALT_ROUNDS)
    );

    user.password = newHashedPassword;

    await user.save();

    return user;
};

exports.getProfile = async function (userId) {
    const user = await User.findById(userId);

    const modifiedUser = {
        createdAt: user.createdAt,
        email: user.email,
        updatedAt: user.updatedAt,
        _id: user._id,
        name: user.name,
        username: user.username,
        photoURL: user.photoURL,
        followers: user.followers,
        following: user.following,
        bio: user.bio,
    };

    return modifiedUser;
};

exports.updateProfile = async function (userId, userData) {
    const user = await User.findById(userId);

    if (userData.photoURL) {
        if (user.photoURL) {
            await cloudinary.uploader.destroy(
                user.photoURL.split('/').pop().split('.')[0]
            );
        }

        const uploadedResponse = await cloudinary.uploader.upload(
            userData.photoURL
        );
        userData.photoURL = uploadedResponse.secure_url;
    }

    user.name = userData.name || user.name;
    user.username = userData.username || user.username;
    user.email = userData.email || user.email;
    user.photoURL = userData.photoURL || user.photoURL;
    user.bio = userData.bio || user.bio;

    await user.save();

    await Thread.updateMany(
        { 'replies.userId': userId },
        {
            $set: {
                'replies.$[reply].username': user.username,
                'replies.$[reply].userProfilePic': user.profilePic,
            },
        },
        { arrayFilters: [{ 'reply.userId': userId }] }
    );

    return user;
};

exports.createToken = function (user) {
    const tokenPromise = new Promise((resolve, reject) => {
        const payload = {
            name: user.name,
            username: user.username,
            email: user.email,
            photoURL: user.photoURL,
            _id: user._id,
        };

        jwt.sign(payload, process.env.JWT_SECRET, (error, token) => {
            if (error) {
                return reject(error);
            }

            resolve(token);
        });
    });

    return tokenPromise;
};

exports.validateToken = function (token) {
    return jwt.verify(token, process.env.JWT_SECRET, function (error, decoded) {
        if (error) {
            throw new Error(error.message);
        }

        return decoded;
    });
};

exports.isBlacklistedToken = async function (token) {
    const isBlacklisted = await TokenBlacklist.findOne({ token });
    return isBlacklisted;
};

exports.blacklistToken = async function (token) {
    const blacklistedToken = new TokenBlacklist({ token });
    blacklistedToken.save();
};

async function getUserByEmail(email) {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, 'i') });
    return user;
}
