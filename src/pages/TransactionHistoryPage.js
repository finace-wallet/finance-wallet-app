import React, { useRef, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectTransactions,
  selectIsLoading,
  selectError,
  selectPagination,
  fetchTransaction,
} from "store/transactionSlice";
import moment from "moment";
import { Pagination } from "react-paginate";
import { clearTransactions } from "store/transactionSlice";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const TransactionHistoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const pagination = useSelector(selectPagination);
  const transactions = useSelector(selectTransactions);
  const walletId = useSelector((state) => state.wallet.wallets.id);

  const modalRef = useRef(null);

  const handleClose = () => {
    dispatch(clearTransactions());
    onClose();
  };

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchTransaction({ walletId, page: 0 }));
    }
  }, [isOpen, walletId]);

  const handlePageChange = (pageNumber) => {
    dispatch(fetchTransaction({ walletId, page: pageNumber }));
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
      sender: item.transaction.sender,
      recipient: item.transaction.recipient,
      transactionDate: item.transaction.transactionDate,
      transactionAmount: item.transaction.transactionAmount,
      description: item.transaction.description,
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

  return (
    <Modal
      isOpen={isOpen}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
      onRequestClose={handleClose}
      ref={modalRef}
    >
      <div className="flex justify-between align-middle content-center">\
        <div></div>
        <p className="mr-52 font-bold text-3xl">Transaction History</p>
        <button
          onClick={handleExportToExcel}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          export
        </button>
      </div>

      <table className="w-3/4 mx-auto border">
        <thead className="bg-green-600">
          <tr>
            <th className="border">#</th>
            <th className="border">Sender</th>
            <th className="border">Recipient</th>
            <th className="border">Date</th>
            <th className="border">Amount</th>
            <th className="border">Description</th>
          </tr>
        </thead>
        <tbody className="border text-center">
          {Array.isArray(transactions) && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr className={index % 2 === 0 ? 'bg-indigo-200' : 'bg-white'} key={transaction.id}>
                <td className="border ">{index + 1}</td>
                <td className="border ">
                  {transaction.transaction.sender}
                </td>
                <td className="border ">
                  {transaction.transaction.recipient}
                </td>
                <td className="border max-w-[100px] ">
                  {moment(transaction.transaction.transactionDate).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </td>
                <td className="border">
                  {transaction.transaction.transactionAmount}
                </td>
                <td className="border">
                  {transaction.transaction.description}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
      {pagination && pagination.total > 1 && (
        <div className=" flex justify-center mt-10 mx-auto">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
              pagination.page === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            onClick={() => {
              if (pagination.page > 0) {
                handlePageChange(pagination.page - 1);
              }
            }}
          >
            Previous
          </button>

          <span className="mt-2 ml-2 mr-2">
            Trang {pagination.page + 1} / {pagination.total}
          </span>

          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ${
              pagination.page === pagination.total - 1
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() => {
              if (pagination.page < pagination.total - 1) {
                handlePageChange(pagination.page + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      )}
      {error && <div>{error}</div>}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        onClick={handleClose}
      >
        {isLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Close"}
      </button>
    </Modal>
  );
};

export default TransactionHistoryModal;
