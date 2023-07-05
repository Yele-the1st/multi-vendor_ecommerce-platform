import styles from "../styles/styles";
import logo from "../assets/logo-blue.png";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ShoppingCartIcon,
  ChatBubbleLeftEllipsisIcon,
  BarsArrowDownIcon,
  DocumentTextIcon,
  TagIcon,
  BuildingStorefrontIcon,
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { AiFillCaretDown } from "react-icons/ai";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import CategoryItems from "./CategoryItems";
import { cardData } from "../data/CategoryData";
import { productData } from "../static/data";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import { useSelector } from "react-redux";
import { backend_url } from "../utils/axiosInstance";
import Accordian from "./accordian/Accordian";
import NavLinksMobile from "./navlinks/NavLinksMobile";
import Cart from "./cart/Cart";
import Wishlist from "./wishlist/Wishlist";
import { logoutUser } from "../redux/actions/userAction";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const [visible, setVisible] = useState(false);
  const [openUserDropdown, setOpenUserDropdown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    navigate("/");
    dispatch(logoutUser());
    toast.success("logged out Successfully");
  };

  return (
    <div
      className={`${styles.section} sticky top-0 shadow-sm  bg-white flex flex-col px-4 lg:px-12 border-b border-b-[#F4F4F4] z-30`}
    >
      <div
        className={` w-full flex items-center justify-between lg:space-x-5 pt-4 pb-4 lg:pb-0  `}
      >
        <Link to={`/`} className="flex items-center gap-2">
          <h1 className=" text-2xl lg:text-3xl font-fira font-extrabold text-[#E0005B] ">
            Vendorr
          </h1>
        </Link>
        {/* Search box Header */}
        <SearchBar className={"hidden lg:flex"} />

        <div className=" flex items-center space-x-1  ">
          {isAuthenticated ? (
            <button
              className=" flex items-center relative py-2.5 px-4 min-h-[36px] min-w-[36px] rounded-full  hover:bg-[#f6f6f4] "
              onClick={() => setOpenUserDropdown(!openUserDropdown)}
            >
              {user?.avatar ? (
                <div className="w-8 h-8 mr-1 rounded-full">
                  <img
                    src={`${backend_url}${user?.avatar}`}
                    className=" h-full w-full rounded-full object-center object-cover "
                    alt=""
                  />
                </div>
              ) : (
                <UserCircleIcon className="h-7 w-7 text-[#d3d3d3]" />
              )}
              <AiFillCaretDown size={14} className=" text-[#d3d3d3] " />
              {openUserDropdown && (
                <nav className="absolute z-50 bg-white rounded-[24px] border-[#e6e7e8] px-2 py-2 right-0 top-[55px] min-w-full shadow text-left">
                  <div className="tracking-wide max-w-[250px] font-Ubuntu font-light text-sm whitespace-nowrap items-start">
                    <Link
                      to={`/app/profile`}
                      className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                    >
                      <UserCircleIcon className="h-8 w-8 shrink-0 text-[#d3d3d3]" />
                      <div className="w-full truncate">
                        <h3 className=" text-black truncate font-Ubuntu text-lg capitalize font-semibold">
                          {user?.fullname}
                        </h3>
                        <p className=" text-xs ">View your profile</p>
                      </div>
                    </Link>
                    <span className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex">
                      <DocumentTextIcon className="h-6 w-6 text-black" />
                      <p className=" ">Purchase & Reviews</p>
                    </span>
                    <span className=" p-3 rounded-2xl  hover:bg-[#f6f6f4] items-center space-x-2 flex">
                      <ChatBubbleLeftEllipsisIcon className="h-6 w-6 text-black" />
                      <p className=" ">Messages</p>
                    </span>
                    <span className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex pb-3">
                      <TagIcon className="h-6 w-6 text-black" />
                      <p className=" ">Special Offers</p>
                    </span>
                    <hr className=" h-0 my-2" />
                    <Link
                      to={`/auth/shop/create-shop`}
                      className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                    >
                      <BuildingStorefrontIcon className="h-6 w-6 text-black" />
                      <p className=" ">Create a Shop</p>
                    </Link>
                    <span
                      className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                      onClick={() => logoutHandler()}
                    >
                      <ArrowRightOnRectangleIcon className="h-6 w-6 text-black" />
                      <p className=" ">Log Out</p>
                    </span>
                  </div>
                </nav>
              )}
            </button>
          ) : (
            <Link
              to={`/auth/login`}
              className=" py-2.5 px-4 min-h-[36px] min-w-[36px] whitespace-nowrap font-Ubuntu font-bold text-center rounded-full hover:bg-[#f6f6f4] "
            >
              Sign in
            </Link>
          )}

          <button
            className=" relative py-2.5 px-4 min-h-[36px] min-w-[36px]  rounded-full hover:bg-[#f6f6f4] "
            onClick={() => setOpenWishlist(true)}
          >
            <HeartIcon className="w-6 h-6 stroke-2 " />
            <span className=" absolute right-0 top-1 rounded-full bg-[#E0005B] text-[11px] font-bold min-w-[17px] py-[3px] px-[6px] m-0 text-white border-2 border-white font-Fira text-xs leading-tight  text-center ">
              {wishList && wishList.length}
            </span>
          </button>
          {/* <BellIcon className="w-6 h-6 stroke-2" /> */}

          <button
            className=" relative py-2.5 px-4 min-h-[36px] min-w-[36px] rounded-full hover:bg-[#f6f6f4] "
            onClick={() => setOpenCart(true)}
          >
            <ShoppingCartIcon className="w-6 h-6 stroke-2" />
            <span className=" absolute right-0 top-1 rounded-full bg-[#E0005B] text-[11px] font-bold min-w-[17px] py-[3px] px-[6px] m-0 text-white border-2 border-white font-Fira text-xs leading-tight  text-center ">
              {cart && cart.length}
            </span>
          </button>
        </div>
      </div>
      <div
        className={` relative  w-full flex ${styles.section} justify-between items-center h-[65px] font-Ubuntu text-gray-600`}
      >
        <button
          onClick={() => setVisible(!visible)}
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
          <>
            <nav className=" hidden lg:block absolute bg-white rounded-[24px] border-[#e6e7e8] p-6 left-0 top-2 overflow-scroll mt-16 min-w-full shadow text-left">
              <div className="lg:gap-1 grid grid-cols-1 lg:grid-cols-3 items-start max-h-[calc(100vh-250px)] lg:max-h-max  ">
                {cardData.map((card, index) => (
                  <CategoryItems
                    link={`/products/c/${card.value}`}
                    key={index}
                    title={card.title}
                    description={card.description}
                    imageUrl={card.imageUrl}
                    setVisible={setVisible}
                  />
                ))}
              </div>
            </nav>
            <nav className="  lg:hidden absolute bg-white rounded-[24px] border-[#e6e7e8] p-6 left-0 top-2 overflow-scroll mt-16 min-w-full shadow text-left">
              <NavLinksMobile
                setVisible={setVisible}
                className={`flex flex-col`}
              />

              <Accordian
                classNameButton={"px-4 py-2"}
                title={`Category`}
                content={
                  <div className="flex flex-col items-start max-h-[calc(100vh-550px)]">
                    {cardData.map((card, index) => (
                      <CategoryItems
                        link={`/products/c/${card.value}`}
                        key={index}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                        setVisible={setVisible}
                      />
                    ))}
                  </div>
                }
              />
            </nav>
          </>
        )}
        <NavLinks className={`hidden lg:flex space-x-10 pr-4`} />
        <SearchBar className={"lg:hidden ml-8 mb-4"} />
        <Link
          to={`/app/create-shop`}
          className="hidden mb-1 lg:block font-medium whitespace-nowrap py-3 px-8  rounded-xl bg-[#f6f6f4] text-black hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0"
        >
          Create a Shop
        </Link>
      </div>
      {/* Cart popup */}
      {openCart ? <Cart setOpenCart={setOpenCart} openCart={openCart} /> : null}
      {/* Wishlist popup */}
      {openWishlist ? (
        <Wishlist
          setOpenWishlist={setOpenWishlist}
          openWishlist={openWishlist}
        />
      ) : null}
    </div>
  );
};

export default Navbar;
