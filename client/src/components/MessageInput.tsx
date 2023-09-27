import { FormEvent, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { addConversations } from '../store/reduces/conversationSlice';
import { messageService } from '../services';
import usePreviewImage from '../hooks/usePreviewImage';
import { IMessage } from '../interfaces/message';
import { toast } from 'react-toastify';

import { IoSendSharp } from 'react-icons/io5';
import { BsFillImageFill } from 'react-icons/bs';
import Spinner from './Spinner';
import { IoMdClose } from 'react-icons/io';

type MessageInputProps = {
    addMessage: (message: IMessage) => void;
};

const MessageInput = ({ addMessage }: MessageInputProps) => {
    const [messageText, setMessageText] = useState<string>('');
    const { selectedConversation, conversations } = useAppSelector(
        (state) => state.conversations
    );
    const dispatch = useAppDispatch();
    const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage();
    const [isSending, setIsSending] = useState<boolean>(false);
    const imageRef = useRef<HTMLInputElement | null>(null);

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
            .sendMessage(
                selectedConversation!.participants[0]._id,
                messageText,
                imageUrl as string
            )
            .then((message) => {
                updateConversations(messageText, message.sender);
                addMessage(message);
                setMessageText('');
                setImageUrl('');
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
                            seen: false,
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
        <div className="flex items-center w-full bg-white">
            <form className="flex w-full" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    name="message"
                    className="w-full p-2 text-black outline-none"
                    placeholder="Type a message"
                    autoComplete="off"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                />
                {imageUrl && (
                    <div className="relative">
                        <img
                            className="w-9 h-9 mt-0.5 object-cover"
                            src={imageUrl as string}
                            alt="image for upload"
                        />
                        <button
                            onClick={() => setImageUrl(null)}
                            className="bg-red-500 flex w-2 h-2 absolute top-0 right-[-2px] text-white rounded-full p-2"
                        >
                            <IoMdClose className="absolute top-0 right-0" />
                        </button>
                    </div>
                )}
                <button
                    type="submit"
                    disabled={isSending}
                    className="bg-white flex items-center p-1 text-2xl text-blue-500 cursor-pointer hover:text-blue-600"
                >
                    {isSending ? (
                        <Spinner isSmall />
                    ) : (
                        <IoSendSharp size={20} />
                    )}
                </button>
            </form>
            <div className="flex mr-2 text-blue-500 cursor-pointer hover:text-blue-600">
                <BsFillImageFill
                    size={20}
                    onClick={() => imageRef.current?.click()}
                />
                <input
                    type="file"
                    hidden
                    ref={imageRef}
                    onChange={handleImageChange}
                />
            </div>
        </div>
    );
};

export default MessageInput;
