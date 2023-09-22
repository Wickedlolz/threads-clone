import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { threadService } from '../services';
import { toast } from 'react-toastify';
import { IThread } from '../interfaces/thread';
import moment from 'moment';

import VerifiedBadge from '../assets/verified_badge.svg';
import { BsThreeDots } from 'react-icons/bs';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import Spinner from '../components/Spinner';
import { useAppSelector } from '../store';

const Thread = () => {
    const { threadId } = useParams();
    const feed = useAppSelector((state) => state.threads.feed);
    const [thread, setThread] = useState<IThread | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const passedTime = moment(thread?.createdAt).fromNow();

    useEffect(() => {
        setIsLoading(true);
        const currentThread = feed?.find((thread) => thread?._id === threadId);

        if (currentThread) {
            setThread(currentThread);
            setIsLoading(false);
        } else {
            threadService
                .getThreadById(threadId!)
                .then((thread) => {
                    setThread(thread);
                })
                .catch((error) => toast.error(error.message))
                .finally(() => setIsLoading(false));
        }
    }, [threadId, feed]);

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
                        alt={thread?.postedBy.name}
                    />
                    <Link
                        to={`/profile/${thread?.postedBy.username}`}
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
                    <p className="font-sm text-xs w-24 text-right text-gray-400">
                        {passedTime}
                    </p>
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
                <Actions thread={thread} setThread={setThread} />
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
            <div className="w-full h-96 overflow-y-auto scroll-smooth hover:scroll-auto">
                {thread?.replies.map((reply) => (
                    <Comment key={reply._id} reply={reply} />
                ))}
            </div>
        </section>
    );
};

export default Thread;
