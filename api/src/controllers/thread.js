const router = require('express').Router();

const threadService = require('../services/thread');

const { isAuth } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');
const { mapErrors } = require('../utils/mapErrors');

router.get('/', async (req, res) => {
    try {
        const posts = await threadService.getAll();

        res.json(posts);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post(
    '/',
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
        const { title, description } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const newPost = await threadService.create(
                title,
                description,
                req.user._id
            );
            res.json(newPost);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

module.exports = router;
