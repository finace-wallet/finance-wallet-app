import CreateTransactionModal from "components/modal/CreateTransactionModal";
import LayoutWallet from "layout/wallet/LayoutWallet";
import React, { useState } from "react";

const WalletSettings = () => {
  const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
    useState(false);
  return (
    <>
      <LayoutWallet>
        <>
          <div className="flex mx-10 mt-5">
            <button
              className="text-white bg-primary p-2 m-2 rounded-lg font-semibold"
              onClick={() => setIsCreateTransactionModalOpen(true)}
            >
              Add transaction
            </button>
          </div>
          <CreateTransactionModal
            isOpen={isCreateTransactionModalOpen}
            onClose={() => setIsCreateTransactionModalOpen(false)}
          />
        </>
      </LayoutWallet>
    </>
  );
};

export default WalletSettings;
