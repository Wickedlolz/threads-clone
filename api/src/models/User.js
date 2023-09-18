/* eslint-disable quotes */
const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        photoURL: {
            type: String,
            default:
                'https://play-lh.googleusercontent.com/Bb7gACH7Zj5F-KytonoNrHLQsJxhwlhJpJZ6Y5yt41u4jVTG3u0kYd-1a86qAHb-ow=s94-rw',
        },
        followers: {
            type: [String],
            default: [],
        },
        following: {
            type: [String],
            default: [],
        },
        bio: {
            type: String,
            default: '',
        },
    },
    { timestamps: true }
);

userSchema.index(
    { email: 1 },
    {
        unique: true,
        collation: {
            locale: 'en',
            strength: 2,
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
