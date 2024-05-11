/* eslint-disable */
import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  return (
    <form
      className="bg-[#F2F0F4] p-1 rounded-lg flex"
      style={{ height: "60px", width: "500px" }}
    >
      <FaSearch
        className="text-slate-600 mr-5 ml-2"
        style={{ height: "100%" }}
      />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-full"
      />
    </form>
  );
};

export default SearchBox;
