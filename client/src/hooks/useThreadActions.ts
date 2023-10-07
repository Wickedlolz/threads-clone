import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { threadService } from '../services';
import { toast } from 'react-toastify';
import { IThread } from '../interfaces/thread';
import { updateThread } from '../store/reduces/threadsSlice';

export const useThreadActions = (thread: IThread | null) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    /**
     * Handles the like and unlike functionality for a thread,
     * updating the thread's like status and notifying the user of actions.
     *
     * @returns {void}
     */
    const handleLikeAndUnlike = () => {
        if (isLoading) {
            return;
        }

        if (!user) {
            toast.error(
                'You must be logged in to like and unlike this thread.'
            );
        }

        setIsLoading(true);

        threadService
            .likeUnlikeThreadById(thread!._id)
            .then((data) => {
                dispatch(updateThread(data));
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    };

    /**
     * Handles reposting a thread if the user is logged in and the thread has not already been reposted by the user.
     * If the user is not logged in, an error message is displayed.
     * If the thread has already been reposted by the user, an info message is displayed.
     * Handles asynchronous reposting using the `threadService` and updates the thread data accordingly.
     *
     * @returns {void}
     */
    const handleRepostThread = () => {
        if (isLoading) {
            return;
        }

        if (!user) {
            toast.error(
                'You must be logged in to like and unlike this thread.'
            );
        }

        const isAlreadyRepost = thread?.repostedBy?.find(
            (u) => u._id === user?._id
        );

        if (isAlreadyRepost) {
            toast.info('You already repost this thread!');
            return;
        }

        setIsLoading(true);

        threadService
            .repostThread(thread!._id)
            .then((threadData) => {
                dispatch(updateThread(threadData));
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    };

    return { handleLikeAndUnlike, handleRepostThread };
};
