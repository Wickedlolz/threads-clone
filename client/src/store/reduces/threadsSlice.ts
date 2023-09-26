import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IThread } from '../../interfaces/thread';
import {
    CREATE_THREAD,
    DELETE_THREAD_BY_ID,
    GET_FEED,
    GET_THREAD_BY_ID,
    GET_USER_THREADS,
} from '../actions/thread';
import { threadService, userService } from '../../services';
import { IUser } from '../../interfaces/user';
import { FOLLOW_UNFOLLOW } from '../actions/user';

export interface ThreadsState {
    feed: IThread[] | null;
    thread: IThread | null;
    user: IUser | null;
    loading: boolean;
    updating: boolean;
}

const initialState: ThreadsState = {
    feed: null,
    thread: null,
    user: null,
    loading: false,
    updating: false,
};

export const threadsSlice = createSlice({
    name: 'threads',
    initialState,
    reducers: {
        setThreads: (state, action) => {
            state.feed = action.payload;
        },
        updateThreadReply: (state, action) => {
            const reply = state.thread?.replies.find(
                (reply) => reply._id === action.payload._id
            );
            const replyIndex = state.thread?.replies.findIndex(
                (reply) => reply._id === action.payload._id
            );

            if (reply) {
                state.thread!.replies[replyIndex!] = action.payload;
            }
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

                if (state.thread) {
                    state.thread = action.payload;
                }
            } else if (state.thread) {
                state.thread = action.payload;
            }
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        },
        clearThread: (state) => {
            state.thread = null;
        },
        clearThreads: (state) => {
            state.feed = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadFeed.pending, (state) => {
                state.loading = true;
                state.feed = [];
            })
            .addCase(loadFeed.fulfilled, (state, action) => {
                state.loading = false;
                state.feed = action.payload;
            })
            .addCase(loadThreadById.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadThreadById.fulfilled, (state, action) => {
                state.loading = false;
                state.thread = action.payload;
            })
            .addCase(deleteThreadById.pending, (state) => {
                state.updating = true;
            })
            .addCase(deleteThreadById.fulfilled, (state, action) => {
                state.feed = state.feed!.filter(
                    (thread) => thread._id !== action.payload._id
                );
                state.updating = false;
            })
            .addCase(loadUserThreads.pending, (state) => {
                state.loading = true;
                state.user = null;
                state.feed = [];
            })
            .addCase(loadUserThreads.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload[0];
                state.feed = action.payload[1];
            })
            .addCase(followUnfollowUser.pending, (state) => {
                state.updating = true;
            })
            .addCase(followUnfollowUser.fulfilled, (state) => {
                state.updating = false;
            })
            .addCase(createThread.pending, (state) => {
                state.updating = true;
            })
            .addCase(createThread.fulfilled, (state, action) => {
                state.feed?.unshift(action.payload);
                state.updating = false;
            });
    },
});

export const loadFeed = createAsyncThunk(GET_FEED, async () => {
    return threadService.getFeed();
});

export const loadThreadById = createAsyncThunk(
    GET_THREAD_BY_ID,
    async (threadId: string) => {
        return threadService.getThreadById(threadId);
    }
);

export const deleteThreadById = createAsyncThunk(
    DELETE_THREAD_BY_ID,
    async (threadId: string) => {
        return threadService.deleteThreadById(threadId);
    }
);

export const loadUserThreads = createAsyncThunk(
    GET_USER_THREADS,
    async (username: string) => {
        return Promise.all([
            userService.getUserByUsername(username),
            threadService.getUserThreads(username),
        ]);
    }
);

export const followUnfollowUser = createAsyncThunk(
    FOLLOW_UNFOLLOW,
    async (userId: string) => {
        return userService.followUnfollow(userId);
    }
);

export const createThread = createAsyncThunk(
    CREATE_THREAD,
    async ({ text, imageUrl }: { text: string; imageUrl: string }) => {
        return threadService.createThread(text, imageUrl);
    }
);

export const {
    setThreads,
    updateThread,
    updateUser,
    updateThreadReply,
    clearThread,
    clearThreads,
} = threadsSlice.actions;

export default threadsSlice.reducer;
