import { useEffect, useState } from 'react';
import { threadService } from '../services';
import { toast } from 'react-toastify';
import { IThread } from '../interfaces/thread';

import Spinner from '../components/Spinner';
import UserThread from '../components/UserThread';

const Home = () => {
    const [threads, setThreds] = useState<IThread[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        threadService
            .getFeed()
            .then((feeds) => {
                setThreds(feeds);
            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <section>
            {!isLoading && threads.length === 0 && (
                <h1>Follow some users to see the feed</h1>
            )}
            {isLoading && (
                <div className='flex justify-center'>
                    <Spinner />
                </div>
            )}
            {threads.map((thread) => (
                <UserThread key={thread._id} thread={thread} />
            ))}
        </section>
    );
};

export default Home;
