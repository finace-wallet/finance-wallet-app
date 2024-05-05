import axios from "axios";
import { FINANCE_WALLET_API, WALLET_API } from "util/AppConstant";

export async function displayWalletList(pageNumber) {
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
  console.log("walletId ", walletId, "walletAmount ", amount);
  try {
    response = await axios.post(
      `${FINANCE_WALLET_API}wallets/add-money`,
      {
        walletId,
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

export async function createWallet(wallet) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/create `,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export async function displayWalletDetail(walletId) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/${walletId} `,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}


export async function listWallet(currentPage) {
  console.log(currentPage);
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/list?page=${currentPage}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
    params: {
      page: currentPage,
    },
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}
