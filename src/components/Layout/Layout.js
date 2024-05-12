/* eslint-disable */
import React from "react";
import Headeralt from "./Headeralt";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useSelector } from "react-redux";
const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col min-h-screen">
      <Headeralt />
      <main className=""> {children} </main>
      <Footer />
    </div>
  );
};

export default Layout;
