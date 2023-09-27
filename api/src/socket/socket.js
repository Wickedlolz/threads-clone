const { Server } = require('socket.io');
const https = require('https');
const express = require('express');
const Message = require('../models/Message.js');
const Conversation = require('../models/Conversation.js');

const whitelist = [
    'http://localhost:5000',
    'http://localhost:5173',
    'https://threads-clone-roan-three.vercel.app',
];

const app = express();
const server = https.createServer(app);
const io = new Server(server, {
    cors: {
        origin: whitelist,
        credentials: true,
    },
});

const getRecipientSocketId = (recipientId) => {
    return userSocketMap[recipientId];
};

const userSocketMap = {};

io.on('connection', (socket) => {
    console.log('user connected', socket.id);
    const userId = socket.handshake.query.userId;

    if (userId != 'undefined') {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('markMessagesAsSeen', async ({ conversationId, userId }) => {
        try {
            await Message.updateMany(
                { conversationId: conversationId, seen: false },
                { $set: { seen: true } }
            );
            await Conversation.updateOne(
                { _id: conversationId },
                { $set: { 'lastMessage.seen': true } }
            );
            io.to(userSocketMap[userId]).emit('messagesSeen', {
                conversationId,
            });
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

module.exports = { io, server, app, getRecipientSocketId };
