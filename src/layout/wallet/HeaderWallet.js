import { DropDownAuth } from "components/dropdown";
import {
  ROUTE_HOME,
  ROUTE_WALLET_DETAIL_ID,
  ROUTE_WALLET_SETTING,
  ROUTE_WALLET_TRANSACTION,
} from "constants/routerConstants";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { WALLET_API } from "util/AppConstant";

const HeaderWallet = () => {
  const [selectedHeader, setSelectedHeader] = useState("Overview");
  const wallet = useSelector((state) => state.wallet.wallets);
  const navigate = useNavigate();

  function getHeaderClasses(headerName) {
    return selectedHeader === headerName
      ? "text-primary border-b-2 border-b-primary"
      : "";
  }

  const handleWalletSelect = () => {
    setSelectedHeader("Overview");
    navigate(`/wallet/${wallet.id}`);
  };

  const handleWalletTransactionSelect = () => {
    setSelectedHeader("Transaction");
    navigate(ROUTE_WALLET_TRANSACTION);
  };

  const handleWalletSettingSelect = () => {
    setSelectedHeader("Wallet Settings");
    navigate(ROUTE_WALLET_SETTING);
  };

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
            onClick={handleWalletSelect}
          >
            Overview
          </span>
          <span
            className={getHeaderClasses("Transaction")}
            onClick={handleWalletTransactionSelect}
          >
            Transaction
          </span>
          <span
            className={getHeaderClasses("Wallet Settings")}
            onClick={handleWalletSettingSelect}
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
