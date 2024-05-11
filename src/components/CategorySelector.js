/* eslint-disable */
import React from "react";

const CategorySelector = ({ activeCategory, setActiveCategory }) => {
  const categories = ["All", "Rent", "Sale", "Offer"];

  return (
    <div className="flex gap-2 ml-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 text-sm font-medium ${
            activeCategory === category
              ? "bg-white text-green-500 border-2 border-green-500 rounded-t-md shadow-lg z-20"
              : "text-gray-700 border-b-2 border-gray-300"
          }`}
          onClick={() => setActiveCategory(category)}
          style={{ marginTop: "-1px" }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
