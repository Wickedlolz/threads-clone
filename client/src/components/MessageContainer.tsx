import VerifiedBadge from '../assets/verified_badge.svg';
import Message from './Message';
import MessageInput from './MessageInput';

const MessageContainer = () => {
    return (
        <div className="flex flex-[70] flex-col bg-gray-800 rounded-lg p-2">
            <div className="flex w-full h-12 items-center gap-2">
                <img
                    className="w-7 h-7 rounded-full cursor-pointer object-cover"
                    src="https://images.unsplash.com/photo-1513462447748-c1d2dd474b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="asd"
                />
                johndoe{' '}
                <img
                    className="w-4 h-4"
                    src={VerifiedBadge}
                    alt="verified badge"
                />
            </div>
            <p className="w-full h-[1px] bg-gray-500"></p>
            <div className="flex flex-col gap-4 my-4 p-2 h-96 overflow-hidden">
                <Message ownMessage={true} />
                <Message ownMessage={false} />
                <Message ownMessage={true} />
                <Message ownMessage={false} />
            </div>
            <MessageInput />
        </div>
    );
};

export default MessageContainer;
