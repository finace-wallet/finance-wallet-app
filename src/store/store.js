import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import TransactionReducer from "./transactionSlice";
import walletReducer from "./wallet/walletSlice";
import headerReducer from "./header/headerSlice";
import transactionOverviewReducer from "./transaction/transactionOverviewSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction: TransactionReducer,
    wallet: walletReducer,
    header: headerReducer,
    transactionOverview: transactionOverviewReducer,
  },
});

export default store;
