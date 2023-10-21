import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { IUser } from '../interfaces/user';
import { followUnfollowUser, updateUser } from '../store/reduces/threadsSlice';
import { toast } from 'react-toastify';

const useFollowUnfollow = (user: IUser) => {
    const authUser = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [following, setFollowing] = useState<boolean>(
        user.followers.includes(authUser!._id)
    );

    /**
     * Handles the logic for following or unfollowing a user.
     *
     * This function toggles the follow/unfollow status for a user by invoking
     * the appropriate service method and updating the user's followers accordingly.
     * It displays a success message upon successful follow or unfollow,
     * and handles errors by displaying an error message.
     *
     * @returns {void}
     * @throws {Error} If there's an error during the follow/unfollow operation.
     */
    const handleFollowUnfollow = (): void => {
        dispatch(followUnfollowUser(user._id))
            .unwrap()
            .then(() => {
                if (following) {
                    const updatedUser = {
                        ...user,
                        followers: [...user.followers].filter(
                            (userId) => userId !== authUser?._id
                        ),
                    };
                    dispatch(updateUser(updatedUser));
                    setFollowing(false);

                    toast.success(`Unfollowing ${user.name}`);
                } else {
                    const updatedUser = {
                        ...user,
                        followers: [...user.followers, authUser?._id],
                    };
                    dispatch(updateUser(updatedUser));
                    setFollowing(true);
                    toast.success(`Following ${user.name}`);
                }
            })
            .catch((error) => toast.error(error.message));
    };

    return { handleFollowUnfollow, following };
};

export default useFollowUnfollow;
