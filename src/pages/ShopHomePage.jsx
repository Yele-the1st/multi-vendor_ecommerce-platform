import React from "react";
import styles from "../styles/styles";
import ShopInfo from "../components/shop/ShopInfo.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopHomePage = () => {
  const { fetchedSeller, fetchedLoading, fetchedError, seller } = useSelector(
    (state) => state.seller
  );
  let isOwner;
  const { id } = useParams();
  if (seller?._id === id) {
    isOwner = true;
  } else isOwner = false;
  return (
    <div className={`${styles.section} bg-pink-50 px-3 lg:px-6`}>
      <div className="w-full py-10 ">
        <div className=" transition-all duration-300 ease-in-out  w-full h-[calc(100vh-150px)] justify-between  overflow-hidden flex  font-Ubuntu bg-white rounded-3xl  p-3  shadow-lg">
          <div className=" w-full flex flex-col px-2 lg:px-1 ">
            <ShopInfo isOwner={isOwner} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
