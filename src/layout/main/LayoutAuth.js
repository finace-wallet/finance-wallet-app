import React, { Fragment } from "react";
import HeaderAuthentication from "./HeaderAuthentication";

const LayoutAuth = ({ children }) => {
  return (
    <Fragment>
      <HeaderAuthentication></HeaderAuthentication>
      {children}
    </Fragment>
  );
};

export default LayoutAuth;
