// authSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  token: null,
  isLoggedIn: false,
  userDetails: null,
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

    setUser(state, action) {
      // New action to set user data
      state.userDetails = action.payload;
    },

    logout(state) {
      state.token = "";
      state.user = null;
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
  },
});

// Exporting the slice's actions


export const user1 = (state) => state.auth.user

export const { setLogin, logout, setGoogleLogin, setUser } = authSlice.actions;

export default authSlice.reducer;
