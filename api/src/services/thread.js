const Thread = require('../models/Thread');
const Comment = require('../models/Comment');

exports.getAll = async function () {
    const threads = await Thread.find({}).populate('owner').lean();

    const result = threads.map((thread) => {
        return {
            ...thread,
            owner: {
                _id: thread.owner._id,
                email: thread.owner.email,
                firstName: thread.owner.firstName,
                lastName: thread.owner.lastName,
                photoURL: thread.owner.photoURL,
                createdAt: thread.owner.createdAt,
                updatedAt: thread.owner.updatedAt,
            },
        };
    });

    return result;
};

exports.create = async function (title, description, owner) {
    const thread = new Thread({ title, description, owner });
    await thread.save();

    return thread;
};

exports.getById = async function (threadId) {
    const thread = await Thread.findById(threadId);
    return thread;
};

exports.updateById = async function (threadId, title, description) {
    const thread = await Thread.findById(threadId);
    thread.title = title;
    thread.description = description;

    await thread.save();

    return thread;
};

exports.like = async function (threadId, userId) {
    const thread = await Thread.findById(threadId);
    const isLiked = thread.likes.find((user) => user === userId);

    if (isLiked) {
        throw new Error('You already like this thread!');
    }

    thread.likes.push(userId);
    await thread.save();

    return thread;
};

exports.dislike = async function (threadId, userId) {
    const thread = await Thread.findById(threadId);

    thread.likes.pull(userId);
    await thread.save();

    return thread;
};

exports.comment = async function (threadId, comment, userId) {
    const thread = await Thread.findById(threadId);
    const message = new Comment({
        comment,
        userId,
    });

    await message.save();

    thread.comment.push(message);

    thread.save();

    return thread;
};
