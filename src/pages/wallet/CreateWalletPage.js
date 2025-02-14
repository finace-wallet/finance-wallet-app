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
    .required("Please enter the amount")
    .min(0, "Amount must be greater than or equal to 0."),
  currentType: yup.string().required("Please provide the currency type"),
  description: yup.string().required("Please provide a description"),
});

const CreateWalletPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    amount: "",
    currentType: "",
    description: "",
  });

  const [amountError, setAmountError] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "amount" && parseFloat(value) < 0) {
      setAmountError("Amount must be greater than or equal to 0.");
      return;
    } else {
      setAmountError("");
    }
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(form, { abortEarly: false });
      const response = await createWallet(form);

      navigate("/wallet");
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setFormError("" + error);
        console.error("Validation errors:", validationErrors);
      } else {
        setFormError("Error creating wallet: " + error.message);
        console.error("Error creating wallet:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-lg p-2 mx-auto mt-4 bg-white rounded-lg shadow-lg">
        <h1 className="flex justify-center mb-4 text-2xl font-semibold text-center">
          Create New Wallet
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormGroup>
            <Label htmlFor="name">Name *</Label>
            <input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="amount">Amount *</Label>
            <input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="number"
              id="amount"
              value={form.amount}
              onChange={handleChange}
            />
            {amountError && (
              <span className="text-sm text-red-500">{amountError}</span>
            )}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="currentType">Currency Type</Label>
            <input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="currentType"
              value={form.currentType}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="description">Description *</Label>
            <input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="description"
              value={form.description}
              onChange={handleChange}
            />
          </FormGroup>
          {formError && <p className="text-red-500">{formError}</p>}
          <Button type="submit" className="w-full bg-primary">
            Create Wallet
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateWalletPage;
