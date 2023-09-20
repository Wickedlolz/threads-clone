const Thread = require('../models/Thread');

exports.getAll = async function () {
    const threads = await Thread.find({}).populate('postedBy').lean();

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
        thread.img = img;
    }

    await thread.save();

    return thread;
};

exports.getById = async function (threadId) {
    const thread = await Thread.findById(threadId).populate('postedBy').lean();

    thread.postedBy = {
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
    };

    return thread;
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

exports.comment = async function (threadId, comment, userId) {
    const thread = await Thread.findById(threadId);
    // const message = new Comment({
    //     comment,
    //     userId,
    // });

    // await message.save();

    // thread.comment.push(message);

    thread.save();

    return thread;
};

exports.deleteById = async function (threadId) {
    const deletedThread = await Thread.findByIdAndRemove(threadId);

    return deletedThread;
};
