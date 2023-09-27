const Thread = require('../models/Thread');
const Reply = require('../models/Reply');
const User = require('../models/User');
const { v2: cloudinary } = require('cloudinary');

exports.getFeed = async function (userId) {
    const user = await User.findById(userId);
    const following = user.following;

    const feed = await Thread.find({ postedBy: { $in: following } })
        .populate('postedBy')
        .populate('replies')
        .sort({
            createdAt: -1,
        })
        .limit(10)
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
        .populate('replies')
        .limit(10)
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
    const thread = await Thread.findById(threadId)
        .populate('postedBy')
        .populate('replies')
        .lean();

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
    const thread = await Thread.findById(threadId)
        .populate('postedBy')
        .populate('replies');
    const isLiked = thread.likes.includes(userId);

    if (isLiked) {
        thread.likes.pull(userId);
    } else {
        thread.likes.push(userId);
    }

    await thread.save();

    const result = {
        ...thread._doc,
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

exports.replyById = async function (
    threadId,
    userId,
    profilePic,
    username,
    text
) {
    const thread = await Thread.findById(threadId)
        .populate('postedBy')
        .populate('replies');

    const reply = new Reply({
        userId,
        userProfilePic: profilePic,
        username,
        text,
    });

    thread.replies.push(reply);

    await reply.save();
    await thread.save();

    const result = {
        ...thread._doc,
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

exports.likeReplyById = async function (userId, replyId) {
    const reply = await Reply.findById(replyId);
    const isLiked = reply.likes.includes(userId);

    if (isLiked) {
        reply.likes.pull(userId);
    } else {
        reply.likes.push(userId);
    }

    await reply.save();

    return reply;
};

exports.deleteById = async function (threadId, userId) {
    const thread = await Thread.findById(threadId);

    if (thread.img) {
        const imgId = thread.img.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(imgId);
    }

    const deletedThread = await Thread.findByIdAndRemove(threadId);
    await Reply.deleteMany({ userId });

    return deletedThread;
};
