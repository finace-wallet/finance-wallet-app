import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { displayWalletDetail } from "api/WalletApi";
import Layout from "layout/main/Layout";
import WalletAddMoney from "module/WalletAddMoney";
import WalletShare from "module/WalletShare";
import WalletTransfer from "module/WalletTransfer";
import WalletTransferEmail from "module/WalletTransferEmail";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionHistoryModal from "pages/TransactionHistoryPage";

const WalletDetail = () => {
  // <<<<<<< HEAD
  const wallet = useSelector((state) => state.wallet.wallets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Call API to fetch wallet data (assuming an API call function)
      await displayWalletDetail(wallet.id);
      setIsDataFetched(true);
    };
    if (!isDataFetched) {
      fetchData();
    }
  }, [wallet]);

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      {/* <<<<<<< HEAD */}
      <Layout>
        <div className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">Name: {wallet.name}</p>
          <div className="flex items-center mt-2">
            <FontAwesomeIcon icon="fa-solid fa-wallet" />
            <p className="text-gray-600">Amount: {wallet.amount}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">Currency Type: {wallet.currentType}</p>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">Description: {wallet.description}</p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full max-w-[250px] self-end"
                onClick={openModal}
              >
                Transaction History
              </button>
            </div>
          </div>
          <TransactionHistoryModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
        <div>
          <WalletAddMoney></WalletAddMoney>
          <WalletShare></WalletShare>
          <WalletTransferEmail></WalletTransferEmail>
        </div>
      </Layout>
      {/* =======
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
>>>>>>> 4ec26febc4f99b97de5e74c11859c8cd0ed9620f */}
    </>
  );
};

export default WalletDetail;
