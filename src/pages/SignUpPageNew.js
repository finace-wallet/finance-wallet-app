import React from "react";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Label } from "../components/label";
import { Input } from "../components/input";

import LayoutAuthentication from "../layout/LayoutAuthentication";
import FormGroup from "../components/common/FormGroup";
import Button from "../components/button/Button";
import Layout from "../components/layout/Layout";

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
  } = useForm({});
  const handleSignUp = (values) => {
    console.log("🚀 ~ SignUpPage ~ values:", values);
  };

  return (
    <Layout>
      <LayoutAuthentication heading="SignUp">
        <p className="mb-6 text-xs font-normal font-medium text-center lg:text-sm text-text3 lg:mb-8">
          Already have an account?{" "}
          <Link to="/sign-in" className="font-medium underline text-primary">
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
            <Label htmlFor="name">Full Name *</Label>
            <Input
              control={control}
              name="name"
              placeholder="Input your full name here"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email *</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="example@gmail.com"
            ></Input>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password *</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="create a password"
            ></Input>
          </FormGroup>
          <div className="flex items-start p-2 mb-5 gap-x-5">
            <span className="inline-block w-5 h-5 border rounded border-text4"></span>
            <p className="flex-1 text-sm font-normal text-text2">
              I agree to the{" "}
              <span className="underline text-secondary">Terms of Use</span> and
              have read and understand the{" "}
              <span className="underline text-secondary">Privacy policy</span>
            </p>
          </div>
          <Button type="submit" className="w-full bg-primary">
            Create my account
          </Button>
        </form>
      </LayoutAuthentication>
    </Layout>
  );
};

export default SignUpPage;
