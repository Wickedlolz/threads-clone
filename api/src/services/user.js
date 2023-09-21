const User = require('../models/User');

exports.getUserByUsername = async (username) => {
    const user = await User.findOne({ username });

    return user;
};

exports.followUnfollow = async (userId, currentUserId) => {
    const userToModify = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToModify || !currentUser) {
        return { error: 'User not found' };
    }

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
        // Unfollow user
        await User.findByIdAndUpdate(userId, {
            $pull: { followers: currentUserId },
        });
        await User.findByIdAndUpdate(currentUserId, {
            $pull: { following: userId },
        });
        return { message: 'User unfollowed successfully' };
    } else {
        // Follow user
        await User.findByIdAndUpdate(userId, {
            $push: { followers: currentUserId },
        });
        await User.findByIdAndUpdate(currentUserId, {
            $push: { following: userId },
        });
        return { message: 'User followed successfully' };
    }
};
