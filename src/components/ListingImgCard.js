/* eslint-disable */
import React from "react";

const ListingImgCard = ({ src }) => {
  return (
    <div className="">
      <img src={`${process.env.REACT_APP_BACKEND_URL}/images/${src}`} alt="Listing" />
    </div>
  );
};

export default ListingImgCard;
