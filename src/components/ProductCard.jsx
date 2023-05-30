import React from "react";
import { Link } from "react-router-dom";
import { StarIcon, HeartIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { generateComponents } from "../utils/generateComponent";

const ProductCard = ({ item }) => {
  const d = item.name;
  const product_name = d.replace(/\s+/g, "-");
  return (
    <div className=" w-full hover:shadow-md rounded-t-xl  bg-white flex flex-col">
      <Link to={`/product/${product_name}`}>
        <div className=" shadow rounded-t-xl border-0.5 relative h-0 overflow-hidden pb-[63.25%]">
          <img
            className="absolute inset-0 w-full h-full  overflow-clip object-contain"
            src={item.image_Url[0].url}
            alt=""
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/`}>
          <div className="flex font-Ubuntu mb-2 font-semibold items-center gap-2.5 ">
            <img
              className="w-[26px] h-[26px]  object-cover rounded-full "
              src={item.shop.shop_avatar.url}
              alt=""
            />
            <span className="text-sm">{item.shop.name}</span>
          </div>
        </Link>
        <p className="line-clamp-2 font-light text-sm font-Source">
          {item.name}
        </p>
        <div className=" items-baseline justify-between  border-b-[0.5px] border-gray-300">
          <div className="flex items-center gap-1.5">
            {generateComponents(item.rating, <StarIcon className="w-4 h-4" />)}
          </div>
          {/* <span className="text-base font-Source">{item.rating}</span> */}
          <div className="flex items-center gap-3">
            <h4 className={`text-lg font-semibold font-Source`}>
              ${item.discount_price ? item.discount_price : item.price}
            </h4>
            {item.discount_price && item.price && (
              <h3 className=" line-through text-gray-600 font-Source">
                ${item.price}
              </h3>
            )}
          </div>
          <h2 className=" whitespace-nowrap font-Ubuntu">
            {item.total_sell} Sold{" "}
          </h2>
        </div>

        <div className=" mt-2 items-center justify-between">
          <button
            className={` py-3 px-4 lg:py-3 lg:px-4 flex items-center gap-3 rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow bg-transparent text-sm font-medium max-w-max hover:gap-5 hover:bg-black hover:text-white  transition-all duration-300 ease-linear delay-0`}
          >
            + Add to cart
            <ArrowRightIcon className=" w-4 h-4  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
