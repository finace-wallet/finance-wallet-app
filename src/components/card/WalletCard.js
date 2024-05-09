import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { setWalletDetails } from "store/wallet/walletSlice";

const WalletCard = ({ wallet }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleWalletSelect = () => {
    dispatch(setWalletDetails(wallet));
    navigate(`/wallet/${wallet.id}`);
  };
  return (
    <>
      <div
        onClick={handleWalletSelect}
        className="bg-white max-w-[350px] shadow-lg rounded-lg p-3 m-5 hover:cursor-pointer hover:bg-softBlue hover:bg-opacity-20"
      >
        <h2>Wallets name: {wallet.name}</h2>
        <div className="flex justify-between">
          <p className="text-primary font-semibold text-lg">
            {wallet.amount} {wallet.currentType}
          </p>
          <p className="text-softBlue font-semibold text-lg">
            {wallet.ownership}
          </p>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
