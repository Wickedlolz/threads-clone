import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store';
import { threadService, userService } from '../services';
import { IUser } from '../interfaces/user';
import { IThread } from '../interfaces/thread';
import { toast } from 'react-toastify';

import UserHeader from '../components/UserHeader';
import Spinner from '../components/Spinner';
import UserThread from '../components/UserThread';

const User = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.auth.user);
    const [userData, setUserData] = useState<IUser | null>(null);
    const [threads, setThreads] = useState<IThread[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        setIsLoading(true);
        if (user?.username !== username) {
            Promise.all([
                userService.getUserByUsername(username!),
                threadService.getUserThreads(username!),
            ])
                .then(([userData, threads]) => {
                    setUserData(userData);
                    setThreads(threads);
                })
                .catch((error) => {
                    toast.error(error.message);
                    navigate('/');
                })
                .finally(() => setIsLoading(false));
        } else {
            setUserData(user);
            threadService
                .getUserThreads(user!.username)
                .then((threads) => {
                    setThreads(threads);
                })
                .catch((error) => {
                    toast.error(error.mesage);
                    navigate('/');
                })
                .finally(() => setIsLoading(false));
        }
    }, [user?.username, username, user, navigate]);

    return (
        <section>
            {!isLoading && userData ? (
                <>
                    <UserHeader user={userData} />
                    {threads.map((thread) => (
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
