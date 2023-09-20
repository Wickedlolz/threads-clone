export interface IUserDto {
    email: string;
    password: string;
    name: string;
    username: string;
    bio: string;
    photoURL: string;
}

export interface IUser {
    email: string;
    _id: string;
    name: string;
    username: string;
    createdAt: string;
    photoURL: string;
    followers: string[];
    following: string[];
    bio: string;
}
