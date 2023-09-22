import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IThread } from '../../interfaces/thread';
import { GET_FEED } from '../actions/thread';
import { threadService } from '../../services';

export const loadFeed = createAsyncThunk(GET_FEED, async () => {
    return threadService.getFeed();
});

export interface ThreadsState {
    feed: IThread[] | null;
    loading: boolean;
}

const initialState: ThreadsState = {
    feed: null,
    loading: false,
};

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.feed = action.payload;
        },
        updateThread: (state, action) => {
            const thread = state.feed?.find(
                (thread) => thread._id === action.payload._id
            );

            if (thread) {
                const threadIndex = state.feed?.findIndex(
                    (thread) => thread._id === action.payload._id
                );
                state.feed![threadIndex!] = action.payload;
            }
        },
        clearThreads: (state) => {
            state.feed = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFeed.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = action.payload;
            });
    },
});

export const { setThreads, updateThread, clearThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
