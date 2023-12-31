import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store';
import { deleteConversationById } from '../store/reduces/conversationSlice';
import useMessages from '../hooks/useMessages';
import { toast } from 'react-toastify';

import VerifiedBadge from '../assets/verified_badge.svg';
import Message from './Message';
import MessageInput from './MessageInput';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';
import { BsPersonAdd } from 'react-icons/bs';

const MessageContainer = () => {
    const { selectedConversation } = useAppSelector(
        (state) => state.conversations
    );
    const currentUser = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const { messages, addMessage, loadingMessages, updateLoadingMessages } =
        useMessages();
    const messageEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messageEndRef.current?.scrollTo({
            top: messageEndRef.current.scrollHeight,
        });
    }, [messages]);

    /**
     * Handles the deletion of a conversation by its ID.
     *
     * If loadingMessages is true, the function exits early.
     * Sets loadingMessages to true to indicate the deletion process has started.
     * Calls the messageService to delete the conversation by its ID.
     * Dispatches an action to remove the conversation from the state upon successful deletion.
     * Displays a success toast upon successful deletion of the conversation.
     * Displays an error toast if there is an error during the deletion process.
     * Sets loadingMessages to false to indicate the completion of the deletion process.
     *
     * @returns {void}
     */
    const handleDeleteConversation = () => {
        if (loadingMessages) return;

        updateLoadingMessages(true);
        dispatch(deleteConversationById(selectedConversation!._id))
            .unwrap()
            .catch((error) => toast.error(error.message))
            .finally(() => updateLoadingMessages(false));
    };

    return (
        <div className="flex flex-[70] flex-col bg-gray-800 rounded-lg p-2">
            <div className="flex w-full h-12 items-center gap-2 justify-between">
                <div className="flex gap-2 items-center">
                    <Link
                        className="flex gap-2 items-center"
                        to={`/profile/${selectedConversation?.participants[0].username}`}
                    >
                        <img
                            className="w-7 h-7 rounded-full cursor-pointer object-cover"
                            src={selectedConversation?.participants[0].photoURL}
                            alt={selectedConversation?.participants[0].name}
                        />
                        {selectedConversation?.participants[0].username}{' '}
                    </Link>
                    <img
                        className="w-4 h-4"
                        src={VerifiedBadge}
                        alt="verified badge"
                    />
                </div>
                <div className="mr-2 flex items-center gap-3">
                    <BsPersonAdd className="cursor-pointer" />
                    <FiPhoneCall className="cursor-pointer" />
                    <RiDeleteBin5Line
                        onClick={handleDeleteConversation}
                        className="cursor-pointer"
                    />
                </div>
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
            <MessageInput addMessage={addMessage} />
        </div>
    );
};

export default MessageContainer;
