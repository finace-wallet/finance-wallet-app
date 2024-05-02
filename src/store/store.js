import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import TransactionReducer from "./transactionSlice"

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: TransactionReducer
  },
});

export default store;
