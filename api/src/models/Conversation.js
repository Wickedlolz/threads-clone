/* eslint-disable quotes */
const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const conversationSchema = new Schema(
    {
        participants: [{ type: ObjectId, ref: 'User' }],
        lastMessage: {
            text: String,
            sender: { type: ObjectId, ref: 'User' },
            seen: {
                type: Boolean,
                default: false,
            },
        },
    },
    { timestamps: true }
);

const Conversation = model('Conversation', conversationSchema);

module.exports = Conversation;
