export interface IThread {
    _id: string;
    postedBy: IPostedBy;
    text: string;
    likes: string[];
    replies: IReplay[];
    img: string;
    createdAt: string;
    updatedAt: string;
    repostedBy: string[];
    __v: number;
}

export interface IReplay {
    _id: string;
    userId: string;
    text: string;
    userProfilePic: string;
    username: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
}

export interface IPostedBy {
    createdAt: string;
    email: string;
    updatedAt: string;
    _id: string;
    name: string;
    username: string;
    photoURL: string;
    followers: string[];
    following: string[];
    bio: string;
}
