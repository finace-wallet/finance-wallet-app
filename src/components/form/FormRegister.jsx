import React from "react";
import InputRegister from "../input/InputRegister";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../../api/AuthApi";

const FormRegister = () => {
  return (
    <>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={yup.object({
          username: yup.string().required("Please enter your username"),
          password: yup
            .string()
            .min(6, "Your password must be at least 6 characters or greater")
            .max(8, "Your password must be less or equal 8 characters")

            .required("Please enter your password"),
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          register(values)
            .then((response) => {
              setTimeout(() => {
                toast.success("User register success");
              }, 5000);

              console.log("Server response", response.data);
              setSubmitting(false);
              resetForm();
            })
            .catch((error) => {
              console.error("Error submitting form: ", error);
              toast.error("Something is wrong");
              setSubmitting(false);
            });
        }}
      >
        {(formik) => {
          return (
            <>
              <form
                onSubmit={formik.handleSubmit}
                className="max-w-[300px] mx-auto my-10"
                autoComplete="off"
              >
                <InputRegister
                  name="username"
                  id="username"
                  type="text"
                  label="Username"
                  placeholder="Enter your username"
                ></InputRegister>
                <InputRegister
                  name="password"
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                ></InputRegister>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full p-5 mt-5 font-semibold text-white bg-black rounded-lg"
                >
                  {formik.isSubmitting ? (
                    <div className="w-5 h-5 mx-auto border-2 border-t-2 border-white rounded-full border-t-transparent animate-spin"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default FormRegister;
