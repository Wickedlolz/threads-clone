export interface IThread {
    postedBy: string;
    text: string;
    img: string;
    likes: string[];
    replies: IReplay[];
}

export interface IReplay {
    userId: string;
    text: string;
    userProfilePic: string;
    username: string;
}
