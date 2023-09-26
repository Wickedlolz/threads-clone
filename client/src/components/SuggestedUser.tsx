import { Link } from 'react-router-dom';
import { IUser } from '../interfaces/user';
import useFollowUnfollow from '../hooks/useFollowUnfollow';

type SuggestedUserProps = {
    user: IUser;
};

const SuggestedUser = ({ user }: SuggestedUserProps) => {
    const { handleFollowUnfollow, following } = useFollowUnfollow(user);

    return (
        <div className="flex gap-2 justify-between items-center">
            <Link to={`/profile/${user.username}`} className="flex gap-2">
                <img
                    className="w-9 h-9 rounded-full cursor-pointer object-cover"
                    src={user.photoURL}
                    alt={user.name}
                />
                <div>
                    <p className="text-sm font-bold">{user.username}</p>
                    <p className="text-gray-400 text-sm">{user.name}</p>
                </div>
            </Link>
            <button
                onClick={handleFollowUnfollow}
                className={`${
                    following
                        ? 'text-black bg-white hover:bg-gray-200 p-1'
                        : 'text-white bg-blue-400 hover:bg-blue-700 px-2.5 py-1'
                } rounded-lg duration-300`}
            >
                {following ? 'Unfollow' : 'Follow'}
            </button>
        </div>
    );
};

export default SuggestedUser;
