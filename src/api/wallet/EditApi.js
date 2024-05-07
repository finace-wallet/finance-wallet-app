import axios from "axios";

export async function edit(wallet, id) {
    let response = null;
    const token = localStorage.getItem("token")
    await axios({
      url: `http://localhost:8080/api/v1/wallets/edit/${id}`,
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "PUT",
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