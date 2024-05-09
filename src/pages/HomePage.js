import React, { useEffect } from "react";
import Layout from "../layout/main/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import WalletListModule from "module/WalletList";
import { ROUTE_LOGIN } from "constants/routerConstants";
import WalletListGeneral from "module/WalletListGeneral";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate(ROUTE_LOGIN);
    }
  }, [isLoggedIn, navigate]);
  return (
    <>
      {isLoggedIn ? (
        <Layout>
          <>
            <WalletListGeneral></WalletListGeneral>
          </>
        </Layout>
      ) : (
        <></>
      )}
      <ToastContainer />
    </>
  );
};

export default HomePage;
