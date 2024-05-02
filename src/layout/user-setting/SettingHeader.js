import React from "react";
import { NavLink } from "react-router-dom";

const menuLinks = [
  {
    url: "/account",
    title: "Account",
  },
  {
    url: "/security",
    title: "Security",
  },
  {
    url: "/data-privacy",
    title: "Data & Privacy",
  },
  {
    url: "/wallet",
    title: "Wallet",
  },
  {
    url: "/notification",
    title: "Notification",
  },

];

const SettingHeader = () => {
  return (
    <>
      <div className="flex gap-5 p-5 align-middle bg-strock">
        <div className="relative flex justify-center w-full gap-5 p-5">
          {menuLinks.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className="p-5 font-semibold text-blue-500 border shadow-md rounded-xl hover:border-darkBlue hover:border-1"
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default SettingHeader;
