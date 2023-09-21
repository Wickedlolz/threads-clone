import { requester } from '.';
import { IUser } from '../interfaces/user';

const endpoints = {
    userByUsername: (username: string) => `/api/v1/users/${username}`,
    followUnfollow: (userId: string) => `/api/v1/users/follow/${userId}`,
};

export const getUserByUsername = (username: string) => {
    return requester.get<IUser>(endpoints.userByUsername(username));
};

export const followUnfollow = (userId: string) => {
    return requester.post<IUser>(endpoints.followUnfollow(userId));
};
