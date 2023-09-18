import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AiOutlineInstagram } from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg';

const UserHeader = () => {
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    const copyUrl = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setOpenMenu(false);
            toast.success('Profile link copied.');
        });
    };

    return (
        <article className='relative p-3 flex flex-col gap-5'>
            <div className='flex justify-between my-3'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-3xl font-bold'>Viktor Dimitrov</h2>
                    <p>
                        viktordimitrov{' '}
                        <span className='bg-gray-800 text-gray-400 p-1.5 rounded-2xl'>
                            threads.net
                        </span>
                    </p>
                </div>
                <div>
                    <img
                        className='w-28 h-28 object-cover rounded-full'
                        src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
                        alt='user profile'
                    />
                </div>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Accusantium, quia.
            </p>
            <div className='flex justify-between mr-5'>
                <p className='text-gray-400 flex gap-2'>
                    <span>X followers</span> &#8226;{' '}
                    <Link to='#/'>instagram.com</Link>
                </p>
                <div className='flex gap-3 items-center'>
                    <p className='text-3xl'>
                        <AiOutlineInstagram />
                    </p>
                    <p
                        className='text-2xl cursor-pointer'
                        onClick={() => setOpenMenu((state) => !state)}
                    >
                        <CgMoreO />
                    </p>
                    {openMenu && (
                        <div className='absolute bottom-[-40px] right-3 p-1 bg-gray-600 rounded-md text-white'>
                            <button
                                className='hover:bg-gray-500 p-2'
                                onClick={copyUrl}
                            >
                                Copy Link
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className='w-full flex'>
                <div className='flex-1 border-b-[1px] border-b-white text-center pb-3 cursor-pointer'>
                    <p className='font-bold'>Threds</p>
                </div>
                <div className='flex-1 border-b-[1px] border-b-gray-400 text-center pb-3 cursor-pointer'>
                    <p className='font-bold text-gray-400'>Replies</p>
                </div>
            </div>
        </article>
    );
};

export default UserHeader;
