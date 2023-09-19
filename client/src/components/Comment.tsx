import { useState } from 'react';

import { BsThreeDots } from 'react-icons/bs';
import Actions from './Actions';

const Comment = () => {
    const [liked, setLiked] = useState<boolean>(false);

    return (
        <>
            <div className='flex gap-4 py-2 my-2 w-full'>
                <img
                    className='w-9 h-9 rounded-full'
                    src='https://bit.ly/kent-c-dodds'
                    alt='user avatart'
                />
                <div className='flex flex-col gap-1 w-full '>
                    <div className='flex justify-between w-full items-center'>
                        <p className='text-sm font-bold'>Peter Parker</p>
                        <div className='flex gap-2 items-center'>
                            <p className='text-sm text-gray-400'>1d</p>
                            <BsThreeDots />
                        </div>
                    </div>
                    <p>Hey this looks great!</p>
                    <Actions liked={liked} setLiked={setLiked} />
                    <p className='text-gray-500 text-sm'>2 likes</p>
                </div>
            </div>
            <p className='w-full h-[1px] bg-gray-500'></p>
        </>
    );
};

export default Comment;
