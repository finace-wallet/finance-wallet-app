// authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { setTokenAction } from "./authActions"; // Update the import

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
      state.token = action.payload;
      state.isLoggedIn = true; // Set isLoggedIn to true when token is set
    },
    // setToken(state, action) {
    //   state.token = action.payload;
    //   state.isLoggedIn = true; // Set isLoggedIn to true when token is set
    // },
    // Remove loginSuccess from here
    logout(state) {
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

// Exporting the slice's actions
export const { setLogin, logout } = authSlice.actions;

export default authSlice.reducer;
