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
        select: 'username profilePic',
    });

    // remove the current user from the participants array
    conversations.forEach((conversation) => {
        conversation.participants = conversation.participants.filter(
            (participant) => participant._id.toString() !== userId.toString()
        );
    });

    return conversations;
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
