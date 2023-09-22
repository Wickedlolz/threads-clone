const Thread = require('../models/Thread');
const User = require('../models/User');
const { v2: cloudinary } = require('cloudinary');

exports.getFeed = async function (userId) {
    const user = await User.findById(userId);
    const following = user.following;

    const feed = await Thread.find({ postedBy: { $in: following } })
        .populate('postedBy')
        .sort({
            createdAt: -1,
        })
        .lean();

    const result = feed.map((thread) => {
        return {
            ...thread,
            postedBy: {
                createdAt: thread.postedBy.createdAt,
                email: thread.postedBy.email,
                updatedAt: thread.postedBy.updatedAt,
                _id: thread.postedBy._id,
                name: thread.postedBy.name,
                username: thread.postedBy.username,
                photoURL: thread.postedBy.photoURL,
                followers: thread.postedBy.followers,
                following: thread.postedBy.following,
                bio: thread.postedBy.bio,
            },
        };
    });

    return result;
};

exports.getUserThreads = async function (username) {
    const user = await User.findOne({ username });

    if (!user) {
        throw { message: 'User not found' };
    }

    const threads = await Thread.find({ postedBy: user._id })
        .sort({ createdAt: -1 })
        .populate('postedBy')
        .lean();

    const result = threads.map((thread) => {
        return {
            ...thread,
            postedBy: {
                createdAt: thread.postedBy.createdAt,
                email: thread.postedBy.email,
                updatedAt: thread.postedBy.updatedAt,
                _id: thread.postedBy._id,
                name: thread.postedBy.name,
                username: thread.postedBy.username,
                photoURL: thread.postedBy.photoURL,
                followers: thread.postedBy.followers,
                following: thread.postedBy.following,
                bio: thread.postedBy.bio,
            },
        };
    });

    return result;
};

exports.create = async function (userId, text, img) {
    const thread = new Thread({ postedBy: userId, text });

    if (img) {
        const uploadedResponse = await cloudinary.uploader.upload(img);

        thread.img = uploadedResponse.secure_url;
    }

    await thread.save();

    return thread;
};

exports.getById = async function (threadId) {
    const thread = await Thread.findById(threadId).populate('postedBy').lean();

    const result = {
        ...thread,
        postedBy: {
            createdAt: thread.postedBy.createdAt,
            email: thread.postedBy.email,
            updatedAt: thread.postedBy.updatedAt,
            _id: thread.postedBy._id,
            name: thread.postedBy.name,
            username: thread.postedBy.username,
            photoURL: thread.postedBy.photoURL,
            followers: thread.postedBy.followers,
            following: thread.postedBy.following,
            bio: thread.postedBy.bio,
        },
    };

    return result;
};

exports.updateById = async function (threadId, text, img) {
    const thread = await Thread.findById(threadId);
    thread.text = text;

    if (img) {
        thread.img = img;
    }

    await thread.save();

    return thread;
};

exports.like = async function (threadId, userId) {
    const thread = await Thread.findById(threadId);
    const isLiked = thread.likes.includes(userId);

    if (isLiked) {
        thread.likes.pull(userId);
    } else {
        thread.likes.push(userId);
    }

    await thread.save();

    return thread;
};

exports.replyById = async function (
    threadId,
    userId,
    profilePic,
    username,
    text
) {
    const thread = await Thread.findById(threadId);

    const reply = { userId, userProfilePic: profilePic, username, text };

    thread.replies.push(reply);

    await thread.save();

    return thread;
};

exports.deleteById = async function (threadId) {
    const deletedThread = await Thread.findByIdAndRemove(threadId);

    return deletedThread;
};
