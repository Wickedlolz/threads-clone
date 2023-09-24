const router = require('express').Router();

const messageService = require('../services/message');
const { getRecipientSocketId, io } = require('../socket/socket');
const { isAuth } = require('../middlewares/guards');
const { mapErrors } = require('../utils/mapErrors');

router.post('/', isAuth(), async (req, res) => {
    const { recipientId, message, img } = req.body;
    const senderId = req.user.id;

    try {
        const newMessage = await messageService.sendMessage(
            senderId,
            recipientId,
            message,
            img
        );

        const recipientSocketId = getRecipientSocketId(recipientId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('newMessage', newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/conversations', isAuth(), async (req, res) => {
    const userId = req.user.id;

    try {
        const conversations = await messageService.getConversations(userId);
        res.json(conversations);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.post('/conversations', isAuth(), async (req, res) => {
    const userId = req.user.id;
    const { participantId } = req.body;

    try {
        const conversation = await messageService.createConversation(
            userId,
            participantId
        );
        res.json(conversation);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

router.get('/:participantId', isAuth(), async (req, res) => {
    const { participantId } = req.params;
    const userId = req.user.id;

    try {
        const messages = await messageService.getMessages(
            userId,
            participantId
        );
        res.json(messages);
    } catch (error) {
        const errors = mapErrors(error);
        res.status(400).json({ message: errors });
    }
});

module.exports = router;
