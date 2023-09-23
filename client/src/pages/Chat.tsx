import { BiSearch } from 'react-icons/bi';
import Conversation from '../components/Conversation';
import MessageContainer from '../components/MessageContainer';

const Chat = () => {
    return (
        <section className="absolute left-[50%] w-full lg:w-[750px] p-0 translate-x-[-50%]">
            <div className="flex flex-col md:flex-row gap-4 mx-auto">
                <div className="flex flex-30 gap-2 flex-col sm:max-w-[250px] md:max-w-full mx-auto">
                    <p className="font-bold text-gray-500">
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
                    <Conversation />
                </div>
                <MessageContainer />
            </div>
        </section>
    );
};

export default Chat;
