import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../interfaces/conversation';
import { GET_COVERSATIONS } from '../actions/conversation';
import { messageService } from '../../services';

export interface IConversationsInitialState {
    conversations: IConversation[] | null;
    selectedConversation: IConversation | null;
    newMessageNotification: {
        isNew: boolean;
        conversationId: string | null;
    };
}

const initialState: IConversationsInitialState = {
    conversations: null,
    selectedConversation: null,
    newMessageNotification: {
        isNew: false,
        conversationId: null,
    },
};

export const conversationSlice = createSlice({
    name: 'conversations',
    initialState,
    reducers: {
        addConversations: (state, action) => {
            state.conversations = action.payload;
        },
        addConversation: (state, action) => {
            state.conversations = [action.payload, ...state.conversations!];
        },
        selectConversation: (state, action) => {
            state.selectedConversation = action.payload;
        },
        removeConversation: (state, action) => {
            state.conversations = state.conversations!.filter(
                (conversation) => conversation._id !== action.payload._id
            );
        },
        updateConversations: (state, action) => {
            const { conversationId } = action.payload;
            state.conversations?.map((conversation) => {
                if (conversation._id === conversationId) {
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
        },
        setNewMessageNotification: (state, action) => {
            state.newMessageNotification = action.payload;
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

export const {
    addConversations,
    addConversation,
    updateConversations,
    selectConversation,
    setNewMessageNotification,
    removeConversation,
} = conversationSlice.actions;

export default conversationSlice.reducer;
