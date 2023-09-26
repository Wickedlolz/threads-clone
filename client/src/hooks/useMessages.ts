import { useEffect, useState } from 'react';
import { useSocketContext } from '../contexts/SocketContext';
import { useAppDispatch, useAppSelector } from '../store';
import { addConversations } from '../store/reduces/conversationSlice';
import { messageService } from '../services';
import { toast } from 'react-toastify';

import { IMessage } from '../interfaces/message';

import messageSound from '../assets/sounds/message.mp3';

const useMessages = () => {
    const { selectedConversation, conversations } = useAppSelector(
        (state) => state.conversations
    );
    const currentUser = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const { socket } = useSocketContext();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);

    useEffect(() => {
        socket?.on('newMessage', (message) => {
            if (selectedConversation?._id === message.conversationId) {
                setMessages((prev) => [...prev, message]);
            }

            if (!document.hasFocus()) {
                const sound = new Audio(messageSound);
                sound.play();
            }

            const updatedConversations = conversations?.map((conversation) => {
                if (conversation._id === message.conversationId) {
                    return {
                        ...conversation,
                        lastMessage: {
                            ...conversation.lastMessage,
                            text: message.text,
                            sender: message.sender,
                        },
                    };
                }
                return conversation;
            });

            dispatch(addConversations(updatedConversations));
        });

        return () => {
            socket?.off('newMessage');
        };
    }, [socket, selectedConversation, conversations, dispatch]);

    useEffect(() => {
        const lastMessageIsFromOtherUser =
            messages.length &&
            messages[messages.length - 1].sender !== currentUser?._id;

        if (lastMessageIsFromOtherUser) {
            socket?.emit('markMessagesAsSeen', {
                conversationId: selectedConversation?._id,
                userId: selectedConversation?.participants[0]._id,
            });
        }

        socket?.on('messagesSeen', ({ conversationId }) => {
            if (selectedConversation?._id === conversationId) {
                setMessages((state) => {
                    const updatedMessages = state.map((message) => {
                        if (!message.seen) {
                            return {
                                ...message,
                                seen: true,
                            };
                        }
                        return message;
                    });
                    return updatedMessages;
                });
            }
        });
    }, [socket, currentUser?._id, messages, selectedConversation]);

    useEffect(() => {
        if (selectedConversation?.mock) return;

        setLoadingMessages(true);
        messageService
            .getMessagesById(selectedConversation!.participants[0]._id)
            .then((messages) => {
                setMessages(messages);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setLoadingMessages(false));
    }, [selectedConversation]);

    const updateLoadingMessages = (isLoading: boolean) => {
        setLoadingMessages(isLoading);
    };

    const addMessage = (message: IMessage) => {
        setMessages((state) => [...state, message]);
    };

    return {
        messages,
        addMessage,
        loadingMessages,
        updateLoadingMessages,
    };
};

export default useMessages;
