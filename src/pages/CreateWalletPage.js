
import Button from "../components/button/Button";
import { createWallet } from "../api/WalletApi";
import FormGroup from "../components/common/FormGroup";
import Layout from "../components/layout/main/Layout";
import { Label } from "../components/label";
import React, { useState } from "react";
const CreateWalletPage = () => {
  const [form, setForm] = useState({
    name: "",
    icon: "",
    amount: "",
    currentType: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createWallet(form);
      console.log("Wallet created successfully:", response);
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Create New Wallet</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text" id="name" value={form?.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="icon">Icon</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text" id="icon" value={form?.icon} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount *</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
            type="number" id="amount" value={form?.amount} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="currentType">Currency Type</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
            type="text" id="currentType" value={form.currentType} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
            type="text" id="description" value={form.description} onChange={handleChange} />
          </FormGroup>
          <Button type="submit" className="w-full bg-primary">Create Wallet</Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateWalletPage;