import React from "react";
import Layout from "../components/layout/Layout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  return (
    <>
      <Layout></Layout>
      <ToastContainer />
    </>
  );
};

export default HomePage;
