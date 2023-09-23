import VerifiedBadge from '../assets/verified_badge.svg';

const Conversation = () => {
    return (
        <div className="flex gap-4 rounded-lg items-center p-1 hover:cursor-pointer hover:bg-gray-600 hover:text-white">
            <div>
                <img
                    className="w-12 h-12 rounded-full cursor-pointer object-cover"
                    src="https://images.unsplash.com/photo-1513462447748-c1d2dd474b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                    alt="asd"
                />
            </div>
            <div className="flex flex-col font-medium">
                <p className="font-bold flex items-center">
                    johndoe{' '}
                    <img
                        className="w-4 h-4 ml-1"
                        src={VerifiedBadge}
                        alt="verified badge"
                    />
                </p>
                <p className="flex font-medium items-center gap-1">
                    Hello some message ...
                </p>
            </div>
        </div>
    );
};

export default Conversation;
