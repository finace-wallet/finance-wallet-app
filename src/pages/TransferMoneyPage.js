import React from "react";
import Layout from "../components/layout/main/Layout";
import FormGroup from "../components/common/FormGroup";
import Button from "../components/button/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { transferMoney } from "../api/WalletApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Input } from "../components/input";

const schema = yup.object().shape({
//   sourceWalletId: yup.string().required("Please enter source wallet ID"),
  destinationEmail: yup
    .string()
    .email("Please enter a valid email address")
    .required("Please enter destination email"),
//   destinationWalletId: yup
//     .string()
//     .required("Please enter destination wallet ID"),
  amount: yup
    .number()
    .min(0.01, "Amount must be at least 0.01")
    .required("Please enter amount"),
});

const TransferMoneyPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    try {
      const response = await transferMoney(data);
      toast.success("Money transferred successfully");
      console.log("Server response", response.data);
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="mb-4 text-2xl font-bold">Transfer Money</h1>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormGroup>
            <label htmlFor="sourceWalletId">Source Wallet ID *</label>
            <Input
              control={control}
              name="sourceWallet"
              placeholder="Enter Source Wallet ID"
            />
            {errors.sourceWalletId && (
              <p className="text-red-500">{errors.sourceWalletId.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="destinationEmail">Destination Email *</label>
            <Input
              control={control}
              name="destinationEmail"
              placeholder="Enter Destination Email"
            />
            {errors.destinationEmail && (
              <p className="text-red-500">{errors.destinationEmail.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="destinationWalletId">Destination Wallet ID *</label>
            <Input
              control={control}
              name="destinationWallet"
              placeholder="Enter Destination Wallet ID"
            />
            {errors.destinationWalletId && (
              <p className="text-red-500">
                {errors.destinationWalletId.message}
              </p>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="amount">Amount *</label>
            <Input control={control} name="amount" placeholder="Enter amount" />
            {errors.amount && (
              <p className="text-red-500">{errors.amount.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <label htmlFor="description">Description</label>
            <Input
              control={control}
              name="description"
              placeholder="Enter Description"
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </FormGroup>

          <Button
            type="submit"
            className="w-full mt-4 bg-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Transferring..." : "Transfer Money"}
          </Button>
        </form>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default TransferMoneyPage;
