import { addMoneyToWallet, displayWalletDetail } from "api/WalletApi";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setWalletDetails } from "store/wallet/walletSlice";

const WalletAddMoney = () => {
  const [addAmount, setAddAmount] = useState(0);
  const wallet = useSelector((state) => state.wallet.wallets);
  const dispatch = useDispatch();

  const selectedWalletId = wallet.id;

  const handleAddMoney = async () => {
    if (addAmount <= 0) {
      alert("Please enter a valid amount (greater than 0).");
      return;
    }
    try {
      const response = await addMoneyToWallet(selectedWalletId, addAmount);
      if (response.data.status === "OK") {
        alert("Money added successfully!");
        setAddAmount(0);
        const newResponse = await displayWalletDetail(selectedWalletId);
        // dispatch(setWalletDetails(newResponse.data));
      } else {
        alert("Error adding money: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding money to wallet:", error);
      alert("Error adding money. Please try again later.");
    }
  };
  return (
    <div>
      <div className="flex flex-col justify-center text-center p-4 max-w-[200px] mx-auto gap-2">
        <label htmlFor="addAmount">Add Money:</label>
        <input
          type="number"
          id="addAmount"
          value={addAmount}
          className="items-center justify-center min-w-[200px]"
          onChange={(e) => setAddAmount(e.target.value)}
        />

        <button
          className="flex items-center justify-center text-base bg-blue-500 hover:bg-blue-700 font-semibold rounded-xl text-white min-h-[56px] min-w-[200px]"
          onClick={handleAddMoney}
        >
          Add money
        </button>
      </div>
    </div>
  );
};

export default WalletAddMoney;
