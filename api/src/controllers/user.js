const router = require('express').Router();

const { isAuth } = require('../middlewares/guards');
const userService = require('../services/user');
const { mapErrors } = require('../utils/mapErrors');

router.get('/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const user = await userService.getUserByUsername(username);

        if (!user) {
            res.json({ message: 'User not found' });
        }

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

        res.json(result);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/follow/:userId', isAuth(), async (req, res) => {
    const { userId } = req.params;
    const id = req.user.id;

    try {
        if (id === userId) {
            return res
                .status(400)
                .json({ error: 'You cannot follow/unfollow yourself' });
        }

        const modifiedUser = await userService.followUnfollow(userId, id);

        res.json(modifiedUser);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
