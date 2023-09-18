/* eslint-disable quotes */
const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const threadSchema = new Schema(
    {
        postedBy: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        text: {
            type: String,
            maxLength: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: [ObjectId],
            ref: 'User',
            default: [],
        },
        replies: [
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
            },
        ],
    },
    { timestamps: true }
);

const Thread = model('Thread', threadSchema);

module.exports = Thread;
