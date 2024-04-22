import axios from "axios";
import { WALLET_API } from "../util/AppConstant";

export async function createWallet(wallet) {
    let response = null;
    let token = localStorage.getItem('token');
  await axios({
    url: `${WALLET_API}/create `,
    headers: {
      "Content-Type": "application/json",
      "Authorization":`Bearer ${token}`
    
    },
    method: "POST",
    data: wallet,
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
          response = e.response;
    });
  return response;
}

