import React from "react";
import Layout from "../layout/main/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import WalletListModule from "module/WalletList";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <>
      <Layout>
        {isLoggedIn ? (
          <>
            <WalletListModule></WalletListModule>
          </>
        ) : (
          <div className="flex flex-col justify-center p-5">
            <span className="mx-auto p-5">
              You must login to see the function{" "}
            </span>
            <button className="rounded-lg border max-w-[200px] justify-center mx-auto p-2 bg-primary text-white">
              <NavLink to="/login">Log In</NavLink>
            </button>
          </div>
        )}
      </Layout>

      <ToastContainer />
    </>
  );
};

export default HomePage;
