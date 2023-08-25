const Thread = require('../models/Thread');

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
    thread.save();

    return thread;
};
