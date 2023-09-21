import { requester } from '.';
import { IUser, IUserDto } from '../interfaces/user';

const endpoints = {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    logout: '/api/v1/auth/logout',
    profile: '/api/v1/auth/profile',
};

export const login = (email: string, password: string) => {
    return requester.post<IUser>(endpoints.login, { email, password });
};

export const register = (userDto: IUserDto) => {
    return requester.post<IUser>(endpoints.register, userDto);
};

export const logout = () => {
    return requester.post(endpoints.logout);
};

export const getProfile = () => {
    return requester.get<IUser>(endpoints.profile);
};

export const updateProfile = (usetData: IUserDto) => {
    return requester.put<IUser>(endpoints.profile, usetData);
};
