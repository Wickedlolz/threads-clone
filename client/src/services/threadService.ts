import { requester } from '.';
import { IThread } from '../interfaces/thread';

const endpoints = {
    feed: '/api/v1/threads/feed',
    userThreads: (username: string) => `/api/v1/threads/${username}`,
};

export const getFeed = () => {
    return requester.get<IThread[]>(endpoints.feed);
};

export const getUserThreads = (username: string) => {
    return requester.get<IThread[]>(endpoints.userThreads(username));
};
