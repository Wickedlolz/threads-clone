import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import { IMessage } from '../interfaces/message';

import { BsCheck2All } from 'react-icons/bs';

type MessageProps = {
    ownMessage: boolean;
    message: IMessage;
};

const Message = ({ ownMessage, message }: MessageProps) => {
    const selectedConversation = useAppSelector(
        (state) => state.conversations.selectedConversation
    );
    const user = useAppSelector((state) => state.auth.user);

    return (
        <div className={ownMessage ? 'self-end' : ''}>
            {ownMessage ? (
                <div className="flex gap-2 self-end">
                    {message.text && (
                        <div className="flex flex-col bg-gray-500 rounded-lg">
                            <p className="max-w-sm bg-gray-500 py-1 px-2 break-words rounded-lg">
                                {message.text}
                            </p>
                            <div
                                className={`self-end mr-2 font-bold ${
                                    message.seen ? 'text-blue-300' : ''
                                }`}
                            >
                                <BsCheck2All size={16} />
                            </div>
                        </div>
                    )}
                    <div className="mr-2">
                        <img
                            className="w-9 h-9 rounded-full cursor-pointer object-cover"
                            src={user?.photoURL}
                            alt={user?.name}
                        />
                    </div>
                </div>
            ) : (
                <div className="flex gap-2">
                    <Link
                        to={`/profile/${selectedConversation?.participants[0].username}`}
                    >
                        <img
                            className="w-9 h-9 rounded-full cursor-pointer object-cover"
                            src={selectedConversation?.participants[0].photoURL}
                            alt={selectedConversation?.participants[0].name}
                        />
                    </Link>
                    {message.text && (
                        <p className="max-w-sm bg-blue-400 py-1 px-2 break-words rounded-lg">
                            {message.text}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Message;
