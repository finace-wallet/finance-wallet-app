import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout, user1 } from "../../../store/auth/authSlice";
import { toast } from "react-toastify";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/register",
    title: "Register",
  },
];

const Header = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector(user1);
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());
    toast.success("You have logged out");
  };
  return (
    <>
      <div className="flex gap-5 p-5 text-white align-middle bg-softBlue">
        <NavLink to="/">
          <img className="w-full h-[75px]" srcSet="/logo.png" alt=""></img>
        </NavLink>
        <div className="flex p-5 gap-5 w-full max-w-[680px] relative">
          {menuLinks.map((item, index) => (
            <NavLink key={index} to={item.url}>
              {item.title}
            </NavLink>
          ))}
          {user && user.id ? (
            <NavLink to="/account" className="cursor-pointer hover:underline">
              Hello, {user.id}
            </NavLink>
          ) : (
            ""
          )}
          {isLoggedIn ? (
            <span onClick={handleLogout} className="cursor-pointer">
              Log Out
            </span>
          ) : (
            <NavLink to="/login">Log In</NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
