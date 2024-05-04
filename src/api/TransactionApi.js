import axios from "axios";
import { FINANCE_WALLET_API } from "util/AppConstant";

export const getTransactionList = async(walletId,page,size) => {
    const token = localStorage.getItem("token");
    return await axios.get(`${FINANCE_WALLET_API}/wallets/${walletId}/transactions?page=${page}&size=${size}`,{
        headers:{
                Authorization: `Bearer ${token}`,
        },
    });
}