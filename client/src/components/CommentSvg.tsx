import { Dispatch } from 'react';

type CommentSvgProps = {
    setOpenReplyModal: Dispatch<React.SetStateAction<boolean>>;
};

const CommentSvg = ({ setOpenReplyModal }: CommentSvgProps) => {
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
            onClick={() => setOpenReplyModal((state) => !state)}
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
