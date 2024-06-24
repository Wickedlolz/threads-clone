import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';
import { ToastContainer } from 'react-toastify';

import Header from './Header';
import CreateThread from './CreateThread';

const MainLayout = () => {
    const user = useAppSelector((state) => state.auth.user);

    return (
        <>
            <Header />
            <main className="relative max-w-3xl m-auto text-white dark">
                <Outlet />
                {user && <CreateThread />}
            </main>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </>
    );
};

export default MainLayout;
