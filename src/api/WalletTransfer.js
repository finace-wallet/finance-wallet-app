import axios from "axios";
import { WALLET_API } from "util/AppConstant";

export async function getAllWalletsByRecipientEmail(data) {

  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/display-recipient`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    data,
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}
