import React from "react";
import { Outlet } from "react-router";
import Logo from "../../components/Logo/Logo";
import authImage from "../../assets/authImage.png";
const AuthLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-base-200 navbar-start">
        <Logo></Logo>
      </div>
      <div className="flex justify-between items-center min-h-screen">
        <Outlet></Outlet>
        <div>
          <img src={authImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
