import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../interfaces/conversation';
import { GET_COVERSATIONS } from '../actions/conversation';
import { messageService } from '../../services';

export interface IConversationsInitialState {
    conversations: IConversation[] | null;
    selectedConversation: IConversation | null;
}

const initialState: IConversationsInitialState = {
    conversations: null,
    selectedConversation: null,
};

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addConversation: (state, action) => {
            state.conversations = [action.payload, ...state.conversations!];
        },
        selectConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
        updateConversations: (state, action) => {
            const conversations = state.conversations;
            conversations?.map((conversation) => {
                if (conversation._id === action.payload) {
                    return {
                        ...conversation,
                        lastMessage: {
                            ...conversation.lastMessage,
                            seen: true,
                        },
                    };
                }
                return conversation;
            });

            state.conversations = conversations;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getConversations.fulfilled, (state, action) => {
            state.conversations = action.payload;
        });
    },
});

export const getConversations = createAsyncThunk(GET_COVERSATIONS, async () => {
    return messageService.loadConversations();
});

export const { addConversation, updateConversations } =
    conversationSlice.actions;

export default conversationSlice.reducer;
