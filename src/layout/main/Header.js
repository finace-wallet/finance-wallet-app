import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DropDownAuth from "components/dropdown/DropDownAuth";
import { ROUTE_HOME } from "constants/routerConstants";

const Header = () => {
  const [selectedHeader, setSelectedHeader] = useState();

  function getHeaderClasses(headerName) {
    return selectedHeader === headerName
      ? "text-primary border-b-2 border-b-primary"
      : "";
  }
  return (
    <>
      <div className="flex text-secondary font-semibold align-middle bg-white justify-between items-center p-4  ">
        <NavLink to={ROUTE_HOME}>
          <img className="w-full max-h-10" srcSet="/logo.png" alt=""></img>
        </NavLink>
        <div className="flex gap-5">
          <span
            className={getHeaderClasses("Dashboard")}
            onClick={() => setSelectedHeader("Dashboard")}
          >
            Dashboard
          </span>
          <span
            className={getHeaderClasses("Budget")}
            onClick={() => setSelectedHeader("Budget")}
          >
            Budget
          </span>
        </div>
        <div>
          <DropDownAuth></DropDownAuth>
        </div>
      </div>
    </>
  );
};

export default Header;
