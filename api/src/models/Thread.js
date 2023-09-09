/* eslint-disable quotes */
const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const threadSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        owner: {
            type: ObjectId,
            ref: 'User',
            required: true,
        },
        likes: [
            {
                type: ObjectId,
                ref: 'User',
            },
        ],
        comments: [
            {
                type: ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: true }
);

const Thread = model('Thread', threadSchema);

module.exports = Thread;
