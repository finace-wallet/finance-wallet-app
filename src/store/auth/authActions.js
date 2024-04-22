import { setToken } from "./authSlice";

export const loginSuccess = (token) => (dispatch) => {
  dispatch(setToken(token));
};
