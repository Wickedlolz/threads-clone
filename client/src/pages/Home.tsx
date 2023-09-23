import { useEffect } from 'react';
import UserThread from '../components/UserThread';
import { useAppDispatch, useAppSelector } from '../store';
import { loadFeed } from '../store/reduces/threadsSlice';

const Home = () => {
    const feed = useAppSelector((state) => state.threads.feed);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadFeed());
    }, [dispatch]);

    return (
        <section>
            {feed?.length === 0 && (
                <h1 className="text-center">
                    Follow some users to see the feed
                </h1>
            )}

            {feed?.map((thread) => (
                <UserThread key={thread._id} thread={thread} />
            ))}
        </section>
    );
};

export default Home;
