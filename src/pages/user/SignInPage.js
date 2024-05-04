import React from "react";
import LayoutAuthentication from "layout/LayoutAuthentication";
import Layout from "layout/main/Layout";
import FormGroup from "components/common/FormGroup";
import * as yup from "yup"; // Import Yup
import { yupResolver } from "@hookform/resolvers/yup"; // Import yupResolver
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { setTokenAction } from "store/auth/authActions";
import { NavLink } from "react-router-dom";
import { login } from "api/AuthApi";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import "react-toastify/dist/ReactToastify.css";
import useToggleValue from "hooks/useToggleValue";
import { IconEyeToggle } from "icons";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be in correct format")
    .required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(8, "Password must be 8 characters or less")
    .required("Password is required"),
});

const SignInPage = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { value: showPassword, handleToggleValue: handleTogglePassword } =
    useToggleValue();

  const handleSignIn = async (data, event) => {
    try {
      event.preventDefault();
      const response = await login(data); // Call register function from AuthApi     
      
      console.log(response); // Log the response for debugging
      // Handle success scenario, e.g., redirect to another pag
      dispatch(setTokenAction(response.data.data.accessToken));
      reset({});
      toast.success("Success Login, Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error occurred while signing up:", error);
      toast.error("Error occurred while signing up");
      // Handle error scenario, e.g., display an error message
    }
  };

  return (
    <>
      <Layout>
        <LayoutAuthentication heading="Sign In">
          <form onSubmit={handleSubmit(handleSignIn)}>
            <FormGroup>
              <Label htmlFor="email">Email*</Label>
              <Input
                control={control}
                name="email"
                placeholder="Input your email here"
                error={errors.email?.message}
              ></Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="password">Password *</Label>
              <Input
                control={control}
                name="password"
                type={`${showPassword ? "text" : "password"}`}
                placeholder="Input your password"
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
            <div className="text-right">
              <NavLink
                to="/forgot-password"
                className="inline-block mb-5 text-blue-500 underline gap-y-3"
              >
                Forgot password? Click here
              </NavLink>
            </div>
            <Button type="submit" className="w-full bg-primary">
              {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </LayoutAuthentication>
      </Layout>
      <ToastContainer />
    </>
  );
};

export default SignInPage;
