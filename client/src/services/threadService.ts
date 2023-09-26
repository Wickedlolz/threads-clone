import { requester } from '.';
import { IReplay, IThread } from '../interfaces/thread';

const endpoints = {
    feed: '/api/v1/threads/feed',
    userThreads: (username: string) => `/api/v1/threads/${username}`,
    creatThread: '/api/v1/threads',
    getThreadById: (threadId: string) => `/api/v1/threads/thread/${threadId}`,
    likeThreadById: (threadId: string) => `/api/v1/threads/like/${threadId}`,
    replyToThreadById: (threadId: string) =>
        `/api/v1/threads/reply/${threadId}`,
    deleteThreadById: (threadId: string) => `/api/v1/threads/${threadId}`,
    likeReplyById: (replyId: string) => `/api/v1/threads/reply/like/${replyId}`,
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

export const likeUnlikeThreadById = (threadId: string) => {
    return requester.put<IThread>(endpoints.likeThreadById(threadId));
};

export const replyToThreadById = (threadId: string, threadText: string) => {
    return requester.put<IThread>(endpoints.replyToThreadById(threadId), {
        text: threadText,
    });
};

export const deleteThreadById = (threadId: string) => {
    return requester.del<IThread>(endpoints.deleteThreadById(threadId));
};

export const likeReplyById = (replyId: string) => {
    return requester.put<IReplay>(endpoints.likeReplyById(replyId));
};
