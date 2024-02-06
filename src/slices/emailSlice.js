import { createSlice } from '@reduxjs/toolkit';

export const emailSlice = createSlice({
  name: 'email',
  initialState: {
    sentEmails: [],
  },
  reducers: {
    sendEmail: (state, action) => {
      state.sentEmails.push(action.payload);
    },
  },
});

export const { sendEmail } = emailSlice.actions;

export const selectSentEmails = (state) => state.email.sentEmails;

export default emailSlice.reducer;
