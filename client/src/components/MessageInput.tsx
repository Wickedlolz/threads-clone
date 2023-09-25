import { FormEvent, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { addConversations } from '../store/reduces/conversationSlice';
import { messageService } from '../services';
import { IMessage } from '../interfaces/message';
import { toast } from 'react-toastify';

import { IoSendSharp } from 'react-icons/io5';

type MessageInputProps = {
    addMessage: (message: IMessage) => void;
};

const MessageInput = ({ addMessage }: MessageInputProps) => {
    const [messageText, setMessageText] = useState<string>('');
    const { selectedConversation, conversations } = useAppSelector(
        (state) => state.conversations
    );
    const dispatch = useAppDispatch();
    const [isSending, setIsSending] = useState<boolean>(false);

    /**
     * Handles sending a message in the selected conversation.
     *
     * @param {FormEvent<HTMLFormElement>} event - The event triggered by the form submission.
     *
     * @returns {void}
     */
    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (messageText.length === 0 || isSending) {
            return;
        }

        setIsSending(true);

        messageService
            .sendMessage(selectedConversation!.participants[0]._id, messageText)
            .then((message) => {
                updateConversations(messageText, message.sender);
                addMessage(message);
                setMessageText('');
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsSending(false));
    };

    /**
     * Updates the conversations based on the sent message.
     *
     * @param {string} messageText - The text of the message being sent.
     * @returns {Promise<void>} A promise that resolves when the conversations are updated.
     *
     * @returns {void}
     */
    const updateConversations = useCallback(
        (messageText: string, sender: string) => {
            const updatedConversations = conversations?.map((conversation) => {
                if (conversation._id === selectedConversation?._id) {
                    return {
                        ...conversation,
                        lastMessage: {
                            ...conversation.lastMessage,
                            text: messageText,
                            sender: sender,
                        },
                    };
                }
                return conversation;
            });

            dispatch(addConversations(updatedConversations));
        },
        [conversations, dispatch, selectedConversation]
    );

    return (
        <form className="flex" onSubmit={handleSendMessage}>
            <input
                type="text"
                name="message"
                className="w-full p-2 text-black outline-none"
                placeholder="Type a message"
                autoComplete="off"
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
            />
            <button
                type="submit"
                disabled={isSending}
                className="bg-white p-1 text-2xl text-blue-500 cursor-pointer hover:text-blue-600"
            >
                <IoSendSharp />
            </button>
        </form>
    );
};

export default MessageInput;
