import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
      const {
        walletId,
        walletName,
        walletAmount,
        walletCurrentType,
        walletDescription,
      } = action.payload;
      state.walletId = walletId;
      state.walletName = walletName;
      state.walletAmount = walletAmount;
      state.walletCurrentType = walletCurrentType;
      state.walletDescription = walletDescription;
    },
  },
});

export const { setWalletId, setWalletAmount, setWalletDetails } =
  walletSlice.actions;

export default walletSlice.reducer;
