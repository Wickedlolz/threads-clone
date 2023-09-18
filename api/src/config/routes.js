/* eslint-disable quotes */
const router = require('express').Router();

const authController = require('../controllers/auth');
const threadController = require('../controllers/thread');

router.use('/api/v1/auth', authController);
router.use('/api/v1/threads', threadController);

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
