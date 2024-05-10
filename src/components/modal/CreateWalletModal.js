import { yupResolver } from "@hookform/resolvers/yup";
import { createWallet } from "api/WalletApi";
import { Button, CloseButton } from "components/button";
import FormGroup from "components/common/FormGroup";
import { Input } from "components/input";
import { Label } from "components/label";
import { ROUTE_HOME } from "constants/routerConstants";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-modal";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name for the wallet"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .min(0, "Amount must be greater than or equal to 0."),

  description: yup.string().required("Please provide a description"),
});

const CreateWalletModal = ({ isOpen, onClose }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const currencyOptions = [
    { value: "VND", label: "VND" },
    { value: "USD", label: "USD" },
  ];

  const handleCreateWallet = async (data) => {
    try {
      const response = await createWallet(data);
      console.log("Wallet created successfully:", response);
      toast.success("Wallet created successfully:");
      onClose(); // Close the modal
    } catch (error) {
      toast.error("Error creating wallet. Please try again.");
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div className="max-w-lg p-2 mx-auto mt-4 bg-white">
        <CloseButton onClick={onClose}></CloseButton>
        <h1 className="flex justify-center mb-4 text-2xl font-semibold text-center">
          Create New Wallet
        </h1>
        <form onSubmit={handleSubmit(handleCreateWallet)} className="space-y-4">
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="name"
              name="name"
              control={control}
              error={errors.name?.message}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount(Optional)</Label>
            <Input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="amount"
              name="amount"
              control={control}
              error={errors.amount?.message}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="currentType">Currency Type *</Label>
            <Controller
              name="currentType"
              control={control}
              defaultValue={currencyOptions[0].value}
              render={({ field }) => (
                <select
                  {...field}
                  id="currentType"
                  className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
                >
                  {currencyOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description</Label>
            <Input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="description"
              name="description"
              control={control}
              error={errors.description?.message}
            />
          </FormGroup>
          <Button type="submit" className="w-full bg-primary">
            Create Wallet
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateWalletModal;
