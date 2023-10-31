import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useAppDispatch } from './store';
import { getUser } from './store/reduces/authSlice';

import { SocketContextProvider } from './contexts/SocketContext';
import router from './routes/router';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <SocketContextProvider>
            <RouterProvider router={router} />
        </SocketContextProvider>
    );
};

export default App;
