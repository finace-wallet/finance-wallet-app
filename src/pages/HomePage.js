import React from "react";
import Layout from "../layout/main/Layout";
import { ToastContainer } from "react-toastify";
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
