import React from "react";
import Layout from "../components/layout/Layout";

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

const HomePage = () => {
  return (
    <>
      {/* <div className="p-5 flex gap-5 bg-gray-200">
        <NavLink to="/">
          <img className="w-full h-[75px]" srcSet="/logo.png" alt=""></img>
        </NavLink>
        <div className="flex p-5 gap-5 w-full max-w-[320px] mx-auto relative align-middle">
          {menuLinks.map((item) => (
            <NavLink to={item.url}>{item.title}</NavLink>
          ))}
        </div>
      </div> */}
      <Layout></Layout>
    </>
  );
};

export default HomePage;
