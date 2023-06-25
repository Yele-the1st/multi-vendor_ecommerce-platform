import React from "react";
import styles from "../styles/styles";
import DashboardSideBar from "../components/shop/DashboardSideBar";
import ShopEvents from "../components/shop/ShopEvents.jsx";

const ShopEventsPage = () => {
  return (
    <div>
      <div
        className={`${styles.section} bg-pink-50 sticky top-0 shadow-sm flex flex-col border-b border-b-[#F4F4F4] z-30`}
      >
        <div className="flex justify-between w-full">
          <div className="max-w-max">
            <DashboardSideBar active={5} />
          </div>
          <div className=" w-full px-4 lg:px-8 overflow-x-hidden h-[calc(100vh-120px)] justify-center flex">
            <ShopEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopEventsPage;
