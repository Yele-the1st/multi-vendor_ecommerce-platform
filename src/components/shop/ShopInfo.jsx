import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../utils/axiosInstance";
import {
  IdentificationIcon,
  CubeIcon,
  PhoneIcon,
  StarIcon,
  ClockIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import {
  ArrowRightOnRectangleIcon,
  BuildingStorefrontIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  InformationCircleIcon,
  PencilIcon,
  QueueListIcon,
  Square3Stack3DIcon,
  SwatchIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { Link, useParams } from "react-router-dom";
import { productData } from "../../static/data";
import ProductCard from "../ProductCard";
import { logoutSeller, loadSeller } from "../../redux/actions/sellerAction";
import { toast } from "react-toastify";

const ShopInfo = ({ isOwner }) => {
  const [dropdown, setDropdown] = useState(false);
  const { fetchedSeller, fetchedLoading, fetchedError } = useSelector(
    (state) => state.seller
  );
  const { id } = useParams();
  const [active, setActive] = useState(1);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutSeller());
    toast.success("logged out Successfully");
  };

  useEffect(() => {
    dispatch(loadSeller(id));
  }, [dispatch]);

  return (
    <div className=" transition-all ease-in-out duration-300 delay-0 relative  w-full overflow-y-hidden">
      <div className=" z-20 absolute top-1 right-1">
        <div
          className="relative cursor-pointer p-2 rounded-2xl hover:shadow-lg hover:bg-[#f4f4f4]"
          onClick={() => setDropdown(!dropdown)}
        >
          <QueueListIcon className=" w-7 h-7" />
          {dropdown && (
            <nav className="absolute z-50 bg-white rounded-[24px] border-[#e6e7e8] px-2 py-2 right-0 top-12 min-w-full shadow text-left">
              <div className="tracking-wide max-w-[250px] font-Ubuntu font-light text-sm whitespace-nowrap items-start">
                <span
                  onClick={() => setActive(1)}
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                >
                  <InformationCircleIcon className="h-6 w-6 text-black" />
                  <p className=" ">Info</p>
                </span>

                <span
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                  onClick={() => setActive(2)}
                >
                  <CubeIcon className="h-6 w-6 text-black" />
                  <p className=" ">Shop Products</p>
                </span>
                <span
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex pb-3"
                  onClick={() => setActive(3)}
                >
                  <SwatchIcon className="h-6 w-6 text-black" />
                  <p className=" ">Running Events</p>
                </span>
                <span
                  onClick={() => setActive(4)}
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                >
                  <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6 text-black" />
                  <p className=" ">Shop Reviews</p>
                </span>
                <hr className=" h-0 my-2" />

                <Link
                  to={`/shop/dashboard`}
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                >
                  <Square3Stack3DIcon className="h-6 w-6 text-black" />
                  <p className=" ">Dashboard</p>
                </Link>
                <Link
                  to={`/auth/shop/create-shop`}
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                >
                  <PencilIcon className="h-6 w-6 text-black" />
                  <p className=" ">Edit Shop</p>
                </Link>
                <span
                  className=" p-3 rounded-2xl hover:bg-[#f6f6f4] items-center space-x-2 flex"
                  //   onClick={() => logoutHandler()}
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-black" />
                  <p className=" ">Log Out</p>
                </span>
              </div>
            </nav>
          )}
        </div>
      </div>

      {active === 1 ? (
        <div className=" overflow-y-scroll w-full h-full flex flex-col gap-6 items-center lg:flex-row ">
          <div className=" lg:w-1/3 py-5">
            <div className="w-full flex items-center justify-center">
              <div className=" w-36 h-36 rounded-full">
                <img
                  src={`${backend_url}${fetchedSeller?.avatar}`}
                  alt=""
                  className="w-full h-full object-center object-cover rounded-full"
                />
              </div>
            </div>
            <h3 className="text-center font-semibold py-4 text-4xl">
              {fetchedSeller?.shopname}
            </h3>
            <p className=" text-sm text-[#000000a6] p-2.5 flex text-center items-center">
              {fetchedSeller?.description}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              quae cumque delectus, ipsam accusantium recusandae distinctio a
              ullam eum mollitia harum quis eligendi et placeat atque. Error
              mollitia facere maiores.
            </p>
            {isOwner && (
              <div className="py-3 px-4 ">
                <button className=" w-full group hover:scale-y-105 hover:shadow-xl border-2 border-black mb-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out">
                  <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                    Edit Shop
                  </p>
                </button>
                <button
                  className=" w-full group bg-black hover:scale-y-105 hover:shadow-xl  text-white mb-3   font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
                  onClick={() => logoutHandler()}
                >
                  <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                    Log Out
                  </p>
                </button>
              </div>
            )}
          </div>

          <div className=" w-full lg:w-2/3">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6 mt-3  lg:mt-12">
              <div className="p-3 flex items-center gap-3 rounded-2xl cursor-pointer shadow-lg">
                <div className=" py-3 px-1.5 bg-pink-50 rounded-2xl">
                  <IdentificationIcon className=" w-20 h-20 text-indigo-500" />
                </div>
                <div>
                  <h5 className=" font-semibold">Address</h5>
                  <p className="text-[#000000a6]">{fetchedSeller?.address}</p>
                </div>
              </div>

              <div className="p-3 flex items-center gap-3 rounded-2xl cursor-pointer shadow-lg">
                <div className=" py-3 px-1.5 bg-pink-50 rounded-2xl">
                  <PhoneIcon className=" w-20 h-20 text-indigo-500" />
                </div>
                <div>
                  <h5 className=" font-semibold">Phone Number</h5>
                  <p className="text-[#000000a6]">
                    +234({fetchedSeller?.phoneNumber})
                  </p>
                </div>
              </div>

              <div className="p-3 flex items-center gap-3 rounded-2xl cursor-pointer shadow-lg">
                <div className=" py-3 px-1.5 bg-pink-50 rounded-2xl">
                  <CubeIcon className=" w-20 h-20 text-indigo-500" />
                </div>
                <div>
                  <h5 className=" font-semibold">Total Products</h5>
                  <p className="text-[#000000a6]">10</p>
                </div>
              </div>

              <div className="p-3 flex items-center gap-3 rounded-2xl cursor-pointer shadow-lg">
                <div className=" py-3 px-1.5 bg-pink-50 rounded-2xl">
                  <StarIcon className=" w-20 h-20 text-indigo-500" />
                </div>
                <div>
                  <h5 className=" font-semibold">Ratings</h5>
                  <p className="text-[#000000a6]">4/5</p>
                </div>
              </div>

              <div className="p-3 flex items-center gap-3 rounded-2xl cursor-pointer shadow-lg">
                <div className=" py-3 px-1.5 bg-pink-50 rounded-2xl">
                  <ClockIcon className=" w-20 h-20 text-indigo-500" />
                </div>
                <div>
                  <h5 className=" font-semibold">Joined on</h5>
                  <p className="text-[#000000a6]">
                    {fetchedSeller?.createdAt?.slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {active === 2 ? (
        <div className={` h-full mt-5 w-full `}>
          <div className=" px-4 lg:px-12 pb-6">
            <h1 className=" text-3xl font-bold">
              {fetchedSeller?.shopname}'s Products
            </h1>
          </div>
          <div className=" px-4 lg:px-12 overflow-y-scroll w-full h-full">
            <div className=" mt-5 grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-24">
              {fetchedSeller?.products &&
                fetchedSeller?.products.map((i) => (
                  <ProductCard
                    item={i}
                    key={i._id}
                    seller={fetchedSeller}
                    isShop={true}
                  />
                ))}
            </div>
          </div>
          {productData && productData.length === 0 ? (
            <h1 className="text-center w-full font-Ubuntu pb-[100px] text-2xl font-bold">
              No Products Found
            </h1>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default ShopInfo;
