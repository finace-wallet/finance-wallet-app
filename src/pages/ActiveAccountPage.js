import React from "react";
import LayoutAuthentication from "layout/LayoutAuthentication";
import Layout from "layout/main/Layout";
import FormGroup from "components/common/FormGroup";
import * as yup from "yup"; // Import Yup
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { activeAccount } from "api/AuthApi";
import LayoutAuth from "layout/main/LayoutAuth";
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
      <LayoutAuth>
        <LayoutAuthentication heading="Active your account">
          <form onSubmit={handleSubmit(handleForgotPassword)}>
            <FormGroup>
              <Label htmlFor="otp">OTP*</Label>
              <Input
                control={control}
                name="otp"
                placeholder="Input your OTP code sent from email here"
                error={errors.otp?.message}
              ></Input>
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
      </LayoutAuth>
      <ToastContainer />
    </>
  );
};

export default ActiveAccountPage;
