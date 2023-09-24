import { useAppDispatch, useAppSelector } from '../store';
import {
    selectConversation,
    setNewMessageNotification,
} from '../store/reduces/conversationSlice';
import { IConversation } from '../interfaces/conversation';

import VerifiedBadge from '../assets/verified_badge.svg';
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs';

type ConversationProps = {
    isOnline: boolean;
    conversation: IConversation;
};

const Conversation = ({ isOnline, conversation }: ConversationProps) => {
    const dispatch = useAppDispatch();
    const user = conversation.participants[0];
    const currentUser = useAppSelector((state) => state.auth.user);
    const { conversationId } = useAppSelector(
        (state) => state.conversations.newMessageNotification
    );
    const lastMessage = conversation.lastMessage;
    const selectedConversation = useAppSelector(
        (state) => state.conversations.selectedConversation
    );

    const handleSelectConversation = () => {
        if (conversation._id === conversationId) {
            dispatch(
                setNewMessageNotification({
                    isNew: false,
                    conversationId: null,
                })
            );
        }
        dispatch(selectConversation(conversation));
    };

    return (
        <div
            className={`flex gap-4 rounded-lg items-center p-1 ${
                selectedConversation?._id === conversation._id
                    ? 'bg-gray-600'
                    : ''
            } hover:cursor-pointer hover:bg-gray-600 hover:text-white w-full`}
            onClick={handleSelectConversation}
        >
            <div className="relative">
                <img
                    className="w-10 h-10 rounded-full cursor-pointer object-cover"
                    src={user?.photoURL}
                    alt={user?.name}
                />
                <span
                    className={`w-4 h-4 rounded-full ${
                        isOnline ? 'bg-green-500' : 'bg-red-500'
                    } border-2 border-white absolute bottom-0.5 right-0.5`}
                ></span>
            </div>
            <div className="flex flex-col font-medium">
                <p className="font-bold text-sm flex items-center">
                    {user?.username}{' '}
                    <img
                        className="w-4 h-4 ml-1"
                        src={VerifiedBadge}
                        alt="verified badge"
                    />
                </p>
                <div className="flex font-medium text-xs items-center gap-1">
                    {currentUser?._id === lastMessage.sender && (
                        <div
                            className={`${
                                lastMessage.seen ? 'text-blue-400' : ''
                            }`}
                        >
                            <BsCheck2All size={16} />
                        </div>
                    )}
                    {lastMessage?.text?.length > 18
                        ? lastMessage.text.substring(0, 10) + '...'
                        : lastMessage.text || <BsFillImageFill size={16} />}
                </div>
            </div>
            {conversation._id === conversationId &&
                selectedConversation?._id !== conversationId && (
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                )}
        </div>
    );
};

export default Conversation;
