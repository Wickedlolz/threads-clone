type MessageProps = {
    ownMessage: boolean;
};

const Message = ({ ownMessage }: MessageProps) => {
    return (
        <>
            {ownMessage ? (
                <div className="flex gap-2 self-end">
                    <p className="max-w-sm bg-blue-400 p-1 rounded-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quas, accusantiumi
                    </p>
                    <img
                        className="w-12 h-12 rounded-full cursor-pointer object-cover"
                        src="https://images.unsplash.com/photo-1513462447748-c1d2dd474b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="asd"
                    />
                </div>
            ) : (
                <div className="flex gap-2">
                    <img
                        className="w-12 h-12 rounded-full cursor-pointer object-cover"
                        src="https://images.unsplash.com/photo-1513462447748-c1d2dd474b1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                        alt="asd"
                    />
                    <p className="max-w-sm bg-blue-400 p-1 rounded-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quas, accusantiumi
                    </p>
                </div>
            )}
        </>
    );
};

export default Message;
