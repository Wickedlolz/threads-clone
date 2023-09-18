import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from '../components/Header';

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main className='max-w-2xl m-auto text-white'>
                <Outlet />
            </main>
            <ToastContainer
                position='bottom-center'
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme='dark'
            />
        </div>
    );
};

export default MainLayout;
