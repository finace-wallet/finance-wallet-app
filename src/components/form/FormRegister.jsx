import React from "react";
import InputRegister from "../input/InputRegister";
import { Formik, Form, useField } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

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
            .min(6, "Your password must be at least 3 characters or greater")
            .max(8, "Your password must be less or equal 8 characters")
            // .matches(
            //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            //   {
            //     message:
            //       "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
            //   }
            // )
            .required("Please enter your password"),
          // gender: yup
          //   .string()
          //   .required("Please select your gender")
          //   .oneOf(["male", "female"], "You can only select male or female"),
          // job: yup
          //   .string()
          //   .required("Please select your job")
          //   .oneOf(["teacher", "developer", "doctor", "constructor"]),
          // term: yup
          //   .boolean()
          //   .oneOf([true], "Please check the term and conditions"),
        })}
        //   onSubmit={(values, { setSubmitting, resetForm }) => {
        //     setTimeout(() => {
        //       console.log(JSON.stringify(values, null, 2));
        //       setSubmitting(false);
        //       resetForm();
        //     }, 5000);
        //   }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          axios
            .post("http://localhost:8080/api/v1/register", values)
            .then((response) => {
              setTimeout(() => {
                toast.success("User register success");
              }, 5000);

              console.log("Server response:", response.data);
              setSubmitting(false);
              resetForm();
            })
            .catch((error) => {
              console.error("Error submitting form:", error);
              toast.error("Something is wrong");
              setSubmitting(false);
            });
        }}
      >
        {(formik) => {
          return (
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
          );
        }}
      </Formik>
    </>
  );
};

export default FormRegister;
