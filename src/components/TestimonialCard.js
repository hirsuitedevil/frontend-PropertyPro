/* eslint-disable */
import React from "react";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ name, role, testimonial, image, rating }) => {
  return (
    <div className="w-3/4 rounded shadow-lg bg-white p-4 block object-cover">
      <img
        className="w-12 h-12 rounded-full mx-auto mb-4"
        src={image}
        alt={name}
      />
      <div className="text-center">
        <p className="text-gray-900 leading-none text-lg font-bold">{name}</p>
        <p className="text-gray-600">{role}</p>
        <div className="flex justify-center mt-2">
          {Array.from({ length: rating }, (_, i) => (
            <FaStar key={i} className="text-yellow-500" />
          ))}
        </div>
        <hr className=" w-[75%] mx-auto mt-4 bg-gray-100 h-1 border-0 rounded dark:bg-gray-700" />
        <p className="mt-4 text-gray-700 text-base">{testimonial}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
