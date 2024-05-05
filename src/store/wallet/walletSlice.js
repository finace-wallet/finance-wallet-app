import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallets: null,
  walletId: null,
  walletName: null,
  walletAmount: null,
  walletCurrentType: null,
  walletDescription: null,
  error: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletId(state, action) {
      state.walletId = action.payload;
    },
    setWalletAmount(state, action) {
      state.walletAmount = action.payload;
    },
    setWalletDetails: (state, action) => {
      state.wallets = action.payload;
    },
    updateWallet: (state, action) => {
      state.wallets = action.payload; // Update wallets with new data
    },
  },
});

export const { setWalletId, setWalletAmount, setWalletDetails } =
  walletSlice.actions;

export default walletSlice.reducer;
