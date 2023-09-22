import { MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { closeModal, showModal } from '../store/reduces/replyModalSlice';

type CommentSvgProps = {
    replyTo: string | undefined;
    threadId: string | undefined;
};

const CommentSvg = ({ replyTo, threadId }: CommentSvgProps) => {
    const replyModal = useAppSelector((state) => state.replyModal);
    const dispatch = useAppDispatch();

    const onOpen = (event: MouseEvent) => {
        event.preventDefault();

        if (replyModal.open) {
            dispatch(closeModal());
        } else {
            dispatch(showModal({ open: !replyModal.open, replyTo, threadId }));
        }
    };

    return (
        <svg
            className="cursor-pointer"
            aria-label="Comment"
            color=""
            fill=""
            height="20"
            role="img"
            viewBox="0 0 24 24"
            width="20"
            onClick={onOpen}
        >
            <title>Comment</title>
            <path
                d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
            ></path>
        </svg>
    );
};

export default CommentSvg;
