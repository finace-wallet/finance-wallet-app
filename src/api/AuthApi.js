import axios from "axios";
import { FINANCE_WALLET_API } from "../util/AppConstant";

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

export async function forgetPassword(user) {
  let response = null;

  await axios({
    url: "http://localhost:8080/api/v1/auth/forget-password",
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
  console.log(response);
  return response;
}
