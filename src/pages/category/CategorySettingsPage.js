import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

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
      <div className="w-full">
        <div className="container px-4 py-8 mx-auto">
          <div className="mt-4">
            <div className="p-4 bg-white rounded-md shadow-md w-full">
              <h2 className="text-lg font-bold">Category Income</h2>
              <div className="mt-2">
                {transactionCategoryIncome.map((category) => (
                  <div key={category.id}>{category.name}</div>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <div className="p-4 bg-white rounded-md shadow-md w-full">
                <h2 className="text-lg font-bold">Category Expense</h2>
                <div className="mt-2">
                  {transactionCategoryExpense.map((category) => (
                    <div key={category.id}>{category.name}</div>
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
