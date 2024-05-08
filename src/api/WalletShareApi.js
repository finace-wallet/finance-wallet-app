import axios from "axios";
import { WALLET_API } from "util/AppConstant";

export async function shareWallet(data) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${ WALLET_API }/share `,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    data: data,
  })
    .then((res) => {
      if (res.status === 403) {
        console.error("Error: Sharing with your own email is forbidden.");
      } else {
        response = res;
      }
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}
