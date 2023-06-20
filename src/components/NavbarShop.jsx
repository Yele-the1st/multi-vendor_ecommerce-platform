import React from "react";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { backend_url } from "../utils/axiosInstance";
import { AiFillCaretDown } from "react-icons/ai";

const NavbarShop = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div
      className={`${styles.section} sticky top-0 shadow-sm bg-white flex flex-col px-6 lg:px-12 border-b border-b-[#F4F4F4] z-30`}
    >
      <div
        className={` w-full flex items-center justify-between lg:space-x-5 pt-4 pb-4  `}
      >
        <Link to={`/`} className="flex items-center gap-2 cursor-pointer">
          <h1 className=" text-2xl lg:text-3xl font-fira font-extrabold text-[#E0005B] ">
            Vendorr
          </h1>
        </Link>
        <div className=" flex items-center space-x-1">
          <Link
            to={`/shop/${seller._id}`}
            className="flex items-center relative py-2.5 px-4 min-h-[36px] min-w-[36px] rounded-full  hover:bg-[#f6f6f4] "
          >
            {seller?.avatar ? (
              <div className=" w-8 h-8 mr-1 rounded-full">
                <img
                  src={`${backend_url}${seller?.avatar}`}
                  className=" h-full w-full rounded-full object-center object-cover  "
                  alt=""
                />
              </div>
            ) : (
              <UserCircleIcon className="h-9 w-9 text-[#d3d3d3]" />
            )}
            <AiFillCaretDown size={14} className=" text-[#d3d3d3] " />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarShop;
