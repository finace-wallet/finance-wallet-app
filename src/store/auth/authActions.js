// authActions.js

import { setLogin } from "./authSlice";

export const setTokenAction = (token) => (dispatch) => {
  console.log(token);
  dispatch(setLogin(token));
};
