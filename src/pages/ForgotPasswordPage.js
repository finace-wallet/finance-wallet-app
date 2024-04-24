import React from "react";
import Layout from "../components/layout/main/Layout";
import { ToastContainer, toast } from "react-toastify";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "../components/common/FormGroup";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import * as yup from "yup"; // Import Yup
import { forgetPassword } from "../api/AuthApi";
import Button from "../components/button/Button";
import { useNavigate } from "react-router";
const ForgotPasswordPage = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Email must be in correct format")
      .required("Email is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const navigate = useNavigate();

  const handleForgotPassword = async (data) => {
    try {
      const response = await forgetPassword(data);
      console.log("Server response: ", response);
      reset({});
      toast.success("Success Sending Email, Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error occured while send email");
    }
  };
  return (
    <>
      <Layout>
        <LayoutAuthentication heading="Forgot Password">
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <FormGroup>
              <Label htmlFor="email">Email*</Label>
              <Input
                control={control}
                name="email"
                placeholder="Input your email here"
              ></Input>
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </FormGroup>
            <Button type="submit" className="w-full bg-primary">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Send me new password"
              )}
            </Button>
          </form>
        </LayoutAuthentication>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default ForgotPasswordPage;
