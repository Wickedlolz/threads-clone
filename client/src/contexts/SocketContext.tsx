import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import io, { Socket } from 'socket.io-client';
import { useAppSelector } from '../store';

interface InitialSocketState {
    socket: Socket | null;
    onlineUsers: string[];
}

export const SocketContext = createContext<InitialSocketState>({
    socket: null,
    onlineUsers: [],
});

type SocketContextProviderProps = {
    children: ReactNode;
};

export const SocketContextProvider = ({
    children,
}: SocketContextProviderProps) => {
    const user = useAppSelector((state) => state.auth.user);
    const [socket, setSocket] = useState<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

    useEffect(() => {
        const socket = io('http://localhost:5000', {
            query: {
                userId: user?._id,
            },
        });

        setSocket(socket);

        socket.on('getOnlineUsers', (users) => {
            setOnlineUsers(users);
        });

        return () => {
            socket && socket.close();
        };
    }, [user?._id]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
    const state = useContext(SocketContext);
    return state;
};
