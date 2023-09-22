import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { authService } from '../services';
import { toast } from 'react-toastify';

import DarkLogo from '../assets/dark-logo.svg';

import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';
import { BsFillChatQuoteFill } from 'react-icons/bs';
import { removeUser } from '../store/reduces/authSlice';
import { clearThreads } from '../store/reduces/threadsSlice';

const Header = () => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    /**
     * Logs the user out by invoking the authService's logout function.
     * Upon successful logout, it dispatches actions to remove the user and clear threads,
     * then navigates to the home page.
     *
     * @returns {void}
     */
    const handleLogout = () => {
        authService
            .logout()
            .then(() => {
                dispatch(removeUser());
                dispatch(clearThreads());
                navigate('/');
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            {user ? (
                <header className="flex justify-between px-3 sm:justify-evenly mt-6 mb-12 items-center">
                    <Link to="/" className="text-white">
                        <AiFillHome className="text-white" size={28} />
                    </Link>

                    <img
                        className="w-7 h-7 object-cover"
                        src={DarkLogo}
                        alt="threads logo"
                        width={36}
                        height={36}
                    />

                    <div className="flex items-center gap-4 text-white">
                        <Link to={`/profile/${user?.username}`}>
                            {user.photoURL ? (
                                <img
                                    className="w-7 h-7 rounded-full object-cover"
                                    src={user.photoURL}
                                    alt={user.name}
                                />
                            ) : (
                                <RxAvatar size={28} />
                            )}
                        </Link>
                        <Link to={`/chat`}>
                            <BsFillChatQuoteFill size={24} />
                        </Link>
                        <button className="text-xs" onClick={handleLogout}>
                            <FiLogOut size={24} />
                        </button>
                    </div>
                </header>
            ) : null}
        </>
    );
};

export default Header;
