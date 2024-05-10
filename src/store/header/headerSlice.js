import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedHeader: null,
};


const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
      setHeader(state, action) {
        state.selectedHeader = action.payload;
      },
    },
  });

  export const {setHeader} = headerSlice.actions;

  export default headerSlice.reducer;