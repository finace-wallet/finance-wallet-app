// authActions.js

import { jwtDecode } from "jwt-decode";
import { setLogin } from "./authSlice";

export const setTokenAction = (token) => (dispatch) => {

  const decodedToken = jwtDecode(token);
  const user = {
    id: decodedToken.sub,
    email: decodedToken.email,
    // Add other relevant user information here
  };

  dispatch(setLogin({ accessToken: token, user }));
};
