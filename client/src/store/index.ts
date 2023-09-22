import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import authReducer from './reduces/authSlice';
import threadReducer from './reduces/threadsSlice';
import replyModalReducer from './reduces/replyModalSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        threads: threadReducer,
        replyModal: replyModalReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
