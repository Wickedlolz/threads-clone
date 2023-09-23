import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { toast } from 'react-toastify';

import UserHeader from '../components/UserHeader';
import Spinner from '../components/Spinner';
import UserThread from '../components/UserThread';
import { loadUserThreads } from '../store/reduces/threadsSlice';

const User = () => {
    const { username } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { loading, feed, user } = useAppSelector((state) => state.threads);

    useEffect(() => {
        dispatch(loadUserThreads(username!))
            .unwrap()
            .catch((error) => {
                toast.error(error.message);
                navigate('/');
            });
    }, [dispatch, navigate, username]);

    return (
        <section>
            {!loading && user ? (
                <>
                    <UserHeader user={user} />
                    {feed && feed.length === 0 && (
                        <h1 className="text-center">User has no threads.</h1>
                    )}
                    {feed &&
                        feed.length > 0 &&
                        feed.map((thread) => (
                            <UserThread key={thread._id} thread={thread} />
                        ))}
                </>
            ) : (
                <Spinner />
            )}
        </section>
    );
};

export default User;
