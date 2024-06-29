/* eslint-disable */
import React from "react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Logo = ({ navigateTo }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/${navigateTo}`);
  };
  return (
    <div className="flex items-center">
      <img
        src={logo}
        className="h-[60px] w-[130px] mt-2 ml-2"
        alt="Logo"
        onClick={handleClick}
      />
    </div>
  );
};

export default Logo;
