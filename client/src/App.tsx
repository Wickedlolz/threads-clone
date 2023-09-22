import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from './store';
import { getUser } from './store/reduces/authSlice';

import User from './pages/User';
import Thread from './pages/Thread';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import UpdateProfile from './pages/UpdateProfile';
import AuthGuard from './components/AuthGuard';
import GuestGuard from './components/GuestGuard';
import NotFound from './pages/NotFound';

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route element={<AuthGuard />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/update" element={<UpdateProfile />} />
                </Route>
                <Route
                    path="/:username/thread/:threadId"
                    element={<Thread />}
                />
                <Route element={<GuestGuard />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Route>
                <Route path="/profile/:username" element={<User />} />
                <Route path="/*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
