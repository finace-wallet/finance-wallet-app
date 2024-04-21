import { FINANCE_WALLET_API } from "../util/AppConstant";
const { default: axios } = require("axios");

export default axios.create({
  baseURL: `${FINANCE_WALLET_API}`,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3009",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
