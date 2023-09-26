import { Link } from 'react-router-dom';
import { useAppSelector } from '../store';
import moment from 'moment';
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
    const createdAt = moment(message?.createdAt).fromNow();

    return (
        <div className={`${ownMessage ? 'self-end' : ''}`}>
            {ownMessage ? (
                <div className="flex gap-2 self-end">
                    {message.text && (
                        <div className="flex flex-col bg-gray-500 rounded-lg px-1 pt-0.5">
                            <p className="max-w-sm bg-gray-500 px-1 break-words rounded-lg text-sm">
                                {message.text}
                            </p>
                            <div
                                className={`overflow-hidden flex items-center justify-end gap-1 self-end mr-2 font-bold`}
                            >
                                <span className="text-[9px] pl-1">
                                    {createdAt}
                                </span>
                                <BsCheck2All
                                    size={16}
                                    className={`${
                                        message.seen ? 'text-blue-300' : ''
                                    }`}
                                />
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
                        <div className="flex flex-col bg-blue-400 rounded-lg px-1 pt-0.5">
                            <p className="max-w-sm bg-blue-400 px-1 break-words rounded-lg text-sm">
                                {message.text}
                            </p>
                            <div
                                className={`overflow-hidden flex items-center justify-end gap-1 self-end mr-2 font-bold`}
                            >
                                <span className="text-[9px] pl-1">
                                    {createdAt}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Message;
