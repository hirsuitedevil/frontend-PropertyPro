/* eslint-disable */
import React from "react";

const ListingImgCard = ({ src }) => {
  return (
    <div className="">
      <img src={`http://localhost:5000/images/${src}`} alt="Listing" />
    </div>
  );
};

export default ListingImgCard;
