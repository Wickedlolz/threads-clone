import { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import Spinner from '../components/Spinner';

const Login = lazy(() => import('../pages/Login'));
const User = lazy(() => import('../pages/User'));
const Post = lazy(() => import('../pages/Post'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route path='/user' element={<User />} />
            <Route
                path='/:userName/post/:postId'
                element={
                    <Suspense fallback={<Spinner />}>
                        <Post />
                    </Suspense>
                }
            />
            <Route
                path='/login'
                element={
                    <Suspense fallback={<Spinner />}>
                        <Login />
                    </Suspense>
                }
            />
        </Route>
    )
);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;
