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
import { activeAccount } from "../api/AuthApi";
import Button from "../components/button/Button";
import { useNavigate } from "react-router";
const ActiveAccountPage = () => {
  const schema = yup.object().shape({
    otp: yup.string().required("OTP is required"),
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
      const response = await activeAccount(data);
      console.log("Server response: ", response);
      reset({});
      toast.success("Success Activating, Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error occured while active email");
    }
  };
  return (
    <>
      <Layout>
        <LayoutAuthentication heading="Active your account">
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <FormGroup>
              <Label htmlFor="otp">OTP*</Label>
              <Input
                control={control}
                name="otp"
                placeholder="Input your OTP code sent from email here"
              ></Input>
              {errors.otp && (
                <p className="text-red-500">{errors.otp.message}</p>
              )}
            </FormGroup>
            <Button type="submit" className="w-full bg-primary">
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Confirm"
              )}
            </Button>
          </form>
        </LayoutAuthentication>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default ActiveAccountPage;
