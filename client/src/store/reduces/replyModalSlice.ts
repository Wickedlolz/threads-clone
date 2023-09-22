import { createSlice } from '@reduxjs/toolkit';

export interface ReplyModalState {
    open: boolean;
    replyTo: string | null;
    threadId: string | null;
}

const initialState: ReplyModalState = {
    open: false,
    replyTo: null,
    threadId: null,
};

export const replyModalSlice = createSlice({
    name: 'replyModal',
    initialState,
    reducers: {
        showModal: (state, action) => {
            state.open = action.payload.open;
            state.replyTo = action.payload.replyTo;
            state.threadId = action.payload.threadId;
        },
        closeModal: (state) => {
            state.open = false;
            state.replyTo = null;
            state.threadId = null;
        },
    },
});

export const { showModal, closeModal } = replyModalSlice.actions;

export default replyModalSlice.reducer;
