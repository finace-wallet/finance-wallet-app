import axios from "axios";
import { WALLET_API } from "../util/AppConstant";

export default createWallet(wallet) {
    let response = null;
  await axios({
    url: `${WALLET_API}/create `,
    headers: {
      "Content-Type": "application/json",
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
