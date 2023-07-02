import { CursorArrowRaysIcon } from "@heroicons/react/24/outline";
import {
  BuildingStorefrontIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../utils/axiosInstance";

const ShopCard = ({ shop }) => {
  return (
    <div className=" group w-full max-w-sm bg-white rounded-2xl font-Ubuntu shadow-lg">
      <div className=" relative flex flex-col items-center pb-1">
        <img
          className=" z-10 absolute top-10 inset-y-0 w-24 h-24 rounded-full shadow-lg"
          src={`${backend_url}${shop?.avatar && shop.avatar}`}
          alt="Bonnie image"
        />
        <div className=" w-full bg-pink-300 mb-8 h-28 rounded-t-2xl overflow-hidden">
          <div className=" relative">
            <div className=" absolute rounded-xl cursor-pointer top-2 right-2 p-2 bg-[#f4f4f4] shadow-xl">
              <PaperAirplaneIcon className=" w-4 h-4 -rotate-45" />
            </div>
            <div className=" transition-all cursor-pointer duration-300 ease-in-out  hidden group-hover:block absolute group-hover:animate-ping rounded-xl top-7 right-2 shadow-xl">
              <CursorArrowRaysIcon className=" w-5 h-5" />
            </div>
          </div>
          <img
            className="  w-full h-full object-cover "
            src={`${backend_url}${shop?.avatar && shop.avatar}`}
            alt="Bonnie image"
          />
        </div>
        <div className=" px-4">
          <h5 className="mb-1 text-center text-xl font-semibold text-gray-900 ">
            {shop?.shopname}
          </h5>
          <span className="text-sm text-center text-gray-500 line-clamp-2  ">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos
            laudantium iste eum nobis, nulla quidem ab hic iusto est? Id magni
            voluptas similique laudantium alias dicta excepturi modi quibusdam
            praesentium?
          </span>

          <div className=" text-sm mt-1  space-x-8 justify-between flex items-center">
            <div>
              <div className=" text-center text-xl font-bold">
                {shop.products.length}
              </div>
              <div>Products</div>
            </div>
            <div>
              <div className=" text-center text-xl font-bold">
                {shop.events.length}
              </div>
              <div>Events</div>
            </div>
          </div>
          <div className="flex my-1 space-x-3">
            <Link
              to={`/shop/${shop?._id}`}
              className=" group/button hover:scale-y-105 hover:shadow-xl my-3 w-full border-2 border-black mb-2 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
            >
              <div className="group-hover/button:scale-105 transition-all delay-0 duration-300 ease-in-out flex gap-2 justify-center items-center">
                <p>Visit Shop</p>
                <ArrowRightIcon className="w-4 h-4 stroke-[3]" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
