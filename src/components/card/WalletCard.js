import React from "react";

const WalletCard = ({ wallet }) => {
  return (
    <>
      <div className="bg-white max-w-[250px] shadow-lg rounded-lg p-3 m-3">
        <h2>Wallets name: {wallet.name}</h2>
        <p>
          {wallet.amount} {wallet.currentType}
        </p>
      </div>

     
    </>
  );
};

export default WalletCard;
