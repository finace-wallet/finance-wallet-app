
export async function deleteApi(id){
await axios({
    url: `$localhost:8080/api/v1/wallets/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    
  })
    .then((res) => {
      response = res;
    })
    .catch((e) => {
      response = e.response;
    });
  return response;
}