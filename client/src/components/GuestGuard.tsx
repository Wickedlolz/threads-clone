import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';

const GuestGuard = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (user) {
        return <Navigate to='/' replace={true} />;
    }

    return <Outlet />;
};

export default GuestGuard;
