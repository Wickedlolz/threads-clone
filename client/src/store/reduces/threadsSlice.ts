import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IThread } from '../../interfaces/thread';
import { GET_FEED } from '../actions/thread';
import { threadService } from '../../services';

export const loadFeed = createAsyncThunk(GET_FEED, async () => {
    return threadService.getFeed();
});

export interface ThreadsState {
    feed: IThread[] | null;
}

const initialState: ThreadsState = {
    feed: null,
};

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.feed = action.payload;
        },
        clearThreads: (state) => {
            state.feed = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadFeed.fulfilled, (state, action) => {
            state.feed = action.payload;
        });
    },
});

export const { setThreads, clearThreads } = threadsSlice.actions;

export default threadsSlice.reducer;
