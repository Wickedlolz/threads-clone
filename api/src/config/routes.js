/* eslint-disable quotes */
const router = require('express').Router();

const authController = require('../controllers/auth');
const threadController = require('../controllers/thread');

router.get('/', (req, res) => {
    res.json({ message: 'Resource not found.' });
});
router.use('/api/auth', authController);
router.use('/api/threads', threadController);

module.exports = router;
