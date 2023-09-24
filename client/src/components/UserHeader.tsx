import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import useFollowUnfollow from '../hooks/useFollowUnfollow';
import { toast } from 'react-toastify';
import { IUser } from '../interfaces/user';

import { AiOutlineInstagram } from 'react-icons/ai';
import { CgMoreO } from 'react-icons/cg';
import Spinner from './Spinner';

type UserHeaderProps = {
    user: IUser;
};

const UserHeader = ({ user }: UserHeaderProps) => {
    const authUser = useAppSelector((state) => state.auth.user);
    const updating = useAppSelector((state) => state.threads.updating);
    const { handleFollowUnfollow, following } = useFollowUnfollow(user);
    const [openMenu, setOpenMenu] = useState<boolean>(false);

    /**
     * Copies the current URL to the clipboard and displays a success message.
     *
     * This function retrieves the current URL from the browser's window object,
     * utilizes the navigator clipboard API to write the URL to the clipboard,
     * and then updates the UI accordingly.
     *
     * @returns {void}
     */
    const copyUrl = (): void => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(() => {
            setOpenMenu(false);
            toast.success('Profile link copied.');
        });
    };

    return (
        <article className="relative p-3 flex flex-col gap-5">
            <div className="flex justify-between my-3">
                <div className="flex flex-col gap-4">
                    <h2 className="text-3xl font-bold">{user?.name}</h2>
                    <p>
                        {user?.username}{' '}
                        <span className="text-xs bg-gray-800 text-gray-400 p-1.5 rounded-2xl">
                            threads.net
                        </span>
                    </p>
                </div>
                <div>
                    <img
                        className="w-28 h-28 object-cover rounded-full"
                        src={user?.photoURL}
                        alt="user profile"
                    />
                </div>
            </div>
            <p>{user?.bio}</p>
            {user._id === authUser?._id ? (
                <Link to="/profile/update">
                    <button className="primaryBtn">Update Profile</button>
                </Link>
            ) : (
                <button
                    disabled={updating}
                    className="primaryBtn w-28"
                    onClick={handleFollowUnfollow}
                >
                    {updating && <Spinner isSmall />}
                    {following ? 'Unfollow' : 'Follow'}
                </button>
            )}
            <div className="flex justify-between mr-5">
                <p className="text-gray-400 flex gap-2">
                    <span>{user?.followers.length} followers</span> &#8226;{' '}
                    <span>{user?.following.length} following</span>
                </p>
                <div className="flex gap-3 items-center">
                    <p className="text-3xl">
                        <AiOutlineInstagram />
                    </p>
                    <p
                        className="text-2xl cursor-pointer"
                        onClick={() => setOpenMenu((state) => !state)}
                    >
                        <CgMoreO />
                    </p>
                    {openMenu && (
                        <div className="absolute bottom-0 right-3 p-1 bg-gray-600 rounded-md text-white">
                            <button
                                className="hover:bg-gray-500 p-2"
                                onClick={copyUrl}
                            >
                                Copy Link
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full flex">
                <div className="flex-1 border-b-[1px] border-b-white text-center pb-3 cursor-pointer">
                    <p className="font-bold">Threds</p>
                </div>
                <div className="flex-1 border-b-[1px] border-b-gray-400 text-center pb-3 cursor-pointer">
                    <p className="font-bold text-gray-400">Replies</p>
                </div>
            </div>
        </article>
    );
};

export default UserHeader;
