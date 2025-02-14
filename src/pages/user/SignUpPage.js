import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import * as yup from "yup"; // Import Yup
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LayoutAuthentication from "layout/LayoutAuthentication";
import FormGroup from "components/common/FormGroup";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { register } from "api/AuthApi";
import Layout from "layout/main/Layout";
import useToggleValue from "hooks/useToggleValue";
import { IconEyeToggle } from "icons";
import LayoutAuth from "layout/main/LayoutAuth";
import { ROUTE_ACTIVE, ROUTE_LOGIN } from "constants/routerConstants";

const schema = yup.object().shape({
  email: yup.string().email("Email is required").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be 8 characters or less")
    .required("Password is required"),
});

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });
  const navigate = useNavigate();

  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const handleSignUp = async (data) => {
    try {
      const response = await register(data); // Call register function from AuthApi

      toast.success("Success Creating New User");
      reset({});
      setTimeout(() => {
        navigate(ROUTE_ACTIVE);
      }, 1000);
    } catch (error) {
      console.error("Error occurred while signing up:", error);
      // Handle error scenario, e.g., display an error message
    }
  };

  return (
    <>
      <LayoutAuth>
        <LayoutAuthentication heading="Sign Up">
          <p className="mb-6 text-xs font-medium text-center lg:font-normal lg:text-sm text-text3 lg:mb-8">
            Already have an account?{" "}
            <Link
              to={ROUTE_LOGIN}
              className="font-medium underline text-primary"
            >
              Sign in
            </Link>
          </p>
          <button className="flex items-center justify-center w-full py-4 mb-5 text-base font-semibold border gap-x-3 border-strock rounded-xl text-text2">
            <img srcSet="/icon-google.png 2x" alt="icon-google" />
            <span>Sign up with Google</span>
          </button>
          <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2">
            Or sign up with email
          </p>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <FormGroup>
              <Label htmlFor="email">Email *</Label>
              <Input
                control={control}
                name="email"
                placeholder="example@abc.com"
                error={errors.email?.message}
              ></Input>
            </FormGroup>
            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input
                control={control}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="create a password"
                error={errors.password?.message}
              >
                <IconEyeToggle
                  open={showPassword}
                  onClick={handleTogglePassword}
                ></IconEyeToggle>
              </Input>
            </FormGroup>
            {/* <div className="flex items-start p-2 mb-5 gap-x-5">
          <span className="inline-block w-5 h-5 border rounded border-text4"></span>
          <p className="flex-1 text-sm font-normal text-text2">
            I agree to the{" "}
            <span className="underline text-secondary">Terms of Use</span> and
            have read and understand the{" "}
            <span className="underline text-secondary">Privacy policy</span>
          </p>
        </div> */}
            <Button type="submit" className="w-full bg-primary">
              Create my account
            </Button>
          </form>
        </LayoutAuthentication>
      </LayoutAuth>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
