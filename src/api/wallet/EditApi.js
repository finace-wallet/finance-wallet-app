import axios from "axios";

export async function edit(wallet, id) {
    let response = null;
    await axios({
      url: `localhost:8080/api/v1/wallets/edit-wallet/${id}`,
      headers: {
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