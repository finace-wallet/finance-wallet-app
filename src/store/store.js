import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if any
  },
});

export default store;
