import { getAllTransaction } from "api/TransactionApi";
import CreateTransactionModal from "components/modal/CreateTransactionModal";
import LayoutWallet from "layout/wallet/LayoutWallet";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const WalletOverview = () => {
  const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
    useState(false);
  const [isFecthData, setIsFetchData] = useState(false);
  const [transactions, setTransactions] = useState([]);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const allTransactions = useSelector(
    (state) => state.transactionOverview.allTransactions
  );

  const wallet = useSelector((state) => state.wallet.wallets);

  const [incomeData, setIncomeData] = useState({
    series: [],
    options: {
      chart: { type: "donut" },
      labels: [],
      dataLabels: { enabled: false },
      legend: { show: false },
    },
  });
  const [expenseData, setExpenseData] = useState({
    series: [],
    options: {
      chart: { type: "donut" },
      labels: [],
      dataLabels: { enabled: false },
      legend: { show: false },
    },
  });

  useEffect(() => {
    if (!isFecthData) fetchData();
  }, [transactions, isFecthData]);

  const fetchData = async () => {
    const response = await getAllTransaction(wallet.id);
    setTransactions(response.data.data.content);
    setIsFetchData(true);
  };

  useEffect(() => {
    if (allTransactions && allTransactions.length > 0) {
      const incomeTransactions = allTransactions.filter(
        (transaction) => transaction.type === "INCOME"
      );
      const expenseTransactions = allTransactions.filter(
        (transaction) => transaction.type === "EXPENSE"
      );

      const groupTransactionsByCategory = (transactions) => {
        return transactions.reduce((acc, transaction) => {
          if (!acc[transaction.categoryName]) {
            acc[transaction.categoryName] = 0;
          }
          acc[transaction.categoryName] += Math.abs(transaction.amount);
          return acc;
        }, {});
      };

      const incomeGrouped = groupTransactionsByCategory(incomeTransactions);
      const expenseGrouped = groupTransactionsByCategory(expenseTransactions);

      console.log("🚀 ~ useEffect ~ expenseGrouped:", expenseGrouped);

      setIncomeData({
        series: Object.values(incomeGrouped),
        options: {
          ...incomeData.options,
          labels: Object.keys(incomeGrouped),
          colors: Object.keys(incomeGrouped).map(() => getRandomColor()),
        },
      });
      setExpenseData({
        series: Object.values(expenseGrouped), // Use the actual values, no need for Math.abs
        options: {
          ...expenseData.options,
          labels: Object.keys(expenseGrouped),
          colors: Object.keys(expenseGrouped).map(() => getRandomColor()),
        },
      });
    }
  }, [allTransactions]);

  const [from, setFrom] = useState(new Date(2024, 4, 1)); // Note: Months are 0-indexed
  const [to, setTo] = useState(new Date(2024, 4, 31));

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
          <div className="flex mx-10 mt-5 gap-x-5">
            <div className="w-full bg-white p-5 rounded-lg shadow-md min-h-[350px] text-center">
              <span className="font-semibold">Income</span>
              <Chart
                options={incomeData.options}
                series={incomeData.series}
                type="donut"
              />
            </div>
            <div className="w-full bg-white p-5 rounded-lg shadow-md min-h-[350px] text-center">
              <span className="font-semibold">Expense</span>
              <Chart
                options={expenseData.options}
                series={expenseData.series}
                type="donut"
              />
            </div>
          </div>
        </>
      </LayoutWallet>
    </>
  );
};

export default WalletOverview;
