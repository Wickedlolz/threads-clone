import { IMessage } from '../interfaces/message';
import { useAppSelector } from '../store';

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
        <>
            {ownMessage ? (
                <div className="flex gap-2 self-end">
                    {message.text && (
                        <p className="max-w-sm bg-blue-400 p-1.5 rounded-lg">
                            {message.text}
                        </p>
                    )}

                    <img
                        className="w-9 h-9 rounded-full cursor-pointer object-cover"
                        src={user?.photoURL}
                        alt={user?.name}
                    />
                </div>
            ) : (
                <div className="flex gap-2">
                    <img
                        className="w-9 h-9 rounded-full cursor-pointer object-cover"
                        src={selectedConversation?.participants[0].photoURL}
                        alt={selectedConversation?.participants[0].name}
                    />
                    {message.text && (
                        <p className="max-w-sm bg-blue-400 p-1.5 rounded-lg">
                            {message.text}
                        </p>
                    )}
                </div>
            )}
        </>
    );
};

export default Message;
