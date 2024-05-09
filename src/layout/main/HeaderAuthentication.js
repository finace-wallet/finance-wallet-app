import { ROUTE_HOME } from "constants/routerConstants";
import React from "react";
import { NavLink } from "react-router-dom";

const HeaderAuthentication = () => {
  return (
    <>
      <div class="flex justify-center items-center w-full bg-white">
        <div class="rounded-lg">
          <div class="flex justify-between items-center">
            <NavLink to={ROUTE_HOME}>
              <img class="h-16 w-auto" src="logo.png" alt="Logo" />
            </NavLink>
            <h1 class="text-2xl font-bold text-gray-800">Spendee</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAuthentication;
