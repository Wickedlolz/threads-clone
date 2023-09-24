import { requester } from '.';
import { IUser } from '../interfaces/user';

const endpoints = {
    userByUsername: (username: string) => `/api/v1/users/user/${username}`,
    followUnfollow: (userId: string) => `/api/v1/users/follow/${userId}`,
    suggestedUsers: '/api/v1/users/suggested',
};

export const getUserByUsername = (username: string) => {
    return requester.get<IUser>(endpoints.userByUsername(username));
};

export const followUnfollow = (userId: string) => {
    return requester.post<IUser>(endpoints.followUnfollow(userId));
};

export const getSuggestedUsers = () => {
    return requester.get<IUser[]>(endpoints.suggestedUsers);
};
