import { DropDownAuth } from "components/dropdown";
import {
  ROUTE_HOME,
  ROUTE_WALLET_SETTING,
  ROUTE_WALLET_TRANSACTION,
} from "constants/routerConstants";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setHeader } from "store/header/headerSlice";


const HeaderWallet = () => {
  const [selectedHeader, setSelectedHeader] = useState("");
  const wallet = useSelector((state) => state.wallet.wallets);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const reduxSelectedHeader = useSelector(
    (state) => state.header.selectedHeader
  );

  useEffect(() => {
    setSelectedHeader(reduxSelectedHeader);
  }, [reduxSelectedHeader]);

  function getHeaderClasses(headerName) {
    return selectedHeader === headerName
      ? "text-primary border-b-2 border-b-primary"
      : "";
  }

  const handleWalletSelect = () => {
    setSelectedHeader("Overview");
    dispatch(setHeader("Overview"));
    navigate(`/wallet/${wallet.id}`);
  };

  const handleWalletTransactionSelect = () => {
    setSelectedHeader("Transaction");
    dispatch(setHeader("Transaction"));
    navigate(ROUTE_WALLET_TRANSACTION);
  };

  const handleWalletSettingSelect = () => {
    setSelectedHeader("Wallet Settings");
    dispatch(setHeader("Wallet Settings"));
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
