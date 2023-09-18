import { lazy, Suspense } from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import UserHeader from '../components/UserHeader';
import Spinner from '../components/Spinner';
const Login = lazy(() => import('../pages/Login'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<MainLayout />}>
            <Route path='/' element={<UserHeader />} />
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
