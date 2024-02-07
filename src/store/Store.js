// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer, { selectUser } from '../slices/authSlice'; // Import the auth reducer and selectUser selector
import emailReducer from '../slices/emailSlice'; // Import the emailSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    email: emailReducer, // Add the email reducer to the store
  },
});

export default store;
export { selectUser }; // Export the selectUser selector
