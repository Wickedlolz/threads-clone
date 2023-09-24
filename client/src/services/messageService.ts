import { requester } from '.';
import { IConversation } from '../interfaces/conversation';
import { IMessage } from '../interfaces/message';

const endpoints = {
    getConversations: '/api/v1/messages/conversations',
    getMessagesById: (participantId: string) =>
        `/api/v1/messages/${participantId}`,
    createConversation: '/api/v1/messages/conversations',
};

export const loadConversations = () => {
    return requester.get<IConversation[]>(endpoints.getConversations);
};

export const getMessagesById = (participantId: string) => {
    return requester.get<IMessage[]>(endpoints.getMessagesById(participantId));
};

export const createConversation = (participantId: string) => {
    return requester.post<IConversation>(endpoints.createConversation, {
        participantId,
    });
};
