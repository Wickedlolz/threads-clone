import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { useSocketContext } from '../contexts/SocketContext';
import { addConversations } from '../store/reduces/conversationSlice';
import { messageService } from '../services';
import { toast } from 'react-toastify';
import { IMessage } from '../interfaces/message';

import VerifiedBadge from '../assets/verified_badge.svg';
import Message from './Message';
import MessageInput from './MessageInput';

const MessageContainer = () => {
    const { selectedConversation, conversations } = useAppSelector(
        (state) => state.conversations
    );
    const currentUser = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const { socket } = useSocketContext();
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        socket?.on('newMessage', (message) => {
            if (selectedConversation?._id === message.conversationId) {
                setMessages((prev) => [...prev, message]);
            }
            console.log(message, selectedConversation?._id);

            const updatedConversations = conversations?.map((conversation) => {
                if (conversation._id === message.conversationId) {
                    return {
                        ...conversation,
                        lastMessage: {
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
        setLoadingMessages(true);
        messageService
            .getMessagesById(selectedConversation!.participants[0]._id)
            .then((messages) => {
                setMessages(messages);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setLoadingMessages(false));
    }, [selectedConversation]);

    useEffect(() => {
        messageEndRef.current?.scrollTo({
            top: messageEndRef.current.scrollHeight,
            behavior: 'smooth',
        });
    }, [messages]);

    return (
        <div className="flex flex-[70] flex-col bg-gray-800 rounded-lg p-2">
            <div className="flex w-full h-12 items-center gap-2">
                <img
                    className="w-7 h-7 rounded-full cursor-pointer object-cover"
                    src={selectedConversation?.participants[0].photoURL}
                    alt={selectedConversation?.participants[0].name}
                />
                {selectedConversation?.participants[0].username}{' '}
                <img
                    className="w-4 h-4"
                    src={VerifiedBadge}
                    alt="verified badge"
                />
            </div>
            <p className="w-full h-[1px] bg-gray-500"></p>
            <div
                className="flex flex-col gap-4 my-3 h-96 overflow-y-auto"
                ref={messageEndRef}
            >
                {!loadingMessages &&
                    messages.map((message) => (
                        <Message
                            key={message._id}
                            message={message}
                            ownMessage={currentUser?._id === message.sender}
                        />
                    ))}
            </div>
            <MessageInput setMessages={setMessages} />
        </div>
    );
};

export default MessageContainer;
