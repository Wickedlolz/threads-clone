import { useState } from 'react';
import { IThread } from '../interfaces/thread';
import { useAppSelector } from '../store';
import { useThreadActions } from '../hooks/useThreadActions';

import RepostSvg from './RepostSvg';
import ShareSvg from './ShareSvg';
import CommentSvg from './CommentSvg';
import LikeSvg from './LikeSvg';
import ReplyModal from './ReplyModal';

type ActionsProps = {
    thread: IThread | null;
};

const Actions = ({ thread }: ActionsProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const { handleLikeAndUnlike, handleRepostThread } =
        useThreadActions(thread);
    const [openReplyModal, setOpenReplyModal] = useState<boolean>(false);
    const liked = thread?.likes.includes(user?._id || '') || false;

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
