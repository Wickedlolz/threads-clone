import { Link } from 'react-router-dom';
import DarkLogo from '../assets/dark-logo.svg';

const Header = () => {
    return (
        <header className='flex justify-center mt-1 p-3'>
            <Link to='/login'>
                <img
                    className='w-9 h-9 object-cover'
                    src={DarkLogo}
                    alt='threads logo'
                    width={36}
                    height={36}
                />
            </Link>
        </header>
    );
};

export default Header;
