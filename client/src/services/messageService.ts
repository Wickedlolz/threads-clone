import { requester } from '.';
import { IConversation } from '../interfaces/conversation';

const endpoints = {
    getConversations: '/api/v1/messages/conversations',
};

export const loadConversations = () => {
    return requester.get<IConversation[]>(endpoints.getConversations);
};
