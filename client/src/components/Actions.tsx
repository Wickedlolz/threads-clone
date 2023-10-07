import { useState } from 'react';
import { IThread } from '../interfaces/thread';
import { useAppDispatch, useAppSelector } from '../store';
import { toast } from 'react-toastify';
import { threadService } from '../services';

import RepostSvg from './RepostSvg';
import ShareSvg from './ShareSvg';
import CommentSvg from './CommentSvg';
import LikeSvg from './LikeSvg';
import { updateThread } from '../store/reduces/threadsSlice';
import ReplyModal from './ReplyModal';

type ActionsProps = {
    thread: IThread | null;
};

const Actions = ({ thread }: ActionsProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [openReplyModal, setOpenReplyModal] = useState<boolean>(false);
    const liked: boolean = thread?.likes.includes(user?._id || '') || false;
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

        const isAlreadyRepost = thread?.repostedBy.find(
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

    return (
        <div>
            <div className="flex gap-3 my-2">
                <LikeSvg
                    liked={liked}
                    handleLikeAndUnlike={handleLikeAndUnlike}
                />
                <CommentSvg setOpenReplyModal={setOpenReplyModal} />
                <RepostSvg
                    thread={thread}
                    handleRepostThread={handleRepostThread}
                />
                <ShareSvg />
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-gray-500 font-sm">
                    {thread?.replies.length} replies
                </p>
                <div className="w-0.5 h-0.5 rounded-full bg-gray-500"></div>
                <p className="text-gray-500 font-sm">
                    {thread?.likes.length} likes
                </p>
                <div className="w-0.5 h-0.5 rounded-full bg-gray-500"></div>
                <p className="text-gray-500 font-sm">
                    {thread?.repostedBy?.length || 0} reposted
                </p>
            </div>

            {openReplyModal && (
                <ReplyModal
                    thread={thread}
                    setOpenReplyModal={setOpenReplyModal}
                />
            )}
        </div>
    );
};

export default Actions;
