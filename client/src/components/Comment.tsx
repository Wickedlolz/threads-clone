import { useState } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import Actions from './Actions';
import { IReplay } from '../interfaces/thread';
import moment from 'moment';

type CommentProps = {
    reply: IReplay;
};

const Comment = ({ reply }: CommentProps) => {
    const [liked, setLiked] = useState<boolean>(false);
    const passedTime = moment(reply?.createdAt).fromNow();

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
                    {/* <Actions thread={{}} /> */}
                    <p className="text-gray-500 text-sm">2 likes</p>
                </div>
            </div>
            <p className="w-full h-[1px] bg-gray-500"></p>
        </>
    );
};

export default Comment;
