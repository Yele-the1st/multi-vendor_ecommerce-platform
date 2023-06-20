import React from "react";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavbarApp = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div
      className={`${styles.section} sticky top-0 shadow-sm  bg-white flex flex-col px-6 lg:px-12 border-b border-b-[#F4F4F4] z-30`}
    >
      <div
        className={` w-full flex items-center justify-between lg:space-x-5 pt-4 pb-4  `}
      >
        <Link to={`/`} className="flex items-center gap-2 cursor-pointer">
          <h1 className=" text-2xl lg:text-3xl font-fira font-extrabold text-[#E0005B] ">
            Vendorr
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default NavbarApp;
