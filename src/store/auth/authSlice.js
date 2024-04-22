import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    signUpSuccess(state, action) {
      state.isLoading = false;
      state.user = action.payload;
    },
    signUpFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setToken(state, action) {
      // Add setToken reducer
      state.token = action.payload;
    },
  },
});

export const { signUpStart, signUpSuccess, signUpFailure, setToken } =
  authSlice.actions;

export default authSlice.reducer;
