/* eslint-disable quotes */
const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const conversationSchema = new Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        userId: {
            type: ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

const Conversation = model('Conversation', conversationSchema);

module.exports = Conversation;
