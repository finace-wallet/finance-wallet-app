import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { displayWalletDetail } from "api/WalletApi";
import Layout from "layout/main/Layout";
import WalletAddMoney from "module/WalletAddMoney";
import WalletShare from "module/WalletShare";
import WalletTransfer from "module/WalletTransfer";
import WalletTransferEmail from "module/WalletTransferEmail";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const WalletDetail = () => {
  const wallet = useSelector((state) => state.wallet.wallets);
  const [isDataFetched, setIsDataFetched] = useState(false);

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

  return (
    <>
      <Layout>
        <div className="w-full p-4 mb-4 transition duration-300 ease-in-out delay-150 border border-gray-200 rounded-md shadow-md">
          <p className="font-semibold">Name: {wallet.name}</p>
          <div className="flex items-center mt-2">
            <FontAwesomeIcon icon="fa-solid fa-wallet" />
            <p className="text-gray-600">Amount: {wallet.amount}</p>
          </div>
          <div className="flex flex-col">
            <p className="text-gray-600">Currency Type: {wallet.currentType}</p>
            <p className="text-gray-600">Description: {wallet.description}</p>
          </div>
        </div>
        <div>
          <WalletAddMoney></WalletAddMoney>
          <WalletShare></WalletShare>
          <WalletTransferEmail></WalletTransferEmail>
        </div>
      </Layout>
    </>
  );
};

export default WalletDetail;
