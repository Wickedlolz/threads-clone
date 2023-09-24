import { Dispatch, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { addConversations } from '../store/reduces/conversationSlice';
import { messageService } from '../services';
import { IMessage } from '../interfaces/message';
import { toast } from 'react-toastify';

import { IoSendSharp } from 'react-icons/io5';

type MessageInputProps = {
    setMessages: Dispatch<React.SetStateAction<IMessage[]>>;
};

const MessageInput = ({ setMessages }: MessageInputProps) => {
    const [messageText, setMessageText] = useState<string>('');
    const { selectedConversation, conversations } = useAppSelector(
        (state) => state.conversations
    );
    const dispatch = useAppDispatch();
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (messageText.length === 0 || isSending) {
            return;
        }

        setIsSending(true);

        messageService
            .sendMessage(selectedConversation!.participants[0]._id, messageText)
            .then((message) => {
                setMessages((state) => [...state, message]);
                const updatedConversations = conversations?.map(
                    (conversation) => {
                        if (conversation._id === selectedConversation?._id) {
                            return {
                                ...conversation,
                                lastMessage: {
                                    text: messageText,
                                    sender: message.sender,
                                },
                            };
                        }
                        return conversation;
                    }
                );
                dispatch(addConversations(updatedConversations));
                setMessageText('');
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsSending(false));
    };

    return (
        <form className="flex" onSubmit={handleSendMessage}>
            <input
                type="text"
                name="message"
                className="w-full p-2 text-black outline-none"
                placeholder="Type a message"
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
