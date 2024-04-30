import axios from "axios";
import { setTokenAction } from "../store/auth/authActions";
import { FINANCE_WALLET_API } from "../util/AppConstant";

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