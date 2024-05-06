import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "layout/main/Layout";
import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteApi } from "api/wallet/DeleteApi";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router";

import { toast } from "react-toastify";
const WalletDetail = () => {
  const wallet = useSelector((state) => state.wallet.wallets);
  const navigate = useNavigate()
  const handleDelete = () => {
    confirmAlert({
      title: "Xác nhận xóa",
      message: "Bạn có chắc chắn muốn xóa?",
      buttons: [
        {
          label: "Xóa",
          onClick: () => {
            deleteApi(wallet.id)
            .then(() => {
              toast.success("Delete Successfully")
            });
            navigate('/wallet')
          },
        },
        {
          label: "Hủy",
          onClick: () => {},
        },
      ],
    });
  };
  const handleUpdate = () => {
    navigate(`/update-wallet/${wallet.id}`)
  }
  return (
    <>
      <div className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md">
        <p className="font-semibold">Name: {wallet.name}</p>
        <div className="flex items-center justify-between mt-2">
          <FontAwesomeIcon icon="fa-solid fa-wallet" />
          <p className="text-gray-600">Amount: {wallet.amount}</p>
        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-gray-600">Currency Type: {wallet.currentType}</p>
          <p className="text-gray-600">Description: {wallet.description}</p>
        </div>
      </div>
      <div class="flex justify-end space-x-2">
        <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded" onClick={() => {handleDelete()}}>
          Delete
        </button>
        <button class="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded" onClick={() => {
          handleUpdate()
        }}>
          Update
        </button>
      </div>
    </>
  );
};

export default WalletDetail;
