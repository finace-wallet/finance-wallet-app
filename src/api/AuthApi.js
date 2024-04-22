import axios from "axios";
import { FINANCE_WALLET_API } from "../util/AppConstant";
import { setTokenAction } from "../store/auth/authActions";

export async function register(user) {
  let response = null;
  await axios({
    url: `${FINANCE_WALLET_API}auth/register`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: user,
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}

export async function login(user) {
  let response = null;

  await axios({
    url: `${FINANCE_WALLET_API}auth/login`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    data: user,
  })
    .then((res) => {
      const token = res.data.data.accessToken;
      localStorage.setItem("token", token);
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  console.log(response);
  return response;
}


  export async function changePassword(changePasswordRequest) {
    let response = null;
    try {
      const token = localStorage.getItem("token");
      setTokenAction(token);

      response = await axios({
        url: `${FINANCE_WALLET_API}auth/change-password`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        method: "PUT",
        data: changePasswordRequest,
      });
    } catch (error) {
      response = error.response;
    }

    return response;
  }
