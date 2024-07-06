"use client";
import React from "react";
import SideBar from "../../components/common/SideBar";

import { Provider } from "react-redux";
import { makeStore } from "../../../lib/store";
import AbsoluteMenusAndModals from "../../components/common/AbsoluteMenusAndModals";
import TopBar from "../../components/common/TopBar";
import "../../styles.css";
import AuthToast from "../../abstracts/AuthToast";

const layout = ({ children }) => {
  return (
    <div className="flex relative  min-h-screen">
      <AuthToast show={true} />
      <AbsoluteMenusAndModals />
      <SideBar />
      <div className="flex-[5] flex flex-col">
        <TopBar />
        {children}
      </div>
    </div>
  );
};

export default layout;
