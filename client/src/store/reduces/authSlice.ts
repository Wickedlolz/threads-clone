import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IUser } from '../../interfaces/user';
import { GET_USER } from '../actions/user';
import { authService } from '../../services';

export const getUser = createAsyncThunk(GET_USER, () => {
    return authService.getProfile();
});

export interface AuthState {
    user: IUser | null;
}

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        removeUser: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });
    },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;
