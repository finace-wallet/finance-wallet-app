import axios from "axios";
import { useSelector } from "react-redux";
import { FINANCE_WALLET_API, WALLET_API } from "util/AppConstant";

export const getTransactionList = async (walletId, page) => {
  const token = localStorage.getItem("token");
  return await axios.get(
    `${FINANCE_WALLET_API}wallets/${walletId}/list-transaction?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export async function createTransaction(data, walletId) {
  let response = null;
  let token = localStorage.getItem("token");
  await axios({
    url: `${WALLET_API}/${walletId}/create-transaction`,
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

export async function displayTransactionCategory() {
  let response = null;
  const token = localStorage.getItem("token");
  try {
    response = await axios.get(
      `${FINANCE_WALLET_API}transactionCategories/list`,
      {
        headers: {
          Content_Type: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    response = error.response;
  }
  return response;
}

export async function createTransactionCategory(category) {
  let response = null;
  const token = localStorage.getItem("token");

  await axios({
    url: `${FINANCE_WALLET_API}transactionCategories/create`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    method: "POST",
    data: category,
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}
