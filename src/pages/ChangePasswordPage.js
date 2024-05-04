import React, { useState } from "react";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePassword } from "api/AuthApi";
import { toast } from "react-toastify";
import { CloseButton } from "components/button";

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
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showChangePassword, setShowChangePassword] = useState(false);
  const openModal = () => {
    setShowChangePassword(true);
  };

  const closeModal = () => {
    setShowChangePassword(false);
  };

const handleFormSubmit = async (data) => {
  const response = await changePassword(data);
  if (response.success) {
    toast.success("Password changed successfully");
    closeModal();
  } else {
    toast.error("Failed to change password. Please try again.");
  }
};

  return (
    <div className="pt-5">
      <button
        onClick={openModal}
        className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-700"
      >
        Change Password
      </button>

      {showChangePassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-8 bg-white w-96">
            <CloseButton onClick={closeModal} />
            <h2 className="mb-4 text-2xl font-bold">Change Password</h2>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              <FormGroup>
                <Label htmlFor="currentPassword">Current Password *</Label>
                <Input
                  control={control}
                  name="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                  error={errors.currentPassword?.message}
                />
                {/* {errors.currentPassword && (
                  <p className="text-red-500">
                    {errors.currentPassword.message}
                  </p>
                )} */}
              </FormGroup>
              <FormGroup>
                <Label htmlFor="newPassword">New Password *</Label>
                <Input
                  control={control}
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  error={errors.newPassword?.message}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="confirmNewPassword">
                  Confirm New Password *
                </Label>
                <Input
                  control={control}
                  name="confirmNewPassword"
                  type="password"
                  placeholder="Re-enter the new password"
                  error={errors.confirmNewPassword?.message}
                />
                {/* {errors.confirmNewPassword && (
                  <p className="text-red-500">
                    {errors.confirmNewPassword.message}
                  </p>
                )} */}
              </FormGroup>
              <Button
                type="submit"
                className="w-full bg-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePasswordPage;

