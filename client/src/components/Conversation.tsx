import VerifiedBadge from '../assets/verified_badge.svg';
import { IConversation } from '../interfaces/conversation';
import { useAppSelector } from '../store';

import { BsCheck2All, BsFillImageFill } from 'react-icons/bs';

type ConversationProps = {
    isOnline: boolean;
    conversation: IConversation;
};

const Conversation = ({ conversation }: ConversationProps) => {
    const user = conversation.participants[0];
    const currentUser = useAppSelector((state) => state.auth.user);
    const lastMessage = conversation.lastMessage;
    const selectedConversation = useAppSelector(
        (state) => state.conversations.selectedConversation
    );

    return (
        <div
            className={`flex gap-4 rounded-lg items-center p-1 ${
                selectedConversation?._id === conversation._id
                    ? 'bg-gray-600'
                    : ''
            } hover:cursor-pointer hover:bg-gray-600 hover:text-white`}
        >
            <div>
                <img
                    className="w-12 h-12 rounded-full cursor-pointer object-cover"
                    src={user?.photoURL}
                    alt={user?.name}
                />
            </div>
            <div className="flex flex-col font-medium">
                <p className="font-bold flex items-center">
                    {user?.username}{' '}
                    <img
                        className="w-4 h-4 ml-1"
                        src={VerifiedBadge}
                        alt="verified badge"
                    />
                </p>
                <p className="flex font-medium items-center gap-1">
                    {currentUser?._id === lastMessage.sender && (
                        <div
                            className={`${
                                lastMessage.seen ? 'text-blue-400' : ''
                            }`}
                        >
                            <BsCheck2All size={16} />
                        </div>
                    )}
                    {lastMessage.text.length > 18
                        ? lastMessage.text.substring(0, 18) + '...'
                        : lastMessage.text || <BsFillImageFill size={16} />}
                </p>
            </div>
        </div>
    );
};

export default Conversation;
