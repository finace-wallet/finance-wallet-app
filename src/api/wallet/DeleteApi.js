
import axios from "axios";
export async function deleteApi(id){
  let response = null;
  const token = localStorage.getItem("token")
await axios({
    url: `http://localhost:8080/api/v1/wallets/delete/${id}`,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    method: "PUT",
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}