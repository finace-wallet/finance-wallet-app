import axios from "axios";
import { FINANCE_WALLET_API } from "util/AppConstant";

export async function displayWallet(pageNumber) {
  let response = null;
  const token = localStorage.getItem("token");

  try {
    response = await axios.post(
      `${FINANCE_WALLET_API}wallets/list`,
      {
        page: pageNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    response = error.response;
  }
  console.log("Response", response);
  return response;
}

export async function addMoneyToWallet(walletId, amount) {
  // Pass walletId and amount as arguments

  let response = null;
  const token = localStorage.getItem("token");

  try {
    response = await axios.post(
      `${FINANCE_WALLET_API}wallets/add-money`,
      {
        walletId, // Use the passed arguments here
        amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    response = error.response;
  }
  console.log("Add money response", response);
  return response;
}
