export interface Thread {
    id: string;
    author: User;
    content: string;
    image?: string;
    replies?: Reply[];
    repliesCount: number;
    likesCount: number;
    mention?: boolean;
    mentionUser: User;
    createdAt: string;
}

export interface Reply {
    id: string;
    author: User;
    content: string;
    likes: number;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    username: string;
    verified: boolean;
    photo: string;
    bio: string;
    link?: string;
    followers?: User[];
}

export interface IThread {
    _id: string;
    postedBy: IPostedBy;
    img?: string;
    text: string;
    likes: string[];
    replies: IReply[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    repostedBy: string[];
}

interface IPostedBy {
    _id: string;
    email: string;
    password: string;
    name: string;
    username: string;
    photoURL: string;
    followers: string[];
    following: string[];
    bio: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface IReply {
    _id: string;
    userId: string;
    text: string;
    userProfilePic: string;
    username: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
