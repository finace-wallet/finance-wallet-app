import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import walletReducer from "./wallet/walletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
  
  },
});

export default store;
