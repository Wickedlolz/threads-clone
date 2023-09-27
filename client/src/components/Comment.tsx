import { useState } from 'react';
import { threadService } from '../services';
import { useAppDispatch, useAppSelector } from '../store';
import { updateThreadReply } from '../store/reduces/threadsSlice';
import { IReplay } from '../interfaces/thread';
import moment from 'moment';
import { toast } from 'react-toastify';

import { BsThreeDots } from 'react-icons/bs';
import LikeSvg from './LikeSvg';

type CommentProps = {
    reply: IReplay;
};

const Comment = ({ reply }: CommentProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const liked: boolean = reply.likes?.includes(user?._id || '');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const passedTime = moment(reply?.createdAt).fromNow();

    /**
     * Handles liking or unliking a reply by its ID. Updates the thread reply data accordingly.
     * If loading is in progress, the function does nothing.
     *
     * @returns {void}
     */
    const handleLikeAndUnlikeReply = () => {
        if (isLoading) return;

        setIsLoading(true);
        threadService
            .likeReplyById(reply._id)
            .then((replyData) => {
                dispatch(updateThreadReply(replyData));
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <div className="flex gap-4 py-2 my-2 w-full">
                <img
                    className="w-9 h-9 rounded-full"
                    src={reply?.userProfilePic}
                    alt={reply?.username}
                />
                <div className="flex flex-col gap-1 w-full ">
                    <div className="flex justify-between w-full items-center">
                        <p className="text-sm font-bold">{reply?.username}</p>
                        <div className="flex gap-2 items-center">
                            <p className="text-sm text-gray-400">
                                {passedTime}
                            </p>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p>{reply?.text}</p>
                    <div className="flex gap-3 my-2">
                        <LikeSvg
                            liked={liked}
                            handleLikeAndUnlike={handleLikeAndUnlikeReply}
                        />
                        <p className="text-gray-500 text-sm">
                            {reply.likes?.length} likes
                        </p>
                    </div>
                </div>
            </div>
            <p className="w-full h-[1px] bg-gray-500"></p>
        </>
    );
};

export default Comment;
