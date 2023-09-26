const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const replySchema = new Schema(
    {
        userId: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        userProfilePic: {
            type: String,
        },
        username: {
            type: String,
        },
        likes: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
    },
    { timestamps: true }
);

const Reply = model('Reply', replySchema);

module.exports = Reply;
