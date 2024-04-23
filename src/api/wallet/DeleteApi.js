
export async function deleteApi(id){
  const token = localStorage.getItem("token")
await axios({
    url: `$localhost:8080/api/v1/wallets/${id}`,
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