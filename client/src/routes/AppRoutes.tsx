import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import User from '../pages/User';
import Post from '../pages/Post';
import SignUp from '../pages/SignUp';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route path='/user' element={<User />} />
            <Route path='/:username/post/:postId' element={<Post />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
        </Route>
    )
);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
