import { DropDownAuth } from "components/dropdown";
import { ROUTE_HOME } from "constants/routerConstants";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const HeaderWallet = () => {
  const [selectedHeader, setSelectedHeader] = useState("Overview");
  const wallet = useSelector((state) => state.wallet.wallets);

  function getHeaderClasses(headerName) {
    return selectedHeader === headerName
      ? "text-primary border-b-2 border-b-primary"
      : "";
  }
  return (
    <>
      <div className="flex text-secondary font-semibold align-middle bg-white justify-between items-center p-4  ">
        <div className="flex align-middle items-center">
          <NavLink to={ROUTE_HOME}>
            <img className="w-full max-h-10" srcSet="/logo.png" alt=""></img>
          </NavLink>
          <span className="font-semibold text-xl">&gt;{wallet.name}</span>
        </div>

        <div className="flex gap-5">
          <span
            className={getHeaderClasses("Overview")}
            onClick={() => setSelectedHeader("Overview")}
          >
            Overview
          </span>
          <span
            className={getHeaderClasses("Transaction")}
            onClick={() => setSelectedHeader("Transaction")}
          >
            Transaction
          </span>
          <span
            className={getHeaderClasses("Wallet Settings")}
            onClick={() => setSelectedHeader("Wallet Settings")}
          >
            Wallet Settings
          </span>
        </div>
        <div>
          <DropDownAuth></DropDownAuth>
        </div>
      </div>
    </>
  );
};

export default HeaderWallet;
