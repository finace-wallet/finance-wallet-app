import { createTransaction } from "api/TransactionApi";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { log } from "react-modal/lib/helpers/ariaAppHider";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const CreateTransactionModal = ({ isOpen, onClose }) => {
  const reduxCategory = useSelector(
    (state) => state.wallet.wallets.transactionCategory
  );



  const wallet = useSelector((state) => state.wallet.wallets);

  const { handleSubmit, control } = useForm();

  const onSubmit = async (data) => {

    try {
      const response = await createTransaction(data, wallet.id);
      if (response.status === 201) {
        toast.success(response.data.message);
      }

    } catch (error) {}
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
        content: {
          position: "absolute",
          top: "150px",
          left: "50px",
          right: "40px",
          bottom: "40px",
          height: "161px", // Adjust height as needed
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "8px",
          outline: "none",
          padding: "15px",
        },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-x-2">
          <div className="w-full flex flex-col">
            <label>Category</label>
            <Controller
              name="transactionCategoryId"
              control={control}
              defaultValue={reduxCategory[0].id}
              render={({ field }) => (
                <select
                  {...field}
                  id="transactionCategoryId"
                  className="border p-2 rounded w-full"
                >
                  {reduxCategory.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>
          <div className="w-full flex flex-col">
            <label>Date</label>
            <Controller
              name="transactionDate"
              control={control}
              defaultValue="2023-01-01"
              render={({ field }) => (
                <input
                  {...field}
                  type="transactionDate"
                  className="border p-2 rounded w-full"
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col">
            <label>Note (optional)</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  placeholder="Write note (optional)"
                  className="border p-2 rounded w-full"
                />
              )}
            />
          </div>
          <div className="w-full flex flex-col">
            <label>Amount</label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder="$0.00"
                  className="border p-2 rounded w-full"
                />
              )}
            />
          </div>

          <div className="w-full flex flex-col">
            <label>Currency</label>
            <Controller
              name="currency"
              control={control}
              defaultValue="USD"
              render={({ field }) => (
                <select {...field} className="border p-2 rounded w-full">
                  {/* Currency options */}
                  <option value="USD">USD</option>
                  <option value="VND">VND</option>
                </select>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-primary p-2 text-white rounded-lg mt-5 font-semibold"
            type="submit"
          >
            Add Transaction
          </button>
        </div>
      </form>
      <ToastContainer></ToastContainer>
    </Modal>
  );
};

export default CreateTransactionModal;
