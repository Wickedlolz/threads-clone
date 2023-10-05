/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from 'react';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';

import Home from '../pages/Home';
import MainLayout from '../layouts/MainLayout';
import AuthGuard from '../components/AuthGuard';
import GuestGuard from '../components/GuestGuard';
import Spinner from '../components/Spinner';

const User = lazy(() => import('../pages/User'));
const Thread = lazy(() => import('../pages/Thread'));
const Chat = lazy(() => import('../pages/Chat'));
const Login = lazy(() => import('../pages/Login'));
const SignUp = lazy(() => import('../pages/SignUp'));
const UpdateProfile = lazy(() => import('../pages/UpdateProfile'));
const NotFound = lazy(() => import('../pages/NotFound'));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<MainLayout />}>
            <Route element={<AuthGuard />}>
                <Route path="/" element={<Home />} />
                <Route
                    path="/profile/update"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <UpdateProfile />
                        </Suspense>
                    }
                />
                <Route
                    path="/chat"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <Chat />
                        </Suspense>
                    }
                />
            </Route>
            <Route
                path="/:username/thread/:threadId"
                element={
                    <Suspense fallback={<Spinner />}>
                        <Thread />
                    </Suspense>
                }
            />

            <Route element={<GuestGuard />}>
                <Route
                    path="/login"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <Login />
                        </Suspense>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <Suspense fallback={<Spinner />}>
                            <SignUp />
                        </Suspense>
                    }
                />
            </Route>

            <Route
                path="/profile/:username"
                element={
                    <Suspense fallback={<Spinner />}>
                        <User />
                    </Suspense>
                }
            />
            <Route
                path="/*"
                element={
                    <Suspense fallback={<Spinner />}>
                        <NotFound />
                    </Suspense>
                }
            />
        </Route>
    )
);

export default router;
