import React from "react";
import DashboardSideBar from "../components/shop/DashboardSideBar.jsx";
import styles from "../styles/styles.js";

const ShopDashboardPage = () => {
  return (
    <div
      className={`${styles.section} bg-pink-50 sticky top-0 shadow-sm flex flex-col border-b border-b-[#F4F4F4] z-30`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="max-w-max">
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
