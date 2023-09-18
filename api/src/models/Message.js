const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const messageSchema = new Schema(
    {
        conversationId: { type: ObjectId, ref: 'Conversation' },
        sender: { type: ObjectId, ref: 'User' },
        text: String,
        seen: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

const Message = model('Message', messageSchema);

module.exports = Message;
