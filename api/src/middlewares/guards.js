/* eslint-disable quotes */
const threadService = require('../services/thread');

exports.isAuth = function () {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.status(401).json({ message: 'Please log in.' });
        }
    };
};

exports.isGuest = function () {
    return (req, res, next) => {
        if (req.user) {
            res.status(403).json({ message: 'You already logged in.' });
        } else {
            next();
        }
    };
};

exports.isOwner = function () {
    return async (req, res, next) => {
        const { threadId } = req.params;
        const userId = req.user.id;
        const thread = await threadService.getById(threadId);

        if (thread.postedBy._id.toString() === userId) {
            next();
        } else {
            res.status(401).json({ message: 'You cannot modify this thread.' });
        }
    };
};
