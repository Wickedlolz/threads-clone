import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import {
    deleteThreadById,
    loadThreadById,
} from '../store/reduces/threadsSlice';
import { toast } from 'react-toastify';
import moment from 'moment';

import VerifiedBadge from '../assets/verified_badge.svg';
import { BsThreeDots } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';
import Actions from '../components/Actions';
import Comment from '../components/Comment';
import Spinner from '../components/Spinner';

const Thread = () => {
    const { threadId } = useParams();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { thread, loading } = useAppSelector((state) => state.threads);
    const passedTime = moment(thread?.createdAt).fromNow();

    useEffect(() => {
        dispatch(loadThreadById(threadId!))
            .unwrap()
            .catch((error) => toast.error(error.message));
    }, [threadId, dispatch]);

    /**
     * Handles the deletion of a thread, dispatching a delete action and navigating
     * to the user's profile upon success.
     *
     * @returns {void}
     */
    const handleDeleteThread = () => {
        if (loading) {
            return;
        }

        dispatch(deleteThreadById(threadId!))
            .unwrap()
            .then(() => {
                navigate('/profile/' + user?.username);
                toast.success('Successfully deleted.');
            })
            .catch((error) => toast.error(error.message));
    };

    if (loading) {
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
                    {user?._id === thread?.postedBy?._id ? (
                        <AiOutlineDelete
                            onClick={handleDeleteThread}
                            className="cursor-pointer"
                        />
                    ) : (
                        <BsThreeDots />
                    )}
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
                <Actions thread={thread} />
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
