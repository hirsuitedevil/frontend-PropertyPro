import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selectedChatId : null,
    participants:null,
    messages:null,
    receiverId:null,
    newMessage:null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedConversation(state, action) {
      localStorage.clear();
      state.selectedChatId = action.payload._id;
      state.participants = action.payload.participants;
      state.messages = action.payload.messages;
    },
    addNewMessage(state, action) {
      state.newMessage = action.payload;
    },
    logoutChat(state) {
      state.selectedChatId = null;
      state.participants = null;
      state.messages = null;
      state.receiverId = null;
      state.newMessage = null;
      localStorage.clear();
    },
    setReceiverId(state, action) {
      console.log(action);
      state.receiverId = action.payload;
    },
  },
});

export const {setSelectedConversation, logoutChat, setReceiverId, addNewMessage} = chatSlice.actions;

export default chatSlice.reducer
