import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import VerifiedBadge from '../assets/verified_badge.svg';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import { threadService } from '../services';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import { IThread } from '../interfaces/thread';

const Thread = () => {
    const { threadId } = useParams();
    const [thread, setThread] = useState<IThread | null>(null);
    const [liked, setLiked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        threadService
            .getThreadById(threadId!)
            .then((thread) => {
                setThread(thread);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    }, [threadId]);

    if (isLoading) {
        return (
            <section>
                <Spinner />
            </section>
        );
    }

    return (
        <section>
            <div className="flex">
                <div className="flex w-full items-center gap-3">
                    <img
                        className="w-10 h-10 rounded-full"
                        src={thread?.postedBy.photoURL}
                        alt="user image"
                    />
                    <Link
                        to="/profile/someone"
                        className="flex gap-2 items-center"
                    >
                        <p className="font-sm font-bold">
                            {thread?.postedBy.name}
                        </p>
                        <img
                            className="w-4 h-4 object-cover"
                            src={VerifiedBadge}
                            alt="verified badge"
                            width={16}
                            height={16}
                        />
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-400">1d</p>
                    <BsThreeDots />
                </div>
            </div>
            <p className="my-3">{thread?.text}</p>
            {thread?.img && (
                <div className="rounded-md overflow-hidden border-[1px] border-gray-400">
                    <img
                        className="w-full"
                        src={thread.img}
                        alt={thread.text}
                    />
                </div>
            )}
            <div className="flex gap-3 my-3">
                <Actions liked={liked} setLiked={setLiked} />
            </div>
            {/* TODO: Separate this items to reused in other places */}
            <div className="flex gap-2 items-center">
                <p className="text-gray-500 font-sm">
                    {thread?.replies.length} replies
                </p>
                <div className="w-0.5 h-0.5 rounded-full bg-gray-500"></div>
                <p className="text-gray-500 font-sm">
                    {thread?.likes.length} likes
                </p>
            </div>
            <p className="w-full h-[1px] bg-gray-500 my-4"></p>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <p className="text-2xl">&#128588;</p>
                    <p className="text-gray-500">
                        Get the app to like, reply and post.
                    </p>
                </div>
                <button className="bg-gray-800 px-4 py-1.5 rounded-lg hover:bg-gray-600">
                    Get
                </button>
            </div>
            <p className="w-full h-[1px] bg-gray-500 my-4"></p>
            {thread?.replies.map((reply) => (
                <Comment />
            ))}
        </section>
    );
};

export default Thread;
