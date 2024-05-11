/* eslint-disable */
import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { CiFilter } from "react-icons/ci";
import { MdOutlineSort } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const FilterBar = ({ onLocationChange, onFilterChange, onSortChange }) => {
  return (
    <div className="p-4 flex gap-4">
      <button
        className="flex items-center gap-2 text-gray-700 p-1 rounded-md font-semibold border-2 w-32 h-10"
        onClick={onLocationChange}
      >
        <FaLocationDot className="w-4 h-4 text-green-500" />
        Location <IoIosArrowDown />
      </button>
      <button
        className="flex items-center gap-2 text-gray-700 p-1 rounded-md font-semibold border-2 w-20 h-10"
        onClick={onFilterChange}
      >
        <CiFilter className="w-4 h-4 text-gray-700" />
        Filter
      </button>
      <button
        className="flex items-center gap-2 text-gray-700 p-1 rounded-md font-semibold border-2 w-20 h-10"
        onClick={onSortChange}
      >
        <MdOutlineSort className="w-4 h-4 text-gray-700" />
        Sort
      </button>
    </div>
  );
};

export default FilterBar;
