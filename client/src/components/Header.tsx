import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import useLogout from '../hooks/useLogout';

import DarkLogo from '../assets/dark-logo.svg';

import { AiFillHome } from 'react-icons/ai';
import { RxAvatar } from 'react-icons/rx';
import { FiLogOut } from 'react-icons/fi';
import { BsFillChatQuoteFill } from 'react-icons/bs';

const Header = () => {
    const user = useAppSelector((state) => state.auth.user);
    const logout = useLogout();

    return (
        <>
            {user ? (
                <header className="flex justify-between max-w-3xl mx-auto px-2 mt-6 mb-12 items-center">
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
                        <button className="text-xs" onClick={logout}>
                            <FiLogOut size={24} />
                        </button>
                    </div>
                </header>
            ) : null}
        </>
    );
};

export default Header;
