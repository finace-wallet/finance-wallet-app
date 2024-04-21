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
