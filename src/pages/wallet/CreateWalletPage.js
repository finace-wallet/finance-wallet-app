
import Button from "../../components/button/Button";
import { createWallet } from "../../components/wallet/WalletApi";
import FormGroup from "../../components/common/FormGroup";
// import Layout from "../../components/layout/main/Layout";
import Layout from "layout/main/Layout";
import { Label } from "../../components/label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


const schema = yup.object().shape({
  name: yup.string().required("Please enter a name for the wallet"),
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .required("Please enter the amount"),
  currentType: yup.string(),
  description: yup.string().required("Please provide a description"),
});

const CreateWalletPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    amount: "",
    currentType: "",
    description: ""
  }) 

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, {abortEarly: false});
      const response = await createWallet(form);
      console.log("Wallet created successfully:", response);
      navigate("/wallet");
    } catch (error) {
      if (error.name === "ValidateionError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        console.error("Validation errors:",validationErrors);
      } else {
        console.error("Error creating wallet:",error);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="mb-4 text-2xl font-semibold">Create New Wallet</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text" id="name" value={form.name} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount *</Label>
            <input className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
            type="number" id="amount" value={form.amount} onChange={handleChange} />
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