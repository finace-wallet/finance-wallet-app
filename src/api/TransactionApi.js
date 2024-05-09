import axios from "axios";
import { FINANCE_WALLET_API } from "util/AppConstant";

export const getTransactionList = async(walletId,page) => {
    const token = localStorage.getItem("token");
    return await axios.get(`${FINANCE_WALLET_API}wallets/${walletId}/transactions?page=${page}`,{
        headers:{
                Authorization: `Bearer ${token}`,
        },
    });
}

export async function getTransactionCategory() {
    let response = null;
    const token = localStorage.getItem("token");
    try {
        response = await axios.get(
            `${FINANCE_WALLET_API}transactionCategories/list`,
            {
                headers: {
                    "Content_Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        response = error.response;
    }
    console.log("🚀 ~ getTransactionCategory ~ response:", response);
    return response;
}


export async function createTransactionCategory(category) {
    let response = null;
    const token = localStorage.getItem("token");
   
    await axios({
      url: `${FINANCE_WALLET_API}transactionCategories/create`,
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
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