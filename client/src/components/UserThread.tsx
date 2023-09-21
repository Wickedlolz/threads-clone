import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IThread } from '../interfaces/thread';

import Actions from './Actions';
import { BsThreeDots } from 'react-icons/bs';
import VerifiedBadge from '../assets/verified_badge.svg';
import moment from 'moment';

type UserThreadType = {
    thread: IThread;
};

const UserThread = ({ thread }: UserThreadType) => {
    const [liked, setLiked] = useState<boolean>(false);
    const passedTime = moment(thread.createdAt).fromNow();

    return (
        <Link to={`/${thread.postedBy.username}/thread/${thread._id}`}>
            <div className='flex gap-3 mb-4 py-4'>
                <div className='flex flex-col items-center'>
                    <img
                        className='w-12 h-12 rounded-full'
                        src={thread.postedBy.photoURL}
                        alt='user avatar'
                    />
                    <div className='w-[1px] h-full bg-gray-500 my-2'></div>
                    <div className='relative w-full'>
                        <img
                            className='absolute top-0 left-4 w-6 h-6 rounded-full'
                            src='https://bit.ly/kent-c-dodds'
                            alt='another user profile'
                        />
                        <img
                            className='absolute bottom-0 right-[-5px] w-6 h-6 rounded-full'
                            src='https://bit.ly/ryan-florence'
                            alt='another user profile'
                        />
                        <img
                            className='absolute bottom-0 left-1 w-6 h-6 rounded-full'
                            src='https://bit.ly/prosper-baba'
                            alt='another user profile'
                        />
                    </div>
                </div>
                <div className='flex-1 flex-col gap-2'>
                    <div className='flex justify-between w-full'>
                        <div className='flex w-full items-center gap-1'>
                            <p className='font-sm font-bold'>
                                {thread.postedBy.username}
                            </p>
                            <img
                                className='w-4 h-4 object-cover'
                                src={VerifiedBadge}
                                alt='verified badge'
                                width={16}
                                height={16}
                            />
                        </div>
                        <div className='flex items-center justify-between gap-3'>
                            <p className='font-sm text-xs text- text-gray-400'>
                                {passedTime}
                            </p>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p className='font-sm'>{thread.text}</p>
                    {thread.img && (
                        <div className='rounded-md overflow-hidden border-[1px] border-gray-400'>
                            <img
                                className='w-full'
                                src={thread.img}
                                alt={thread.text}
                            />
                        </div>
                    )}
                    <div className='flex gap-3 my-2'>
                        <Actions liked={liked} setLiked={setLiked} />
                    </div>
                    <div className='flex items-center gap-2'>
                        <p className='text-gray-500 font-sm'>
                            {thread.replies.length} replies
                        </p>
                        <div className='w-0.5 h-0.5 rounded-full bg-gray-500'></div>
                        <p className='text-gray-500 font-sm'>
                            {thread.likes.length} likes
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default UserThread;
