import { useParams } from "react-router-dom"
import { deleteApi } from "../../api/wallet/DeleteApi"

export default function confirmDelete(props){
    const {id} = useParams()
    return (
        <>
            <button onClick={() => {
                deleteApi(id)
            }}>Xác nhận xoá</button>
        </>
    )
}