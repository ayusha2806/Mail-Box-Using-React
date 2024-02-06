// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import emailReducer from '../slices/emailSlice'; // Import the emailSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer, // Add the email reducer to the store
  },
});

export default store;
