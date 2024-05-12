import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedWalletHeader: null,
};


const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
      setWalletHeader(state, action) {
        state.selectedWalletHeader = action.payload;
      },
    },
  });

  export const {setWalletHeader} = headerSlice.actions;

  export default headerSlice.reducer;