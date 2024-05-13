import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
const CategorySettingsPage = () => {
  const transactionCategory = useSelector(
    (state) => state.wallet.wallets.transactionCategory
  );

  console.log(
    "🚀 ~ CategorySettingsPage ~ transactionCategory:",
    transactionCategory
  );

  const transactionCategoryIncome = transactionCategory.filter(
    (category) => category.type === "INCOME"
  );

  const transactionCategoryExpense = transactionCategory.filter(
    (category) => category.type === "EXPENSE"
  );

  return (
    <>
      <div className="w-[960px]">
        <div className="min-w-full px-4 py-8">
          <div className="mt-4">
            <div className="p-4 bg-white rounded-md shadow-md w-full">
              <h2 className="text-lg font-bold">Category Income</h2>
              <div className="mt-2">
                {transactionCategoryIncome.map((category, index) => (
                  <div
                    key={category.id}
                    className={`flex justify-between items-center p-2 ${
                      index % 2 === 0 ? "bg-gray-100" : "" // Conditional background
                    }`}
                  >
                    <span>{category.name}</span>
                    <div>
                      <button>
                        <PencilSquareIcon className="h-5 w-5 text-blue-500" />{" "}
                      </button>
                      <button>
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="p-4 bg-white rounded-md shadow-md w-full min-w-full">
                <h2 className="text-lg font-bold">Category Expense</h2>
                <div className="mt-2">
                  {transactionCategoryExpense.map((category, index) => (
                    <div
                      key={category.id}
                      className={`flex justify-between items-center p-2 ${
                        index % 2 === 0 ? "bg-gray-100" : "" // Conditional background
                      }`}
                    >
                      <span>{category.name}</span>
                      <div>
                        <button>
                          <PencilSquareIcon className="h-5 w-5 text-blue-500" />{" "}
                        </button>
                        <button>
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default CategorySettingsPage;
