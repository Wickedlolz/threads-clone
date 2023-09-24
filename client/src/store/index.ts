import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authSlice from './reduces/authSlice';
import threadsSlice from './reduces/threadsSlice';
import conversationSlice from './reduces/conversationSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        threads: threadsSlice,
        conversations: conversationSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
