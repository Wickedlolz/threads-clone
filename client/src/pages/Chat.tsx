import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    addConversation,
    getConversations,
    selectConversation,
    updateConversationById,
} from '../store/reduces/conversationSlice';
import { useSocketContext } from '../contexts/SocketContext';
import { messageService, userService } from '../services';
import { toast } from 'react-toastify';

import { BiSearch } from 'react-icons/bi';
import { GiConversation } from 'react-icons/gi';
import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';
import Spinner from '../components/Spinner';

const Chat = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.auth.user);
    const { conversations, selectedConversation } = useAppSelector(
        (state) => state.conversations
    );
    const { socket, onlineUsers } = useSocketContext();
    const [userText, setUserText] = useState<string>('');
    const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getConversations())
            .unwrap()
            .catch((error) => toast.error(error.message));
    }, [dispatch]);

    useEffect(() => {
        socket?.on('messagesSeen', ({ conversationId }) => {
            dispatch(updateConversationById(conversationId));
        });
    }, [socket, dispatch]);

    /**
     * Handles the search for a conversation with a user based on the provided event.
     * Prevents default form submission behavior, validates input, and initiates the conversation process.
     *
     * @param {FormEvent<HTMLFormElement>} event - The event triggered by the form submission.
     *
     * @returns {void}
     */
    const handleConversationSearch = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        if (isLoadingUser || userText.length === 0) {
            return;
        }

        setIsLoadingUser(true);

        try {
            const user = await userService.getUserByUsername(userText);

            const messagingYourself = user._id === currentUser?._id;
            if (messagingYourself) {
                toast.error('You cannot message yourself');
                return;
            }

            const conversationAlreadyExists = conversations?.find(
                (conversation) => conversation.participants[0]._id === user._id
            );

            if (conversationAlreadyExists) {
                dispatch(selectConversation(conversationAlreadyExists));
                setUserText('');
                return;
            }

            const createdConversation = await messageService.createConversation(
                user._id
            );
            dispatch(
                addConversation({
                    ...createdConversation,
                    participants: [user, currentUser],
                })
            );
            setUserText('');
        } catch (error) {
            const { message } = error as { message: string };
            toast.error(message);
        } finally {
            setIsLoadingUser(false);
        }
    };

    return (
        <section className="absolute left-[50%] w-full  p-0 translate-x-[-50%]">
            <div className="flex flex-col md:flex-row gap-4 mx-auto">
                <div className="flex gap-2 w-full flex-col sm:max-w-[30%]">
                    <p className="font-bold text-gray-300">
                        Your Conversations
                    </p>
                    <form onSubmit={handleConversationSearch}>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-1 text-black rounded-lg w-full"
                                type="text"
                                name="searchUser"
                                placeholder="Search for a user"
                                value={userText}
                                onChange={(event) =>
                                    setUserText(event.target.value)
                                }
                            />
                            <button
                                type="submit"
                                className="hover:scale-110"
                                disabled={isLoadingUser}
                            >
                                {isLoadingUser ? (
                                    <Spinner isSmall />
                                ) : (
                                    <BiSearch size={22} />
                                )}
                            </button>
                        </div>
                    </form>
                    {conversations?.map((conversation) => (
                        <Conversation
                            key={conversation._id}
                            isOnline={onlineUsers.includes(
                                conversation.participants[0]._id
                            )}
                            conversation={conversation}
                        />
                    ))}
                </div>
                {!selectedConversation && (
                    <div className="flex w-full sm:max-w-[70%] rounded-lg p-2 flex-col items-center justify-center h-96">
                        <GiConversation size={100} />
                        <p className="text-xl">
                            Select a conversation to start messaging
                        </p>
                    </div>
                )}
                {selectedConversation?._id && <MessageContainer />}
            </div>
        </section>
    );
};

export default Chat;
