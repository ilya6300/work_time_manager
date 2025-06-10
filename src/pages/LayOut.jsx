import React from "react";
import Header from "../components/header/Header";
import { Outlet } from "react-router";

const LayOut = () => {
  return (
    <div className="body">
      <div className="layout_container">
        <Header />
        <div className="outlet_container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayOut;
