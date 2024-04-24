import React from "react";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { useForm } from "react-hook-form";
import { Label } from "../components/label";
import { Input } from "../components/input";
import FormGroup from "../components/common/FormGroup";
import Button from "../components/button/Button";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { changePassword } from "../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Layout from "../components/layout/main/Layout";


const schema = yup.object().shape({
  currentPassword: yup.string().required("Please enter your current password"),
  newPassword: yup
    .string()
    .min(6, "Your password must be at least 6 characters or greater")
    .max(8, "Your password must be less or equal 8 characters")
    .required("Please enter your new password"),
  confirmNewPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your new password"),
});

const ChangePasswordPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    try {
      const response = await changePassword(data);
      toast.success("Password changed successfully");
      console.log("Server response", response.data);
    } catch (error) {
      console.error("Error submitting form: ", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <LayoutAuthentication heading="Change Password">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormGroup>
            <Label htmlFor="currentPassword">Current Password *</Label>
            <Input
              control={control}
              name="currentPassword"
              type="password"
              placeholder="Enter your current password"
            />
            {errors.currentPassword && (
              <p className="text-red-500">{errors.currentPassword.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="newPassword">New Password *</Label>
            <Input
              control={control}
              name="newPassword"
              type="password"
              placeholder="Enter your new password"
            />
            {errors.newPassword && (
              <p className="text-red-500">{errors.newPassword.message}</p>
            )}
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmNewPassword">Confirm New Password *</Label>
            <Input
              control={control}
              name="confirmNewPassword"
              type="password"
              placeholder="Re-enter the new password"
            />
            {errors.confirmNewPassword && (
              <p className="text-red-500">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </FormGroup>

          <Button type="submit" className="w-full bg-primary">
            {isSubmitting ? (
              <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
            ) : (
              "Change Password"
            )}
          </Button>
        </form>
      </LayoutAuthentication>
      <ToastContainer />
    </Layout>
  );
};

export default ChangePasswordPage;
