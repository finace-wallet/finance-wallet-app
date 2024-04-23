import React, { useState } from "react";
import Layout from "../components/layout/main/Layout";
import Button from "../components/button/Button";
import { deleteUser } from "../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteUserPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUser();
      toast.success("Người dùng đã được xóa thành công!");
      setIsDeleting(false);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 100);
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("Đã xảy ra lỗi khi xóa người dùng.");
      setIsDeleting(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center h-screen">
        <Button
          onClick={() => setShowConfirmation(true)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Xóa Tài Khoản
        </Button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-gray-500 bg-opacity-75 absolute inset-0"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg relative border border-gray-300">
            <p className="mb-4">
              Bạn có chắc chắn muốn xóa tài Khoản này không?
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
