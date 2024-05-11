/* eslint-disable */
import React from "react";

const PageHeader = ({ title, subtitle }) => {
  return (
    <div className="p-4">
      <h3 className="text-3xl font-medium">{title}</h3>
      <p className="text-gray-500 py-2">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
