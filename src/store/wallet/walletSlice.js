import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wallets: null,
  walletId: null,
  walletName: null,
  walletAmount: null,
  walletCurrentType: null,
  walletDescription: null,
  error: null,
  walletsRecipiment: null,
  walletsRecipimentEmail: null,
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
    setWalletRecipiment: (state, action) => {
      state.walletsRecipiment = action.payload;
    },
    setWalletRecipimentEmail: (state, action) => {
      state.walletsRecipimentEmail = action.payload;
    },
  },
});

export const {
  setWalletId,
  setWalletAmount,
  setWalletDetails,
  setWalletRecipiment,
  setWalletRecipimentEmail,
} = walletSlice.actions;

export default walletSlice.reducer;
