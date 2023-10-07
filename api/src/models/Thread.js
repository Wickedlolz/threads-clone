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
        replies: {
            type: [ObjectId],
            ref: 'Reply',
            default: [],
        },
        repostedBy: {
            type: [ObjectId],
            ref: 'User',
            default: [],
        },
    },
    { timestamps: true }
);

const Thread = model('Thread', threadSchema);

module.exports = Thread;
