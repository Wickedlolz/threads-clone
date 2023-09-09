/* eslint-disable quotes */
const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
    userId: {
        type: ObjectId,
        ref: 'User',
    },
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;
