import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import TransactionReducer from "./transactionSlice"
import walletReducer from "./wallet/walletSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: TransactionReducer,
    wallet: walletReducer,
  }
});

export default store;
