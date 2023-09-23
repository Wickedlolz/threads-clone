/* eslint-disable quotes */
const router = require('express').Router();

const authController = require('../controllers/auth');
const threadController = require('../controllers/thread');
const userController = require('../controllers/user');
const messageController = require('../controllers/message');

router.use('/api/v1/auth', authController);
router.use('/api/v1/threads', threadController);
router.use('/api/v1/users', userController);
router.use('/api/v1/messages', messageController);

router.get('/api/test', (req, res) => {
    res.json({
        name: 'Threads REST API',
        version: '1.0.0',
        description: 'REST API for Threads Web App',
        main: 'index.js',
    });
});

router.all('*', (req, res) => {
    res.status(404).json({ message: 'Resource not found!' });
});

module.exports = router;
