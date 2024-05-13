import { getAllTransaction } from "api/TransactionApi";
import CreateTransactionModal from "components/modal/CreateTransactionModal";
import LayoutWallet from "layout/wallet/LayoutWallet";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";

import Slider from "rc-slider"; // You'll need to install rc-slider
import "rc-slider/assets/index.css";

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
        series: Object.values(expenseGrouped),
        options: {
          ...expenseData.options,
          labels: Object.keys(expenseGrouped),
          colors: Object.keys(expenseGrouped).map(() => getRandomColor()),
        },
      });
    }
  }, [allTransactions]);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const [amountRange, setAmountRange] = useState([-1000, 1000]);
  return (
    <>
      <LayoutWallet>
        <>
          <div className="mx-32">
            <div className="flex mx-10 mt-5 items-center justify-between">
              <button
                className="text-white bg-primary p-2 m-2 rounded-lg font-semibold"
                onClick={() => setIsCreateTransactionModalOpen(true)}
              >
                Add transaction
              </button>

              <div className="flex items-center">
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                  showSelectionPreview={true}
                />
              </div>
            </div>

            <div className="bg-white p-4 mt-5 mx-10 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">Filters</h2>
                <button className="text-blue-500 hover:underline">
                  Reset filters
                </button>
              </div>

              <div className="flex gap-x-2">
                {/* Category Dropdown */}
                <div className="flex flex-col w-full">
                  <label className="text-sm text-gray-500">Type(*)</label>
                  <select
                    name="category"
                    id="category"
                    className="p-2 border rounded text-gray-500"
                  >
                    <option value="all" selected>
                      All category
                    </option>
                  </select>
                </div>

                {/* People Dropdown */}
                <div className="flex flex-col w-full">
                  <label className="text-sm text-gray-500">People(*)</label>
                  <select
                    name="people"
                    id="people"
                    className="p-2 border rounded text-gray-500"
                  >
                    <option value="all" selected>
                      By people
                    </option>
                  </select>
                </div>

                <div className="flex flex-col w-full">
                  <label className="text-sm text-gray-500">By note</label>
                  <input
                    type="text"
                    placeholder="Filter by specific keyword"
                    className="p-2 border rounded"
                  />
                </div>

                {/* Amount Range Slider */}
                <div className="flex flex-col w-full">
                  <label className="text-sm text-gray-500">By amount</label>
                  <Slider
                    range
                    min={-1000}
                    max={1000}
                    value={amountRange}
                    trackStyle={{ backgroundColor: "#D5D8DC" }}
                    handleStyle={[
                      { backgroundColor: "white", borderColor: "#3273DC" },
                      { backgroundColor: "white", borderColor: "#3273DC" },
                    ]}
                  />
                  <div className="flex justify-between mt-2 text-gray-500">
                    <span>{-1000}</span>
                    <span>{1000}</span>
                  </div>
                </div>
              </div>
            </div>

            <CreateTransactionModal
              isOpen={isCreateTransactionModalOpen}
              onClose={() => setIsCreateTransactionModalOpen(false)}
            />
            <div className="flex mx-10 mt-5 gap-x-5">
              <div className="w-full bg-white p-5 rounded-lg shadow-md min-h-[250px] text-center">
                <span className="font-semibold">Income</span>
                <Chart
                  options={incomeData.options}
                  series={incomeData.series}
                  type="donut"
                />
              </div>
              <div className="w-full bg-white p-5 rounded-lg shadow-md min-h-[250px] text-center">
                <span className="font-semibold">Expense</span>
                <Chart
                  options={expenseData.options}
                  series={expenseData.series}
                  type="donut"
                />
              </div>
            </div>
          </div>
        </>
      </LayoutWallet>
    </>
  );
};

export default WalletOverview;
