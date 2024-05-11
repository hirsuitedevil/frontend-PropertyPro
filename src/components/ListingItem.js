/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { IoMdBed } from "react-icons/io";
import { FaBath } from "react-icons/fa6";
import { HiOutlineArrowsExpand } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { MdEditSquare } from "react-icons/md";

const ListingItem = ({ listing, id, onDelete, onEdit }) => {
  return (
    <div className="p-2">
      <div className="bg-white hover:shadow-lg transition-shadow rounded-2xl w-full border-[1.5px]">
        <Link to={`/category/${listing.type}/${id}`}>
          <div className="row container">
            <img
              src={`http://localhost:5000/images/${listing.img[0]}`}
              height={200}
              width={300}
              className="h-[320px] sm:h-[220px] w-full object-cover p-2 rounded-2xl hover:scale-105 transition-scale duration-300"
              alt="img"
            />
            <div className="col-md-5">
              <h4 className="font-semibold m-2">{listing.title}</h4>
              <div className="flex gap-1 items-center p-1 ml-2">
                <FaLocationDot className="w-4 h-4 text-slate-500" />
                <p className="text-slate-500">
                  {listing.city}, {listing.country}
                </p>
              </div>
              <hr className="w-[90%] bg-slate-600 border-1 mt-2 mx-auto" />
              <div className="flex gap-2 items-center p-2 py-4">
                <div className="flex gap-2 items-center">
                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <IoMdBed className="h-5 w-5" />
                    {listing.bedrooms}
                  </p>
                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <FaBath className="h-4 w-4" />
                    {listing.bathrooms}
                  </p>
                  <p className="flex gap-1 items-center font-semibold text-sm">
                    <HiOutlineArrowsExpand className="h-4 w-4" />
                    {listing.area} ft²
                  </p>
                </div>
                <div className="flex ml-10">
                  <p className="flex gap items-center font-bold text-lg text-green-500">
                    Rs{" "}
                    {listing.offer
                      ? listing.discountedPrice
                      : listing.regularPrice}{" "}
                    <span className="text-xs">
                      {listing.type === "Rent" && " /Month"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex justify-between">
          {onDelete && (
            <button
              className="bg-red-500 m-2 p-2 rounded-lg font-semibold flex items-center gap-1"
              onClick={() => {
                onDelete(id);
              }}
            >
              <MdDelete className="" />
              Delete Listing
            </button>
          )}
          {onEdit && (
            <button
              className="bg-[#b2e3b2] m-2 p-2 rounded-lg font-semibold flex items-center gap-1"
              onClick={() => {
                onEdit(id);
              }}
            >
              <MdEditSquare /> Edit Listing
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingItem;
