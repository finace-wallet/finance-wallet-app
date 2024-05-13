import { getAllTransaction } from "api/TransactionApi";
import { displayWalletDetail } from "api/WalletApi";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setWalletHeader } from "store/header/headerSlice";
import { setAllTransaction } from "store/transaction/transactionOverviewSlice";
import { setWalletDetails } from "store/wallet/walletSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";

const WalletCard = ({ wallet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWalletSelect = async () => {
    try {
      const response = await displayWalletDetail(wallet.id);
      dispatch(setWalletDetails(response.data.data));
      dispatch(setWalletHeader("Overview"));

      const transactionResponse = await getAllTransaction(wallet.id);
      dispatch(setAllTransaction(transactionResponse.data.data.content));
      navigate(`/wallet/${wallet.id}`);
    } catch {}
  };
  return (
    <>
      <div
        onClick={handleWalletSelect}
        className="bg-white max-w-[350px] shadow-lg rounded-lg p-3 m-5 hover:cursor-pointer hover:bg-softBlue hover:bg-opacity-20"
      >
       <span><FontAwesomeIcon icon={faWallet} style={{ color: '#99704A', fontSize: '24px' }} /></span>
        <h2>{wallet.name}</h2>
        <div className="flex justify-between">
          <p className="text-lg font-semibold text-primary">
            {wallet.amount} {wallet.currentType}
          </p>
          <p className="text-lg font-semibold text-softBlue">
            {wallet.ownership}
          </p>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
