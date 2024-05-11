/* eslint-disable */ 
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
const Layoutalt = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex mb-auto h-100">
        <Sidebar className="w-1/6" />
        <main className="w-5/6"> {children} </main>
      </div>
    </div>
  );
};

export default Layoutalt;
