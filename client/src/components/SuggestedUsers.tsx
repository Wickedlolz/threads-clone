import { useEffect, useState } from 'react';
import { IUser } from '../interfaces/user';
import { userService } from '../services';
import { toast } from 'react-toastify';

import SuggestedUser from './SuggestedUser';

const SuggestedUsers = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [suggestedUsers, setSuggestedUsers] = useState<IUser[]>([]);

    useEffect(() => {
        setIsLoading(true);
        userService
            .getSuggestedUsers()
            .then((users) => {
                setSuggestedUsers(users);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <>
            <p className="mb-4 font-bold text-sm">Suggested Users</p>
            <div className="flex flex-col gap-4">
                {!isLoading && suggestedUsers.length > 0 ? (
                    suggestedUsers.map((user) => (
                        <SuggestedUser key={user._id} user={user} />
                    ))
                ) : (
                    <p className="text-xs">No suggested users.</p>
                )}
            </div>
        </>
    );
};

export default SuggestedUsers;
