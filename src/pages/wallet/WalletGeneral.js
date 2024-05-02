import { addMoneyToWallet, displayWallet } from "api/WalletApi";
import Pagination from "components/pagination/Pagination";
import LayoutTwoColumn from "layout/LayoutTwoColumn";
import Layout from "layout/main/Layout";
import UserSettingLayout from "layout/user-setting/UserSettingLayout";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import {
  setWalletAmount,
  setWalletDetails,
  setWalletId,
} from "store/wallet/walletSlice";

const WalletDetail = () => {
  const [wallets, setWallets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedWalletId, setSelectedWalletId] = useState(null); // Track selected wallet ID
  const [addAmount, setAddAmount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchWallets(currentPage);
  }, [currentPage]);

  const fetchWallets = async (page) => {
    try {
      const response = await displayWallet(page);
      console.log("This response", response);
      setWallets(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching wallets:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleWalletSelect = (walletId) => {
    setSelectedWalletId(walletId); // Update selected wallet ID
    dispatch(setWalletId(walletId));
    setAddAmount(0);
    const selectedWallet = wallets.find((wallet) => wallet.id === walletId);
    console.log("🚀 ~ handleWalletSelect ~ selectedWallet:", selectedWallet);
    const walletAmount = selectedWallet?.amount;
    const walletName = selectedWallet?.name;
    const walletCurrencyType = selectedWallet?.currentType;
    const walletDescription = selectedWallet?.description;

    if (walletAmount !== undefined) {
      // Dispatch action to update walletAmount in Redux store only if amount exists
      dispatch(setWalletAmount(walletAmount));
      dispatch(
        setWalletDetails({
          walletId: walletId,
          walletName: walletName,
          walletAmount: walletAmount,
          walletCurrentType: walletCurrencyType,
          walletDescription: walletDescription,
        })
      );
    } else {
      console.warn("Wallet amount not found for selected wallet:", walletId);
    }

    setAddAmount(0); // Reset add amount when selecting a new wallet
    console.log("You're selecting walletId", walletId);
  };

  const handleAddMoney = async () => {
    if (!selectedWalletId) {
      alert("Please select a wallet to add money to.");
      return;
    }

    if (addAmount <= 0) {
      alert("Please enter a valid amount (greater than 0).");
      return;
    }

    try {
      const response = await addMoneyToWallet(selectedWalletId, addAmount);

      if (response.data.status === "OK") {
        alert("Money added successfully!");
        setSelectedWalletId(null);
        setAddAmount(0);
        fetchWallets(currentPage); // Refetch wallets to reflect changes
      } else {
        alert("Error adding money: " + response.data.message);
      }
    } catch (error) {
      console.error("Error adding money to wallet:", error);
      alert("Error adding money. Please try again later.");
    }
  };

  const handleWalletDetails = () => {
    navigate("/wallet-detail");
  };

  return (
    <>
      <Layout>
        <UserSettingLayout>
          <LayoutTwoColumn>
            {{
              left: (
                <>
                  <p>This is the content for left panel</p>
                  <div className="min-h-[500px]">
                    <h2>Wallets</h2>
                    {wallets.length > 0 ? (
                      <ul className="p-0 ">
                        {wallets.map((wallet) => (
                          <li
                            key={wallet.id}
                            className={`cursor-pointer hover:bg-blue-50 p-2 border border-blue-500 rounded-full mb-3 ${
                              selectedWalletId === wallet.id
                                ? "bg-blue-100" // Apply blue background for selected wallet
                                : ""
                            }`}
                            onClick={() => handleWalletSelect(wallet.id)} // Handle wallet selection
                          >
                            <input
                              type="radio"
                              id={wallet.id}
                              name="wallet"
                              value={wallet.id}
                              checked={selectedWalletId === wallet.id} // Set radio button checked state
                              onChange={() => handleWalletSelect(wallet.id)} // Handle radio button change
                              className="hidden"
                            />
                            <label htmlFor={wallet.id}>
                              {wallet.name} - {wallet.amount}{" "}
                              {wallet.currentType}
                            </label>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>
                        No wallets created yet. Create a new wallet to get
                        started!
                      </p>
                    )}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              ),
              right:
                // Conditionally display wallet details on the right side
                selectedWalletId && ( // Only show if a wallet is selected
                  <>
                    <div className="min-h-[250px]">
                      <p className="mb-2">
                        <div className="text-xl font-bold text-primary">
                          You are selecting:
                        </div>
                        <div className="flex items-center justify-center p-5 text-xl font-semibold text-center text-softDark">
                          {wallets.find((w) => w.id === selectedWalletId)?.name}
                        </div>
                        <div className="flex items-center justify-center mt-5 text-5xl font-semibold text-softBlue">
                          {
                            wallets.find((w) => w.id === selectedWalletId)
                              ?.amount
                          }{" "}
                          {
                            wallets.find((w) => w.id === selectedWalletId)
                              ?.currentType
                          }
                        </div>
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="addAmount">Add Money:</label>
                      <input
                        type="number"
                        id="addAmount"
                        value={addAmount}
                        onChange={(e) => setAddAmount(e.target.value)}
                      />
                      <button
                        className="flex items-center justify-center p-4 text-base bg-primary font-semibold rounded-xl text-white min-h-[56px]"
                        onClick={handleAddMoney}
                      >
                        Add money
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 pt-5">
                      <button
                        className="flex items-center justify-center p-4 text-base bg-primary font-semibold rounded-xl text-white min-h-[56px]"
                        onClick={handleWalletDetails}
                      >
                        {" "}
                        See wallet details
                      </button>
                    </div>
                    <div className="flex flex-col gap-2 pt-5">
                      <button className="flex items-center justify-center p-4 text-base bg-primary font-semibold rounded-xl text-white min-h-[56px]">
                        {" "}
                        Archive this wallet
                      </button>
                    </div>
                  </>
                ),
            }}
          </LayoutTwoColumn>
        </UserSettingLayout>
      </Layout>
    </>
  );
};

export default WalletDetail;
