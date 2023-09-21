import { useEffect } from 'react';
import { useAppSelector } from '../store';

import UserHeader from '../components/UserHeader';
import UserThread from '../components/UserThread';

const User = () => {
    const user = useAppSelector((state) => state.auth.user);

    useEffect(() => {
        // chack if current user username is equal to username params and if is show this info if not
        // make request to api and get user info
    }, []);
    return (
        <div>
            <UserHeader />
            {/* <UserThread />
            <UserThread />
            <UserThread />
            <UserThread /> */}
        </div>
    );
};

export default User;
