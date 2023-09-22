/* eslint-disable quotes */
const router = require('express').Router();

const authService = require('../services/auth');
const { mapErrors } = require('../utils/mapErrors');
const { isAuth, isGuest } = require('../middlewares/guards');
const { body, validationResult } = require('express-validator');

router.post(
    '/register',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Invalid email adress!'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long!'),

    async (req, res) => {
        const { errors } = validationResult(req);
        const { email, password, name, username, photoURL } = req.body;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const user = await authService.register(
                email,
                password,
                name,
                username,
                photoURL
            );
            const token = await authService.createToken(user);

            const result = {
                email: user.email,
                _id: user._id,
                name: user.name,
                username: user.username,
                createdAt: user.createdAt,
                photoURL: user.photoURL,
                followers: user.followers,
                following: user.following,
                bio: user.bio,
            };

            res.cookie(process.env.COOKIE_NAME, token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
            res.status(201).json(result);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.post(
    '/login',
    isGuest(),
    body('email').trim(),
    body('password').trim(),
    body('email')
        .notEmpty()
        .withMessage('Email is required!')
        .bail()
        .isEmail()
        .withMessage('Invalid email adress!'),
    body('password')
        .notEmpty()
        .withMessage('Password is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { email, password } = req.body;

        try {
            if (errors.lenght > 0) {
                throw errors;
            }

            const user = await authService.login(email, password);
            const token = await authService.createToken(user);

            const result = {
                email: user.email,
                _id: user._id,
                name: user.name,
                username: user.username,
                createdAt: user.createdAt,
                photoURL: user.photoURL,
                followers: user.followers,
                following: user.following,
                bio: user.bio,
            };

            res.cookie(process.env.COOKIE_NAME, token, {
                httpOnly: true,
                secure: true,
                sameSite: 'lax',
            });
            res.status(200).json(result);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.post(
    '/reset-password',
    isAuth(),
    body('newPassword').trim(),
    body('newPassword')
        .notEmpty()
        .withMessage('New Password is required!')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Password must be at least 3 characters long!'),
    async (req, res) => {
        const { errors } = validationResult(req);
        const { newPassword } = req.body;
        const userId = req.user.id;

        try {
            if (errors.length > 0) {
                throw errors;
            }

            const userWithResetedPassword = await authService.resetPassword(
                userId,
                newPassword
            );

            const result = {
                email: userWithResetedPassword.email,
                _id: userWithResetedPassword._id,
                name: userWithResetedPassword.name,
                username: userWithResetedPassword.username,
                createdAt: userWithResetedPassword.createdAt,
                photoURL: userWithResetedPassword.photoURL,
                followers: userWithResetedPassword.followers,
                following: userWithResetedPassword.following,
                bio: userWithResetedPassword.bio,
            };

            res.status(201).json(result);
        } catch (error) {
            const errors = mapErrors(error);
            res.status(400).json({ message: errors });
        }
    }
);

router.post('/logout', isAuth(), async (req, res) => {
    const token = req.cookies[process.env.COOKIE_NAME];

    try {
        await authService.blacklistToken(token);

        res.clearCookie(process.env.COOKIE_NAME, {
            httpOnly: true,
            maxAge: new Date(Date.now()),
        })
            .status(204)
            .json({ message: 'Successfully logged out.' });
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/profile', isAuth(), async (req, res) => {
    const userId = req.user.id;

    try {
        const user = await authService.getProfile(userId);
        res.json(user);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.put('/profile', isAuth(), async (req, res) => {
    const userId = req.user.id;
    const { name, username, email, photoURL, bio } = req.body;

    try {
        const userData = {
            name,
            username,
            email,
            photoURL,
            bio,
        };
        const updatedUser = await authService.updateProfile(userId, userData);

        const result = {
            email: updatedUser.email,
            _id: updatedUser._id,
            name: updatedUser.name,
            username: updatedUser.username,
            createdAt: updatedUser.createdAt,
            photoURL: updatedUser.photoURL,
            followers: updatedUser.followers,
            following: updatedUser.following,
            bio: updatedUser.bio,
        };

        res.status(201).json(result);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
