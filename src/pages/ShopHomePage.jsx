import React from "react";
import styles from "../styles/styles";
import ShopInfo from "../components/shop/ShopInfo.jsx";

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-pink-50 px-3 lg:px-6`}>
      <div className="w-full py-10 ">
        <div className=" transition-all duration-300 ease-in-out  w-full h-[calc(100vh-170px)] justify-between  overflow-hidden flex  font-Ubuntu bg-white rounded-3xl  p-3  shadow-lg">
          <div className=" w-full flex flex-col px-2 lg:px-1 ">
            <ShopInfo isOwner={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
