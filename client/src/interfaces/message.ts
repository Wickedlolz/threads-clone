export interface IMessage {
    _id: string;
    conversationId: string;
    sender: string;
    text: string;
    seen: boolean;
    img: string;
}
