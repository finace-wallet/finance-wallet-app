import React from "react";
import { NavLink } from "react-router-dom";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/register",
    title: "Register",
  },
  {
    url: "/login",
    title: "Log In",
  },
];

const Header = () => {
  return (
    <>
      <div className="p-5 flex gap-5 bg-gray-200 align-middle">
        <NavLink to="/">
          <img className="w-full h-[75px]" srcSet="/logo.png" alt=""></img>
        </NavLink>
        <div className="flex p-5 gap-5 w-full max-w-[320px] relative">
          {menuLinks.map((item) => (
            <NavLink to={item.url}>{item.title}</NavLink>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
