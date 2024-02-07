import { createSlice } from '@reduxjs/toolkit';

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    sendMail: [],
    receivedMail: []
  },
  reducers: {
    addSendMail: (state, action) => {
      state.sendMail.push(action.payload);
    },
    setSendMail: (state, action) => {
      state.sendMail = action.payload;
    },
    addReceivedMail: (state, action) => {
      state.receivedMail.push(action.payload);
    },
    setReceivedMail: (state, action) => {
      state.receivedMail = action.payload;
    }
  }
});

export const { addSendMail, setSendMail, addReceivedMail, setReceivedMail } = emailSlice.actions;

export const selectSendMail = state => state.email.sendMail;
export const selectReceivedMail = state => state.email.receivedMail;

export default emailSlice.reducer;
