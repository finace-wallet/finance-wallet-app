// authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      state.isLoggedIn = true; // Set isLoggedIn to true when token is set
    },
    setGoogleLogin(state, action) {
      state.token = action.payload.access_token;
    },

    logout(state) {
      state.token = "";
      state.user = "";
      state.isLoggedIn = false;
    },
  },
});

// Exporting the slice's actions
export const { setLogin, logout, setGoogleLogin } = authSlice.actions;

export default authSlice.reducer;
