const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const { v2: cloudinary } = require('cloudinary');

exports.sendMessage = async function (senderId, recipientId, message, img) {
    let conversation = await Conversation.findOne({
        participants: { $all: [senderId, recipientId] },
    });

    if (!conversation) {
        conversation = new Conversation({
            participants: [senderId, recipientId],
            lastMessage: {
                text: message,
                sender: senderId,
            },
        });
        await conversation.save();
    }

    if (img) {
        const uploadedResponse = await cloudinary.uploader.upload(img);
        img = uploadedResponse.secure_url;
    }

    const newMessage = new Message({
        conversationId: conversation._id,
        sender: senderId,
        text: message,
        img: img || '',
    });

    await Promise.all([
        newMessage.save(),
        conversation.updateOne({
            lastMessage: {
                text: message,
                sender: senderId,
            },
        }),
    ]);

    return newMessage;
};

exports.getConversations = async function (userId) {
    const conversations = await Conversation.find({
        participants: userId,
    }).populate({
        path: 'participants',
        select: 'username name photoURL',
    });

    // remove the current user from the participants array
    conversations.forEach((conversation) => {
        conversation.participants = conversation.participants.filter(
            (participant) => participant._id.toString() !== userId.toString()
        );
    });

    return conversations;
};

exports.createConversation = async function (userId, participantId) {
    const conversation = new Conversation({
        participants: [participantId, userId],
    });

    await conversation.save();

    return conversation;
};

exports.deleteConversationById = async function (conversationId) {
    const deletedConversarion = await Conversation.findByIdAndRemove(
        conversationId
    );

    const messages = await Message.find({ conversationId });

    for (const message of messages) {
        if (message.img) {
            const imgId = message.img.split('/').pop().split('.')[0];
            await cloudinary.uploader.destroy(imgId);
        }
    }

    await Message.deleteMany({ conversationId });

    return deletedConversarion;
};

exports.getMessages = async function (userId, participantId) {
    const conversation = await Conversation.findOne({
        participants: { $all: [userId, participantId] },
    });

    if (!conversation) {
        throw { message: 'Conversation not found' };
    }

    const messages = await Message.find({
        conversationId: conversation._id,
    }).sort({ createdAt: 1 });

    return messages;
};
