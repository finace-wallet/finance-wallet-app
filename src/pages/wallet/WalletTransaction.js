import { getTransactionList } from "api/TransactionApi";
import CreateTransactionModal from "components/modal/CreateTransactionModal";
import LayoutWallet from "layout/wallet/LayoutWallet";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const WalletTransaction = () => {
  const [isCreateTransactionModalOpen, setIsCreateTransactionModalOpen] =
    useState(false);

  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const wallet = useSelector((state) => state.wallet.wallets);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  useEffect(() => {}, [totalPages]);

  const fetchData = async () => {

    const response = await getTransactionList(wallet.id, currentPage);

    setTransactions(response.data.data.content);
    setTotalPages(response.data.data.totalPages || 0);

    console.log("Data transaction: ", response.data.data.content);
  };

  const handleExportToExcel = () => {
    exportToExcel(transactions);
  };

  const exportToExcel = (data) => {
    if (!data || data.length === 0) {
      console.error("Data is not available or empty");
      return;
    }
    const transactionsData = data.map((item) => ({
      Category: item.categoryName,
      Date: item.transactionDate,
      Note: item.description,
      Amount: item.amount,
      Currency: item.currency,
    }));

    const ws = XLSX.utils.json_to_sheet(transactionsData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Transaction History");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(excelBlob, "transaction_history.xlsx");
  };


  const handleNextPage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <LayoutWallet>
        <>
          <div className="flex mx-10 mt-5 justify- ml-0">
            <button
              className="text-white bg-primary p-2 m-2 rounded-lg font-semibold"
              onClick={() => setIsCreateTransactionModalOpen(true)}
            >
              Add transaction
            </button>

            <button
              className="text-white bg-sky-600 p-2 m-2 rounded-lg font-semibold"
              onClick={handleExportToExcel}
            >
              export
            </button>
          </div>
          <CreateTransactionModal
            isOpen={isCreateTransactionModalOpen}
            onClose={() => setIsCreateTransactionModalOpen(false)}
          />
          <div>
            <table className="w-full border-2 m-2">
              <thead>
                <tr className="border-2 bg-white">
                  <th>Category</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Amount</th>
                  <th>Currency</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="text-center border-2">
                    <td>{transaction.categoryName}</td>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.description}</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <ReactPaginate
              previousLabel={"<"}
              nextLabel={">"}
              breakLabel={"..."}
              breakClassName={"px-3 py-1"}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handleNextPage}
              containerClassName={"flex items-center justify-center my-5 "}
              pageClassName={"mx-1 px-3 py-1 border rounded-md"}
              activeClassName={"bg-blue-500 text-white"}
              previousClassName={"mx-1 px-3 py-1 border rounded-md"}
              nextClassName={"mx-1 px-3 py-1 border rounded-md"}
            />
          </div>
        </>
      </LayoutWallet>
    </>
  );
};

export default WalletTransaction;
