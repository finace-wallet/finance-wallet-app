import axios from "axios";

export default async function findWallet(id){
    let response = null;
    const token = localStorage.getItem("token")
    await axios({
    url: `http://localhost:8080/api/v1/wallets/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
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