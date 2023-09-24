import { IUser } from './user';

export interface IConversation {
    _id: string;
    participants: IUser[];
    lastMessage: ILastMessage;
}

export interface ILastMessage {
    text: string;
    sender: string;
    seen: boolean;
}
