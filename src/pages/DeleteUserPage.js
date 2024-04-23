import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import Button from "../components/button/Button";
import { deleteUser } from "../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteUser(); 
      toast.success("Người dùng đã được xóa thành công!");
      console.log("Server response", response.data);
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Đã xảy ra lỗi khi xóa người dùng.");
    }
    setIsDeleting(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <Button
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Xóa Người Dùng
        </Button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa người dù này không?
            </p>
            <div className="flex justify-end">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 mr-4 rounded"
              >
                Hủy
              </Button>
              <Button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                disabled={isDeleting}
              >
                {isDeleting ? "Đang Xóa..." : "Đồng Ý"}
              </Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </Layout>
  );
};

export default DeleteUserPage;
