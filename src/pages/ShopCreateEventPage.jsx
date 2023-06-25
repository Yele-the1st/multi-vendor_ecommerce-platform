import React from "react";
import styles from "../styles/styles";
import DashboardSideBar from "../components/shop/DashboardSideBar";
import CreateEvent from "../components/shop/CreateEvent.jsx";

const ShopCreateEventPage = () => {
  return (
    <div
      className={`${styles.section} bg-pink-50 sticky top-0 shadow-sm flex flex-col border-b border-b-[#F4F4F4] z-30`}
    >
      <div className="flex items-center  justify-between w-full">
        <div className="max-w-max">
          <DashboardSideBar active={6} />
        </div>
        <div className=" w-full h-[calc(100vh-120px)] justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEventPage;
