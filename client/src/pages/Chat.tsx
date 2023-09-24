import { FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
    addConversation,
    getConversations,
    selectConversation,
    updateConversations,
} from '../store/reduces/conversationSlice';
import { useSocketContext } from '../contexts/SocketContext';
import { toast } from 'react-toastify';

import { BiSearch } from 'react-icons/bi';
import { GiConversation } from 'react-icons/gi';
import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';
import Spinner from '../components/Spinner';
import { messageService, userService } from '../services';

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
            dispatch(updateConversations(conversationId));
        });
    }, [socket, dispatch]);

    const handleConversationSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (isLoadingUser || userText.length === 0) {
            return;
        }

        setIsLoadingUser(true);

        userService
            .getUserByUsername(userText)
            .then((user) => {
                const messagingYourself = user._id === currentUser?._id;
                if (messagingYourself) {
                    toast.error('You cannot message yourself');
                    return;
                }

                const conversationAlreadyExists = conversations?.find(
                    (conversation) =>
                        conversation.participants[0]._id === user._id
                );

                if (conversationAlreadyExists) {
                    dispatch(selectConversation(conversationAlreadyExists));
                    return;
                }

                messageService
                    .createConversation(user._id)
                    .then((createdConversation) => {
                        dispatch(
                            addConversation({
                                ...createdConversation,
                                participants: [user, currentUser],
                            })
                        );
                        setUserText('');
                    })
                    .catch((error) => {
                        throw error;
                    });
            })
            .catch((error) => toast.error(error.message))
            .finally(() => setIsLoadingUser(false));
    };

    return (
        <section className="absolute left-[50%] w-full lg:w-[750px] p-0 translate-x-[-50%]">
            <div className="flex flex-col md:flex-row gap-4 mx-auto">
                <div className="flex flex-30 gap-2 flex-col sm:max-w-[250px] md:max-w-full mx-auto">
                    <p className="font-bold text-gray-300">
                        Your Conversations
                    </p>
                    <form onSubmit={handleConversationSearch}>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-1 text-black rounded-lg"
                                type="text"
                                placeholder="Search for a user"
                                value={userText}
                                onChange={(event) =>
                                    setUserText(event.target.value)
                                }
                            />
                            <button type="submit" disabled={isLoadingUser}>
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
                    <div className="flex flex-70 rounded-lg p-2 flex-col items-center justify-center h-96">
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
