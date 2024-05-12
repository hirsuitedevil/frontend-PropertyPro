/* eslint-disable */
import React from "react";

const ListingImgCard = ({ src }) => {
  return (
    <div className="">
      <img src={`${REACT_APP_BACKEND_URL}/images/${src}`} alt="Listing" />
    </div>
  );
};

export default ListingImgCard;
