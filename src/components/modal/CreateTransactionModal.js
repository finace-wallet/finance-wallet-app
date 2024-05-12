import { createTransaction } from "api/TransactionApi";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import * as yup from "yup";

const CreateTransactionModal = ({ isOpen, onClose }) => {
  const [categoryType, setCategoryType] = useState("INCOME");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const reduxCategory = useSelector(
    (state) => state.wallet.wallets.transactionCategory
  );
  const wallet = useSelector((state) => state.wallet.wallets);

  const filteredCategories = reduxCategory.filter(
    (category) => category.type === categoryType
  );
  // Map filtered categories to options for React Select
  const categoryOptions = filteredCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const validationSchema = yup.object().shape({
    // ... your other validations
    transactionCategoryId: yup.mixed().required(),
    transactionDate: yup.string().required(),
    amount: yup.number().when("categoryType", {
      is: (categoryType) => categoryType.value === "EXPENSE", // Check against object
      then: (schema) =>
        schema
          .transform((currentValue, originalValue) =>
            originalValue === "" ? null : currentValue
          )
          .nullable()
          .required("Amount is required")
          .min(-wallet.amount, "Expense cannot exceed wallet balance")
          .typeError("Amount must be a number"),
      otherwise: (schema) =>
        schema.nullable().typeError("Amount must be a number"),
    }),
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      transactionDate: new Date().toISOString().split("T")[0], // Set current date as default
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    data.transactionCategoryId = data.transactionCategoryId.value;
    delete data.categoryType;

    try {
      const response = await createTransaction(data, wallet.id);
      if (response.status === 201) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // Function to handle category type change
  const handleCategoryTypeChange = (selectedOption) => {
    setCategoryType(selectedOption.value);
    setValue("transactionCategoryId", null);
    setValue("amount", null);
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
          height: "360px", // Adjust height as needed
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
          <div className="flex flex-col w-full">
            <label>Type(*)</label>
            <Controller
              name="categoryType"
              control={control}
              defaultValue={{ value: "INCOME", label: "INCOME" }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={[
                    { value: "INCOME", label: "INCOME" },
                    { value: "EXPENSE", label: "EXPENSE" },
                  ]}
                  onChange={(selectedOption) => {
                    field.onChange(selectedOption); // Trigger onChange manually
                    handleCategoryTypeChange(selectedOption); // Also update local state
                  }}
                />
              )}
            />
            <span></span>
          </div>
          <div className="flex flex-col w-full">
            <label>Select Category(*)</label>
            <Controller
              name="transactionCategoryId"
              control={control}
              render={({ field }) => (
                <Select {...field} options={categoryOptions} />
              )}
            />
            {errors.transactionCategoryId && (
              <span className="text-red-500">
                {errors.transactionCategoryId.message}
              </span>
            )}
          </div>
          <div className="flex flex-col w-full">
            <label>Date</label>
            <Controller
              name="transactionDate"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className="w-full p-2 border rounded"
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full">
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
                  className="w-full p-2 border rounded"
                />
              )}
            />
            {errors.description && (
              <span className="text-red-500">{errors.description.message}</span>
            )}
          </div>
          {/* <div className="flex flex-col w-full">
            <label>Amount</label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  placeholder={`${categoryType === "EXPENSE" ? "-" : ""}$0.00`}
                  className="w-full p-2 border rounded"
                />
              )}
            />
          </div> */}

          <div className="flex flex-col w-full">
            <label>Amount</label>
            <Controller
              name="amount"
              control={control}
              defaultValue=""
              render={({ field }) => {
                const { onChange, value, ...rest } = field;
                return (
                  <>
                    <input
                      {...rest}
                      type="number"
                      value={
                        categoryType === "EXPENSE" && value >= 0
                          ? -Math.abs(value)
                          : value
                      }
                      onChange={(e) => {
                        const newValue =
                          categoryType === "EXPENSE"
                            ? -Math.abs(e.target.value)
                            : e.target.value;
                        onChange(newValue);
                      }}
                      placeholder="$0.00"
                      className="w-full p-2 border rounded"
                    />
                  </>
                );
              }}
            />
            {errors.amount && (
              <span className="text-red-500">{errors.amount.message}</span>
            )}
          </div>

          <div className="flex flex-col w-full">
            <label>Currency</label>
            <Controller
              name="currency"
              control={control}
              defaultValue="VND"
              render={({ field }) => (
                <select {...field} className="w-full p-2 border rounded">
                  {/* Currency options */}
                  <option value="VND">VND</option>
                  <option value="USD">USD</option>
                </select>
              )}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            className="p-2 mt-5 font-semibold text-white rounded-lg bg-primary"
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
