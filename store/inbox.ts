import inboxSeedData from "@/data/storeSeed";
import { BillowAction } from "@/interfaces/BillowAction";
import { createSlice } from "@reduxjs/toolkit";

export const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxSeedData,
  reducers: {
    markRead(state, action: BillowAction<number>) {
      const idx = state.findIndex((msg) => msg.id === action.payload);
      state[idx].read = true;
    },

    markUnread(state, action) {
      const idx = state.findIndex((msg) => msg.id === action.payload);
      state[idx].read = false;
    },
    markImportant(state, action) {
      const idx = state.findIndex((msg) => msg.id === action.payload);
      state[idx].important = true;
    },
    markUnimportant(state, action) {
      const idx = state.findIndex((msg) => msg.id === action.payload);
      state[idx].important = false;
    },
    deleteMessage(state, action) {
      return state.filter((msg) => msg.id !== action.payload);
    }
  }
});
