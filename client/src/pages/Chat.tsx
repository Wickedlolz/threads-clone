import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';

import {
    getConversations,
    updateConversations,
} from '../store/reduces/conversationSlice';
import { toast } from 'react-toastify';
import { useSocketContext } from '../contexts/SocketContext';

import { BiSearch } from 'react-icons/bi';
import { GiConversation } from 'react-icons/gi';
import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';

const Chat = () => {
    const dispatch = useAppDispatch();
    const { conversations, selectedConversation } = useAppSelector(
        (state) => state.conversations
    );
    const { socket, onlineUsers } = useSocketContext();

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

    return (
        <section className="absolute left-[50%] w-full lg:w-[750px] p-0 translate-x-[-50%]">
            <div className="flex flex-col md:flex-row gap-4 mx-auto">
                <div className="flex flex-30 gap-2 flex-col sm:max-w-[250px] md:max-w-full mx-auto">
                    <p className="font-bold text-gray-300">
                        Your Conversations
                    </p>
                    <form>
                        <div className="flex items-center gap-2">
                            <input
                                className="p-1 text-black rounded-lg"
                                type="text"
                                placeholder="Search for a user"
                            />
                            <button>
                                <BiSearch size={22} />
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
