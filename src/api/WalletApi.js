import axios from "axios";
import { FINANCE_WALLET_API } from "util/AppConstant";

export async function displayWallet(pageNumber) {
  let response = null;
  const token = localStorage.getItem("token");

  try {
    response = await axios.get(`${FINANCE_WALLET_API}wallets/list`, {
      params: {
        page: pageNumber,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    response = error.response;
  }

  console.log("Wallet response", response);
  return response;
}
