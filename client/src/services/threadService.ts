import { requester } from '.';
import { IThread } from '../interfaces/thread';

const endpoints = {
    feed: '/api/v1/threads/feed',
};

export const getFeed = () => {
    return requester.get<IThread[]>(endpoints.feed);
};
