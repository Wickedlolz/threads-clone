import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../store';
import { ToastContainer } from 'react-toastify';

import Header from '../components/Header';
import CreateThread from '../components/CreateThread';
import ReplyModal from '../components/ReplyModal';

const MainLayout = () => {
    const user = useAppSelector((state) => state.auth.user);
    const replyModal = useAppSelector((state) => state.replyModal.open);

    return (
        <>
            <Header />
            <main className="relative max-w-2xl m-auto text-white">
                <Outlet />
                {user && <CreateThread />}
                {replyModal && <ReplyModal />}
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
