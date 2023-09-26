import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IConversation } from '../../interfaces/conversation';
import { DELETE_COVERSATION, GET_COVERSATIONS } from '../actions/conversation';
import { messageService } from '../../services';
import { toast } from 'react-toastify';

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
        updateConversationById: (state, action) => {
            const conversations = state.conversations;

            const updatedConversations = conversations?.map((conversation) => {
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

            state.conversations = updatedConversations!;
        },
        setNewMessageNotification: (state, action) => {
            state.newMessageNotification = action.payload;
        },
        clearConversations: (state) => {
            state.conversations = null;
            state.selectedConversation = null;
            state.newMessageNotification = {
                conversationId: null,
                isNew: false,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.fulfilled, (state, action) => {
                state.conversations = action.payload;
            })
            .addCase(deleteConversationById.pending, () => {})
            .addCase(deleteConversationById.fulfilled, (state, action) => {
                state.conversations = state.conversations!.filter(
                    (conversation) => conversation._id !== action.payload._id
                );

                if (state.selectedConversation?._id === action.payload._id) {
                    state.selectedConversation = null;
                }
                toast.success('Successfully deleted conversation');
            });
    },
});

export const getConversations = createAsyncThunk(GET_COVERSATIONS, async () => {
    return messageService.loadConversations();
});

export const deleteConversationById = createAsyncThunk(
    DELETE_COVERSATION,
    async (conversationId: string) => {
        return messageService.deleteConversationById(conversationId);
    }
);

export const {
    addConversations,
    addConversation,
    updateConversationById,
    selectConversation,
    setNewMessageNotification,
    clearConversations,
} = conversationSlice.actions;

export default conversationSlice.reducer;
