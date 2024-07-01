/* eslint-disable */
import React, { useState } from "react";

const StarRating = ({ rating, setRating }) => {
  const handleRating = (rate) => {
    setRating(rate);
  };

  return (
    <div className="star-rating flex justify-center">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "text-yellow-500" : "text-gray-300"}
            onClick={() => handleRating(index)}
          >
            <span className="text-4xl">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
