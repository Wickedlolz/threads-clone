import { IoSendSharp } from 'react-icons/io5';

const MessageInput = () => {
    return (
        <form className="relative">
            <input
                type="text"
                className="w-full p-2 text-black"
                placeholder="Type a message"
            />
            <div className="absolute top-2 right-2 text-2xl text-blue-400 cursor-pointer hover:text-blue-600">
                <IoSendSharp />
            </div>
        </form>
    );
};

export default MessageInput;
