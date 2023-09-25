import { requester } from '.';
import { IConversation } from '../interfaces/conversation';
import { IMessage } from '../interfaces/message';

const endpoints = {
    conversations: '/api/v1/messages/conversations',
    getMessagesById: (participantId: string) =>
        `/api/v1/messages/${participantId}`,
    sendMessage: '/api/v1/messages',
    deleteConversationById: (conversationId: string) =>
        `/api/v1/messages/conversations/${conversationId}`,
};

export const loadConversations = () => {
    return requester.get<IConversation[]>(endpoints.conversations);
};

export const getMessagesById = (participantId: string) => {
    return requester.get<IMessage[]>(endpoints.getMessagesById(participantId));
};

export const createConversation = (participantId: string) => {
    return requester.post<IConversation>(endpoints.conversations, {
        participantId,
    });
};

export const sendMessage = (
    recipientId: string,
    message: string,
    img?: string
) => {
    return requester.post<IMessage>(endpoints.sendMessage, {
        recipientId,
        message,
        img,
    });
};

export const deleteConversationById = (conversationId: string) => {
    return requester.del<IConversation>(
        endpoints.deleteConversationById(conversationId)
    );
};
