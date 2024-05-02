import React, { Fragment } from "react";
import SettingHeader from "./SettingHeader";

const UserSettingLayout = ({ children }) => {
  return (
    <Fragment>
      <SettingHeader></SettingHeader>
      {children}
    </Fragment>
  );
};

export default UserSettingLayout;
