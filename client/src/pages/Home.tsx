import { useEffect } from 'react';
import UserThread from '../components/UserThread';
import { useAppDispatch, useAppSelector } from '../store';
import { loadFeed } from '../store/reduces/threadsSlice';
import SuggestedUsers from '../components/SuggestedUsers';

const Home = () => {
    const feed = useAppSelector((state) => state.threads.feed);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(loadFeed());
    }, [dispatch]);

    return (
        <section className="flex gap-8 items-start">
            <div className="flex  md:w-[70%]">
                {feed?.length === 0 && (
                    <h1 className="text-center">
                        Follow some users to see the feed
                    </h1>
                )}

                {feed?.map((thread) => (
                    <UserThread key={thread._id} thread={thread} />
                ))}
            </div>
            <div className="hidden md:flex md:flex-col md:w-[30%]">
                <SuggestedUsers />
            </div>
        </section>
    );
};

export default Home;
