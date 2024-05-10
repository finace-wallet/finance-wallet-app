import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import {  setLogout } from "../store/auth/authSlice";
import { deleteUser } from "api/AuthApi";

const DeleteUserPage = ({ isOpen, onClose }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const confirmDelete = async () => {
    try {
      setIsDeleting(true);
      setTimeout(() => {
        toast.success("The user has been successfully deleted!");
      }, 150);
      await deleteUser();
      dispatch(setLogout());
      nav("/");
      onClose();
    } catch (error) {
      toast.error("An error occurred while deleting the user.");
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75"></div>
          <div className="relative p-8 bg-white border border-gray-300 rounded-lg shadow-lg">
            <p className="mb-4">
              Are you sure you want to delete this account?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => onClose()}
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
      <ToastContainer />
    </>
  );
};

export default DeleteUserPage;
