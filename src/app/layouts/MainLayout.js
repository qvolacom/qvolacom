// components/Layout.js
import React from "react";
import NavBar from "@/app/components/NavBar";
import Footer from "@/app/components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div>
      <NavBar></NavBar>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
