// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null, // Initial token state
    user: null,
    receiver:null // Initial user state
  },
  reducers: {
    loginSuccess: (state, action) => {
      // Update token, user, and email upon successful login
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.receiver = action.payload.receiver;
    },
    logout: (state) => {
      // Clear token, user, and email upon logout
      state.token = null;
      state.user = null;
      state.receiver = null;
    },
  },
});

// Export actions and selectors
export const { loginSuccess, logout } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectReceiver = (state) => state.auth.receiver;

// Export the reducer
export default authSlice.reducer;
