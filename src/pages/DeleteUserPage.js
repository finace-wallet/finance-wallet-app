import { deleteUser } from "api/AuthApi";
import { Button } from "components/button";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TransactionHistoryModal from "./TransactionHistoryPage";
import { useDispatch } from "react-redux";

const DeleteUserPage = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showTransactionHistory, setShowTransactionHistory] = useState(false);
  const dispatch = useDispatch();

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteUser();
      toast.success("The user has been successfully deleted!");
      setIsDeleting(false);
      setTimeout(() => {
        setShowConfirmation(false);
      }, 100);
    } catch (error) {
      console.error("Error deleting user: ", error);
      toast.error("An error occurred while deleting the user.");
      setIsDeleting(false);
    }
  };

  const handleShowTransactionHistory = () => {
    setShowTransactionHistory(true);
  };

  return (
    <>
      <div className="pt-5">
        <button
          type="button"
          onClick={() => setShowConfirmation(true)}
          className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
        >
          Delete account
        </button>
        <button
          type="button"
          onClick={handleShowTransactionHistory}
          className="ml-4 px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          View Transaction History
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="relative p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete this account?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 mr-4 font-bold text-white bg-gray-400 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Agree"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showTransactionHistory && (
        <TransactionHistoryModal
          isOpen={showTransactionHistory}
          onClose={() => setShowTransactionHistory(false)}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default DeleteUserPage;
