import { listWallet } from "api/WalletApi";
import WalletCarousel from "components/carousel/WalletCarousel";
import CreateWalletModal from "components/modal/CreateWalletModal";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { createRoot } from "react-modal";

const WalletListGeneral = () => {
  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);
  const [wallets, setWallets] = useState([]);

  console.log("🚀 ~ WalletListGeneral ~ wallets:", wallets);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrenPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchWallets();
  }, [currentPage]);

  const fetchWallets = async () => {
    try {
      const response = await listWallet(currentPage);
      setWallets(response.data.data.content);
      setTotalPages(response.data.data.totalPages || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  return (
    <>
      {wallets.length > 0 ? (
        <div>
          <div class="container mx-auto px-4 py-16">
            <div class="items-center">
              <h1 class="text-3xl font-bold text-gray-900">My Wallets</h1>
              <WalletCarousel wallets={wallets} />
              <button
                onClick={() => setIsCreateWalletModalOpen(true)}
                className="px-6 py-2.5 mt-5 text-primary font-semibold rounded-lg text-sm shadow-md bg-white hover:bg-primary hover:bg-opacity-20"
              >
                Create Wallet
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div class="container mx-auto px-4 py-16">
            <div class="items-center">
              <h1 class="text-3xl font-bold text-gray-900">My Wallets</h1>
              <p>You don't have any wallets yet.</p>
              <button
                onClick={() => setIsCreateWalletModalOpen(true)}
                className="px-6 py-2.5 mt-5 text-primary font-semibold rounded-lg text-sm shadow-md"
              >
                Create Wallet
              </button>
            </div>
          </div>
        </>
      )}
      <CreateWalletModal
        isOpen={isCreateWalletModalOpen}
        onClose={() => setIsCreateWalletModalOpen(false)}
      />
    </>
  );
};

export default WalletListGeneral;
