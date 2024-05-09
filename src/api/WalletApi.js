import axios from "axios";
import { FINANCE_WALLET_API, WALLET_API } from "util/AppConstant";
import { setTokenAction } from "../store/auth/authActions";

export async function transferMoney(transferMoney) {
  let response = null;
  try {
    const token = localStorage.getItem("token");
    setTokenAction(token);

    response = await axios({
      url: `${FINANCE_WALLET_API}wallets/transfer`,
      headers: {
        "Content-Type": "aplication/json",
        Authorization: `Bearer ${token},`,
      },
      method: "POST",
      data: transferMoney,
    });
  } catch (error) {
    response = error.response;
  }
  return response;
}

export async function displayWalletList(pageNumber) {
  let response = null;
  const token = localStorage.getItem("token");

  try {
    response = await axios.post(
      `${FINANCE_WALLET_API}wallets/list/owner`,
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

export async function createWallet(data) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/create `,
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
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/list/owner?page=${currentPage}`,
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
  console.log("Wallet owner: ", response);
  return response;
}

export async function findShareWallet(data) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/display-recipient `,
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

export async function transferWallet(data) {
  let response = null;
  const token = localStorage.getItem("token");

  try {
    response = await axios.post(`${WALLET_API}/transfer`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 403) {
      console.error("Error: Sharing with your own email is forbidden.");
    } else {
      response = response.data; // Assuming the response contains the actual data
    }

    return response;
  } catch (error) {
    console.error("Error transferring wallet:", error);
    throw error; // Re-throw the error for further handling if needed
  }
}
