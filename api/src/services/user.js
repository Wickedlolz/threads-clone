const User = require('../models/User');

exports.getUserByUsername = async (username) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw { message: 'User not found' };
    }

    return user;
};

exports.followUnfollow = async (userId, currentUserId) => {
    const userToModify = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!userToModify || !currentUser) {
        throw { message: 'User not found' };
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

exports.getSuggestedUsers = async function (userId) {
    const usersFollowedByYou = await User.findById(userId).select('following');

    const users = await User.aggregate([
        {
            $match: {
                _id: { $ne: userId },
            },
        },
        {
            $sample: { size: 10 },
        },
    ]);

    const filteredUsers = users.filter(
        (user) => !usersFollowedByYou.following.includes(user._id)
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    return suggestedUsers;
};
