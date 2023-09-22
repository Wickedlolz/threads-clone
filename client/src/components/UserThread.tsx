import { Dispatch, MouseEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { IThread } from '../interfaces/thread';
import { threadService } from '../services';
import { toast } from 'react-toastify';
import moment from 'moment';

import Actions from './Actions';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegFaceFrownOpen } from 'react-icons/fa6';
import { AiOutlineDelete } from 'react-icons/ai';
import VerifiedBadge from '../assets/verified_badge.svg';

type UserThreadType = {
    thread: IThread;
    threads?: IThread[];
    setThreads?: Dispatch<React.SetStateAction<IThread[]>>;
};

const UserThread = ({ thread, threads, setThreads }: UserThreadType) => {
    const user = useAppSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const passedTime = moment(thread.createdAt).fromNow();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigateToUserProfile = (event: MouseEvent<HTMLImageElement>) => {
        event.preventDefault();
        navigate(`/profile/${thread.postedBy.username}`);
    };

    const handleDeleteThread = (event: MouseEvent) => {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        setIsLoading(true);
        threadService
            .deleteThreadById(thread._id)
            .then((deletedThread) => {
                if (threads && setThreads) {
                    const filteredThreads = threads.filter(
                        (thread) => thread._id !== deletedThread._id
                    );
                    setThreads(filteredThreads);
                }

                toast.success('Successfully deleted.');
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    };

    return (
        <>
            <div className="flex gap-3 mb-4 py-4">
                <div className="flex flex-col items-center">
                    <img
                        className="w-12 h-12 rounded-full"
                        src={thread.postedBy.photoURL}
                        alt="user avatar"
                        onClick={navigateToUserProfile}
                    />
                    <div className="w-[1px] h-full bg-gray-500 my-2"></div>
                    <div className="relative w-full">
                        {thread.replies.length === 0 && (
                            <FaRegFaceFrownOpen className="mx-auto text-yellow-300" />
                        )}
                        {thread?.replies[0]?.userProfilePic && (
                            <img
                                className="absolute top-0 left-3 w-6 h-6 rounded-full"
                                src={thread.replies[0].userProfilePic}
                                alt={thread.replies[0].username}
                            />
                        )}
                        {thread?.replies[1]?.userProfilePic && (
                            <img
                                className="absolute bottom-0 right-[-5px] w-6 h-6 rounded-full"
                                src={thread.replies[1].userProfilePic}
                                alt={thread.replies[1].username}
                            />
                        )}
                        {thread?.replies[2]?.userProfilePic && (
                            <img
                                className="absolute bottom-0 left-0 w-6 h-6 rounded-full"
                                src={thread.replies[2].userProfilePic}
                                alt={thread.replies[2].username}
                            />
                        )}
                    </div>
                </div>
                <div className="flex-1 flex-col gap-2">
                    <Link
                        to={`/${thread.postedBy.username}/thread/${thread._id}`}
                    >
                        <div className="flex justify-between w-full">
                            <div className="flex w-full items-center gap-1">
                                <p
                                    className="font-sm font-bold"
                                    onClick={navigateToUserProfile}
                                >
                                    {thread.postedBy.username}
                                </p>
                                <img
                                    className="w-4 h-4 object-cover"
                                    src={VerifiedBadge}
                                    alt="verified badge"
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-sm text-xs w-24 text-right text-gray-400">
                                    {passedTime}
                                </p>
                                {user?._id === thread?.postedBy?._id ? (
                                    <AiOutlineDelete
                                        onClick={handleDeleteThread}
                                    />
                                ) : (
                                    <BsThreeDots />
                                )}
                            </div>
                        </div>
                        <p className="font-sm">{thread.text}</p>
                        {thread.img && (
                            <div className="rounded-md overflow-hidden border-[1px] border-gray-400">
                                <img
                                    className="w-full"
                                    src={thread.img}
                                    alt={thread.text}
                                />
                            </div>
                        )}
                    </Link>
                    <div className="flex gap-3 my-2">
                        <Actions thread={thread} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserThread;
