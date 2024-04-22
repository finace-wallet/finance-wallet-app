import Layout from "../components/layout/Layout";
import { Label } from "../components/label";
import { Input } from "../components/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../components/button/Button";
import { createWallet } from "../api/WalletApi";
import FormGroup from "../components/common/FormGroup";
const CreateWalletPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await createWallet(data);
      console.log("Wallet created successfully:", response);
      // Điều hướng hoặc hiển thị thông báo thành công tại đây
    } catch (error) {
      console.error("Error creating wallet:", error);
      // Xử lý lỗi tại đây
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create New Wallet</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <Input type="text" id="name" {...register("name", { required: true })} />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="icon">Icon</Label>
            <Input type="text" id="icon" {...register("icon")} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount *</Label>
            <Input type="number" id="amount" {...register("amount", { required: true, min: 0 })} />
            {errors.amount && errors.amount.type === "required" && <p className="text-red-500">Amount is required</p>}
            {errors.amount && errors.amount.type === "min" && <p className="text-red-500">Amount must be greater than or equal to 0</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="currentType">Currency Type</Label>
            <Input type="text" id="currentType" {...register("currentType")} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <Input type="text" id="description" {...register("description", { required: true })} />
            {errors.description && <p className="text-red-500">Description is required</p>}
          </FormGroup>
          <Button type="submit" className="w-full bg-primary">Create Wallet</Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateWalletPage;