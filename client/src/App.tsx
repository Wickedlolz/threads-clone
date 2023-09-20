import { useEffect } from 'react';
import { useAppDispatch } from './store';
import AppRoutes from './routes/AppRoutes';
import { getUser } from './store/reduces/authSlice';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AppRoutes />;
};

export default App;
