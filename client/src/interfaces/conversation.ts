export interface IConversation {
    mock?: boolean;
    _id: string;
    participants: IParticipant[];
    lastMessage: ILastMessage;
    createdAt: string;
    updatedAt: string;
}

export interface ILastMessage {
    text: string;
    sender: string;
    seen: boolean;
}

interface IParticipant {
    _id: string;
    name: string;
    username: string;
    photoURL: string;
}
