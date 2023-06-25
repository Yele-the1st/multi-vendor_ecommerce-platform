import React, { useState } from "react";
import image from "../assets/images/excitedimg.png";
import {
  XMarkIcon,
  PaperAirplaneIcon,
  HeartIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { backend_url } from "../utils/axiosInstance";

const ProductOverview = ({ setOpen, seller, item }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);

  const handleMessageSubmit = () => {
    const j = 1 + 1;
    console.log(j);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div className="bg-white">
      {item ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className=" w-[90%] md:w-[60%] h-[90vh] overflow-y-scroll md:h-[75vh] bg-white rounded-md shadow relative p-4">
            <XMarkIcon
              className=" w-6 h-6 stroke-2 absolute right-3 top-3 cursor-pointer z-50"
              onClick={() => setOpen(false)}
            />
            <div className="grid w-full grid-cols-1 font-Ubuntu items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 ">
              <div className="  sm:col-span-4 lg:col-span-5">
                <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={`${backend_url}${item.images && item.images[0]}`}
                    alt=""
                    className="object-cover object-center"
                  />
                </div>
                <Link
                  to={`/`}
                  className=" text-sm text-indigo-600 hover:text-indigo-500 flex justify-center"
                >
                  View Full Details
                </Link>
              </div>
              <div className="sm:col-span-8 lg:col-span-7">
                <h2 className="text-2xl font-bold text-gray-900 sm:pr-12 line-clamp-2">
                  {item.name}
                </h2>
                <section aria-labelledby="information-heading" className="mt-2">
                  <div className="flex text-2xl font-Source items-center gap-3">
                    <h4 className={` font-semibold font-Source`}>
                      $
                      {item.discountedPrice
                        ? item.discountedPrice
                        : item.originalPrice}
                    </h4>
                    {item.discountedPrice && item.originalPrice && (
                      <h3 className=" text-lg line-through text-gray-600 font-Source">
                        ${item.originalPrice}
                      </h3>
                    )}
                  </div>
                  <div className="mt-6">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={`
                  ${item.rating > rating ? "text-gray-900" : "text-gray-200"} 
                  "h-4 w-4 flex-shrink-0"
                `}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{item.rating} out of 5 stars</p>
                      <a
                        href="#"
                        className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        {item.rating} reviews
                      </a>
                    </div>
                  </div>
                </section>
                <section className="mt-10 pr-3">
                  <p className=" line-clamp-[7]">{item.description}</p>
                </section>
                <section className="mt-10 flex items-center justify-between pr-3 ">
                  <div>
                    <button
                      className=" bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      onClick={decrementCount}
                    >
                      -
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-3">
                      {count}
                    </span>
                    <button
                      className=" bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-r px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
                      onClick={incrementCount}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={`opacity-100 border p-2 rounded-full hover:shadow-lg transition-all duration-300 ease-linear delay-0`}
                  >
                    <HeartIcon
                      className={` ${
                        click ? "fill-pink-600 stroke-none" : "fill-none"
                      } w-6 h-6 stroke-2 `}
                      title="Add to wishlist"
                      onClick={() => setClick(!click)}
                    />
                  </button>
                </section>
                <section className="mt-7 pr-3 ">
                  <button
                    className={` py-4 px-5 lg:py-3 lg:px-4 flex items-center gap-3 rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow bg-transparent font-semibold max-w-max hover:gap-5 hover:bg-black hover:text-white  transition-all duration-300 ease-linear delay-0`}
                  >
                    + Add to cart
                    <ArrowRightIcon className=" w-4 h-4 stroke-2  " />
                  </button>
                </section>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductOverview;
