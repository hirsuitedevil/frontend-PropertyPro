/* eslint-disable */
import React from "react";
import { Link, useLocation } from "react-router-dom";
const DropdownItem = ({ icon: Icon, name, link, onClick }) => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path.link;
  };
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the passed-in onClick function
    } else {
      console.log("Hello World");
    }
  };
  return (
    <li
      className={`flex items-center gap-2 text-gray-700 p-1 rounded font-semibold transition ${
        name == "Logout" ? "cursor-pointer" : ""
      } ${
        isActive({ link })
          ? "bg-[#b2e3b2] text-[#296f29]"
          : "text-gray-700 hover:bg-gray-200"
      }`}
      onClick={handleClick}
    >
      <Link to={`${link}`} className="flex items-center gap-2 rounded-md">
        <Icon className="w-4 h-4 text-gray-700" />
        <span>{name}</span>
      </Link>
    </li>
  );
};

export default DropdownItem;
