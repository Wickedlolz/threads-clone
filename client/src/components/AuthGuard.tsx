import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';

const AuthGuard = () => {
    const user = useAppSelector((state) => state.auth.user);

    if (!user) {
        return <Navigate to='/login' replace={true} />;
    }

    return <Outlet />;
};

export default AuthGuard;
