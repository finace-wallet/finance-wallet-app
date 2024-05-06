import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Layout from "layout/main/Layout";
import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionHistoryModal from "pages/TransactionHistoryPage";

const WalletDetail = () => {
const wallet = useSelector((state) => state.wallet.wallets);
const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }
  return (
    <>
       <div className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md">
                <p className="font-semibold">Name: {wallet.name}</p>
                <div className="flex items-center justify-between mt-2">
                    <FontAwesomeIcon icon="fa-solid fa-wallet" />
                    <p className="text-gray-600">Amount: {wallet.amount}</p>
                </div>
                    <p className="text-gray-600">Currency Type: {wallet.currentType}</p>
                    <div className="flex justify-between">
                      <p className="text-gray-600 self-center">Description: {wallet.description}</p>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={openModal}>Transaction History</button>
                    </div>
                <TransactionHistoryModal isOpen={isModalOpen} onClose={closeModal}/>
            </div>
    </>
  );
};

export default WalletDetail;
