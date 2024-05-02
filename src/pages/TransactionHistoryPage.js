import React, { useEffect, useRef } from 'react';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions, selectIsLoading, selectError, selectPagination, fetchTransaction } from 'store/transactionSlice';
import { clearTransactions } from 'store/transactionSlice';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

Modal.setAppElement('#root');

const TransactionHistoryModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectError);
    const pagination = useSelector(selectPagination);
    const transactions = useSelector(selectTransactions);
    const modalRef = useRef(null);

    const handleClose = () => {
        dispatch(clearTransactions());
        onClose();
    };
    
    const handlePageChange = (pageNumber) => {
        dispatch(fetchTransaction({ page: pageNumber }));
    };
    const handleExportToExcel = () => {
        exportToExcel(transactions);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', (event) => {
            if(event.key === 'Escape') {
                handleClose();
            }
        });

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', (event) => {
                if(event.key === 'Escape') {
                    handleClose();
                }
            });
        };
    }, []);
    const exportToExcel = (data) => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Transaction History');
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const excelBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(excelBlob, 'transaction_history.xlsx');
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={handleClose} shouldCloseOnEsc={true} shouldCloseOnOverlayClick={true} ref={modalRef}>
          <div className='flex justify-between align-middle content-center'>
            <h2>Lịch sử giao dịch</h2>
            <button onClick={handleExportToExcel} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">export</button>
          </div>
        
          <table className='w-full mx-auto'>
            <thead>
              <tr>
                <th>STT</th>
                <th>Người gửi</th>
                <th>Người nhận</th>
                <th>Ngày giao dịch</th>
                <th>Số tiền</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction, index) => (
                <tr key={transaction.id}>
                  <td>{index + 1}</td>
                  <td>{transaction.sender}</td>
                  <td>{transaction.recipient}</td>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.transactionAmount}</td>
                  <td>{transaction.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {pagination && (
            <div>
              {pagination.page > 0 && (
                <button onClick={() => handlePageChange(pagination.page - 1)}>Trang trước</button>
              )}
              <span>Trang {pagination.page + 1} / {pagination.totalPages}</span>
              {pagination.page < pagination.totalPages - 1 && (
                <button onClick={() => handlePageChange(pagination.page + 1)}>Trang tiếp</button>
              )}
            </div>
          )}
          {error && <div>{error}</div>}
          {isLoading && <div>Loading...</div>}
          <button onClick={handleClose}>Đóng</button>
        </Modal>
    );
};

export default TransactionHistoryModal;