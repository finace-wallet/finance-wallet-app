import React, { Fragment } from "react";
import HeaderWallet from "./HeaderWallet";

const LayoutWallet = ({ children }) => {
  return (
    <Fragment>
      <HeaderWallet />
      <div className="container mx-auto">{children}</div>
    </Fragment>
  );
};

export default LayoutWallet;
