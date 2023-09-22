import { requester } from '.';
import { IThread } from '../interfaces/thread';

const endpoints = {
    feed: '/api/v1/threads/feed',
    userThreads: (username: string) => `/api/v1/threads/${username}`,
    creatThread: '/api/v1/threads',
    getThreadById: (threadId: string) => `/api/v1/threads/thread/${threadId}`,
};

export const getFeed = () => {
    return requester.get<IThread[]>(endpoints.feed);
};

export const getUserThreads = (username: string) => {
    return requester.get<IThread[]>(endpoints.userThreads(username));
};

export const createThread = (text: string, img: string) => {
    return requester.post<IThread>(endpoints.creatThread, { text, img });
};

export const getThreadById = (threadId: string) => {
    return requester.get<IThread>(endpoints.getThreadById(threadId));
};
