import Button from "components/button/Button";
import FormGroup from "components/common/FormGroup";
import Layout from "layout/main/Layout";
import Label from "components/label/Label";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTransactionCategory } from "api/TransactionApi";

const CreateTransactionCategoryPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    note: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTransactionCategory(form);
      console.log("Category created successfully:", response);
      navigate("/category-list");
    } catch (error) {
      if (error.name === "ValidateionError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        console.error("Validation errors:", validationErrors);
      } else {
        console.error("Error creating Category:", error);
      }
    }
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto">
        <h1 className="mb-4 text-2xl font-semibold">
          Create Transaction Category
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
            <Label htmlFor="amount">Note *</Label>
            <input
              className="w-full px-6 py-4 text-sm font-medium border border-strock rounded-xl text-text1 placeholder:text-text4"
              type="text"
              id="note"
              value={form.note}
              onChange={handleChange}
            />
          </FormGroup>
          <Button type="submit" className="w-full bg-primary">
            Create Category
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateTransactionCategoryPage;
