import React from "react";
import { useSelector } from "react-redux";

const CategoriesPage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleCreateCategory = () => {
    // Code để xử lý việc tạo category ở đây
    console.log("Creating category...");
  };

  return (
    <>
      <div>
        <div className="container px-4 py-8 mx-auto">
          <div className="mt-4">
            <div className="p-4 bg-white rounded-md shadow-md">
              <h2 className="text-lg font-bold">General information</h2>
              <div className="mt-2">
                <div className="flex justify-between">
                  <div className="w-1/3 px-4">
                    <label htmlFor="walletName" className="block text-gray-700">
                      Wallet Name
                    </label>
                    <input
                      type="text"
                      id="walletName"
                      name="walletName"
                      value="Cash Wallet"
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/3 px-4">
                    <label
                      htmlFor="initialBalance"
                      className="block text-gray-700"
                    >
                      Initial Balance
                    </label>
                    <input
                      type="number"
                      id="initialBalance"
                      name="initialBalance"
                      value="1000"
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="w-1/3 px-4">
                    <label
                      htmlFor="walletCurrency"
                      className="block text-gray-700 placeholder:USD"
                    >
                      Wallet currency
                    </label>
                    <select
                      id="walletCurrency"
                      name="walletCurrency"
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="VND">VND</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 mt-3 text-white bg-blue-500 rounded-md">
                  Update settings
                </button>
              </div>
            </div>

            <div className="mt-4">
              <div className="p-4 bg-white rounded-md shadow-md">
                <h2 className="text-lg font-bold">Wallet members</h2>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-700">Lê Long (Owner)</p>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="inviteeEmail"
                      className="block text-gray-700"
                    >
                      Invitee's email address
                    </label>
                    <input
                      type="email"
                      id="inviteeEmail"
                      name="inviteeEmail"
                      placeholder="Enter email address"
                      className="w-full px-2 py-2 mt-1 border border-gray-300 rounded-md"
                    />
                    <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md">
                      Add new member
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-red-500 cursor-pointer">
                    Delete wallet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesPage;
