const router = require('express').Router();

const threadService = require('../services/thread');

const { isAuth } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

router.get('/feed', async (req, res) => {
    const userId = req.user.id;

    try {
        const feed = await threadService.getFeed(userId);

        res.json(feed);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post(
    '/',
    isAuth(),
    body('text').trim(),
    body('text')
        .notEmpty()
        .withMessage('Text is required!')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Text must be at least 10 characters long')
        .isLength({ max: 500 })
        .withMessage('Text must be less then 500 characters long'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const userId = req.user.id;
        const { text, img } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const newPost = await threadService.create(userId, text, img);
            res.status(201).json(newPost);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.get('/:threadId', async (req, res) => {
    const { threadId } = req.params;

    try {
        const thread = await threadService.getById(threadId);
        res.json(thread);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.put(
    '/:threadId',
    isAuth(),
    body('title').trim(),
    body('description').trim(),
    body('title')
        .notEmpty()
        .withMessage('Post Title is required!')
        .bail()
        .isLength({ min: 5 })
        .withMessage('Post Title must be at least 5 characters long'),
    body('description')
        .notEmpty()
        .withMessage('Description is required!')
        .bail()
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { threadId } = req.params;
        const { title, description } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const updatedThread = await threadService.updateById(
                threadId,
                title,
                description
            );

            res.status(201).json(updatedThread);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.post('/like', isAuth(), async (req, res) => {
    const { threadId } = req.body;
    const userId = req.user.id;

    try {
        const thread = await threadService.like(threadId, userId);
        res.status(201).json(thread);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post(
    '/reply/:threadId',
    isAuth(),
    body('text').trim(),
    body('text').notEmpty().withMessage('Text field is required'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { threadId } = req.params;
        const userId = req.user.id;
        const profilePic = req.user.photoURL;
        const username = req.user.username;
        const { text } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const thread = await threadService.replyById(
                threadId,
                userId,
                profilePic,
                username,
                text
            );

            res.status(201).json(thread);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.delete('/:threadId', isAuth(), async (req, res) => {
    const { threadId } = req.params;

    try {
        const deletedThread = await threadService.deleteById(threadId);
        res.json(deletedThread);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
