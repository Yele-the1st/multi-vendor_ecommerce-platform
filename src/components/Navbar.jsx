import styles from "../styles/styles";
import logo from "../assets/logo-blue.png";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  BellIcon,
  BarsArrowDownIcon,
} from "@heroicons/react/24/outline";
import { AiFillCaretDown } from "react-icons/ai";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import CategoryItems from "./CategoryItems";
import { cardData } from "../data/CategoryData";
import { productData } from "../static/data";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => {
    setVisible(!visible);
  };

  return (
    <div
      className={`${styles.section} sticky top-0 shadow-sm  bg-white flex flex-col px-4 lg:px-12 border-b border-b-[#F4F4F4] z-50`}
    >
      <div
        className={` w-full flex items-center justify-between lg:space-x-5 pt-4 pb-4 lg:pb-0  `}
      >
        <div className="flex items-center gap-2">
          <h1 className=" text-2xl lg:text-3xl font-fira font-extrabold text-[#E0005B] ">
            Vendorr
          </h1>
        </div>
        {/* Search box Header */}
        <SearchBar className={"hidden lg:flex"} data={productData} />

        <div className=" flex items-center  ">
          <Link
            to={`/auth/login`}
            className=" hidden lg:block py-2.5 px-4 min-h-[36px] min-w-[36px] whitespace-nowrap font-Ubuntu font-bold text-center rounded-full hover:bg-[#f6f6f4] "
          >
            Sign in
          </Link>
          <Link
            to={`/seller`}
            className=" hidden py-2.5 px-4 min-h-[36px] min-w-[36px] whitespace-nowrap font-Ubuntu font-bold text-center rounded-full hover:bg-[#f6f6f4] "
          >
            Become a Seller
          </Link>

          <button className=" relative py-2.5 px-4 min-h-[36px] min-w-[36px]  rounded-full hover:bg-[#f6f6f4] ">
            <HeartIcon className="w-6 h-6 stroke-2 " />
            <span className=" absolute right-0 top-1 rounded-full bg-[#E0005B] text-[11px] font-bold min-w-[17px] py-[3px] px-[6px] m-0 text-white border-2 border-white font-Fira text-xs leading-tight  text-center ">
              0
            </span>
          </button>
          {/* <BellIcon className="w-6 h-6 stroke-2" /> */}

          <button className=" relative py-2.5 px-4 min-h-[36px] min-w-[36px] rounded-full hover:bg-[#f6f6f4] ">
            <ShoppingCartIcon className="w-6 h-6 stroke-2" />
            <span className=" absolute right-0 top-1 rounded-full bg-[#E0005B] text-[11px] font-bold min-w-[17px] py-[3px] px-[6px] m-0 text-white border-2 border-white font-Fira text-xs leading-tight  text-center ">
              0
            </span>
          </button>
          <button className=" flex items-center relative py-2.5 px-4 min-h-[36px] min-w-[36px] rounded-full  hover:bg-[#f6f6f4] ">
            <UserCircleIcon className="h-7 w-7 text-[#d3d3d3]" />
            <AiFillCaretDown size={14} className=" text-[#d3d3d3] " />
          </button>
        </div>
      </div>
      <div
        className={` relative  w-full flex ${styles.section} justify-between items-center h-[65px] font-Ubuntu text-gray-600`}
      >
        <button
          onClick={handleVisible}
          className={`flex items-center  gap-3 pb-5 lg:py-5 lg:hover:border-b-black lg:border-b-[3px] hover:text-black  ${
            visible ? "border-b-black text-black" : "border-b-transparent"
          } transition-colors duration-300 ease-in-out delay-0`}
        >
          <BarsArrowDownIcon className=" w-8 h-8 lg:w-6 lg:h-6 stroke-2 cursor-pointer" />
          <span className=" whitespace-nowrap hidden lg:block">
            All Categories
          </span>
        </button>
        {visible && (
          <nav className="absolute bg-white rounded-[24px] border-[#e6e7e8] p-6 left-0 top-2 overflow-scroll mt-16 min-w-full shadow text-left">
            <div className="lg:gap-1 grid grid-cols-1 lg:grid-cols-3 items-start max-h-[calc(100vh-250px)] lg:max-h-max  ">
              {cardData.map((card, index) => (
                <CategoryItems
                  key={index}
                  title={card.title}
                  description={card.description}
                  imageUrl={card.imageUrl}
                />
              ))}
            </div>
          </nav>
        )}
        <NavLinks />
        <SearchBar className={"lg:hidden ml-8 mb-4"} data={productData} />
        <Link
          to={`/seller`}
          className="hidden mb-1 lg:block font-medium whitespace-nowrap py-3 px-8  rounded-xl bg-[#f6f6f4] text-black hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0"
        >
          Become a Seller
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
