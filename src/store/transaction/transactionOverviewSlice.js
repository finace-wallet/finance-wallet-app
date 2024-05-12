import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  allTransactions: null,
};
const transactionOverview = createSlice({
  name: "transactionOverview",
  initialState,
  reducers: {
    setAllTransaction(state, action) {
      state.allTransactions = action.payload;
    },
  },
});

// Exporting the slice's actions

export const { setAllTransaction } = transactionOverview.actions;

export default transactionOverview.reducer;
