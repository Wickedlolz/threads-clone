import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './store';
import { getUser } from './store/reduces/authSlice';

import User from './pages/User';
import Post from './pages/Post';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import UpdateProfile from './pages/UpdateProfile';

const App = () => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUser());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route
                    path='/'
                    element={user ? <Home /> : <Navigate to='/login' />}
                />
                <Route path='/user' element={<User />} />
                <Route path='/:username/thread/:postId' element={<Post />} />
                <Route
                    path='/login'
                    element={!user ? <Login /> : <Navigate to='/' />}
                />
                <Route
                    path='/signup'
                    element={!user ? <SignUp /> : <Navigate to='/' />}
                />
                <Route
                    path='/profile/update'
                    element={user ? <UpdateProfile /> : <Navigate to='/' />}
                />
            </Route>
        </Routes>
    );
};

export default App;
