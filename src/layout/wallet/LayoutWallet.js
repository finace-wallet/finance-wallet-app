import React, { Fragment } from "react";
import HeaderWallet from "./HeaderWallet";

const LayoutWallet = ({ children }) => {
  return (
    <Fragment>
      <HeaderWallet></HeaderWallet>
      {children}
    </Fragment>
  );
};

export default LayoutWallet;
