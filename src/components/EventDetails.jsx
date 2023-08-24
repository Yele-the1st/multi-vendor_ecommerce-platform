import React, { useEffect, useState } from "react";
import styles from "../styles/styles";
import { HeartIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  ArchiveBoxIcon,
  StarIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

import { Link, useNavigate, useParams } from "react-router-dom";
import Accordian from "./accordian/Accordian";

import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "../redux/slices/wishListSlice";

const EventDetails = ({ data }) => {
  const { cart } = useSelector((state) => state.cart);
  const { wishList } = useSelector((state) => state.wishList);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    if (data.stock > count) {
      setCount(count + 1);
    } else {
      toast.error("Item stock is limited");
    }
  };

  useEffect(() => {
    const isItemExists = wishList && wishList.find((i) => i?._id === data?._id);
    if (isItemExists) {
      console.log(wishList);
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      const cartData = { ...data, qty: count };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart");
    }
  };

  const addToWishListHandler = (item) => {
    setClick(!click);
    dispatch(addToWishList(item));
  };

  return (
    <div className="bg-white font-Ubuntu">
      {data ? (
        <div className={` ${styles.section} px-4 lg:px-12`}>
          <div className="py-8 sm:py-10">
            <div className=" lg:float-left lg:w-[67%] mb-9">
              <div className=" mr-8 ">
                <div className="pb-6 items-center gap-2 flex cursor-pointer">
                  <ArrowLeftIcon className="w-4 h-4 stroke-2" />
                  <h1 className=" font-semibold">Back to search results</h1>
                </div>
                <div className="relative">
                  <button
                    className={`hover:scale-110 z-10 absolute min-h-[36px] min-w-[36px] -top-6 -right-6 lg:right-0  p-2 rounded-full shadow-xl transition-all duration-300 ease-in-out delay-0`}
                    onClick={() => setClick(!click)}
                  >
                    <HeartIcon
                      className={` ${
                        click ? "fill-pink-600 stroke-none" : "fill-none"
                      } w-7 h-7 stroke-[2] `}
                      title="Add to wishlist"
                    />
                  </button>
                  <div className="flex">
                    <div className=" ml-[80px] max-w-[794px] relative order-2 flex-grow-[6] flex-shrink-[1] flex-[0%]">
                      <div className="pt-[80%] h-0 relative">
                        <div className=" duration-700 ease-in absolute left-0 overflow-hidden top-0 h-full w-full">
                          <img
                            src={`${data.images && data.images[select]?.url}`}
                            alt=""
                            className=" overflow-clip max-h-full relative -translate-y-[50%] top-[50%] block mx-auto max-w-full  rounded-[6px]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="absolute left-0 bottom-0 top-0 overflow-y-scroll">
                      <div className=" flex flex-col  items-end ">
                        {data.images.map((image, index) => (
                          <div
                            key={index}
                            className={`${
                              select === index ? "border-2 border-black" : ""
                            } cursor-pointer h-[70px] w-[70px] mb-1.5 mr-1.5 rounded-[6px] overflow-hidden bg-[#eaeaea] flex-shrink-0`}
                            onClick={() => setSelect(index)}
                          >
                            <img
                              src={`${image?.url}`}
                              alt=""
                              className="max-w-full w-full overflow-clip"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2 lg:float-right lg:w-[33%] flex flex-col ">
              <div className="pr-8 flex flex-col"></div>
              <div className=" flex items-center justify-between">
                {data.stock < 3 ? (
                  <>
                    <h3 className=" font-semibold text-[#A5192E]">
                      Low in Stock, only 3 left
                    </h3>
                    <ArchiveBoxIcon className="w-5 h-5 text-[#A5192E]" />
                  </>
                ) : (
                  <>
                    <h3 className=" font-semibold text-green-600">
                      More thank 3 Stock left.
                    </h3>
                    <ArchiveBoxIcon className="w-5 h-5 text-green-600" />
                  </>
                )}
              </div>
              <h2 className=" font-semibold text-2xl my-2">
                $
                {data.originalPrice ? data.originalPrice : data.discountedPrice}
              </h2>
              <p className=" text-[#595959] text-sm mb-2 ">
                Shipping and taxes calculated at checkout.
              </p>
              <div className=" font-semibold text-lg mb-1">
                <p>{data.name}</p>
              </div>
              <div className=" flex items-center gap-3 mb-3">
                <p>Rating:</p>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`
                  ${data.rating > rating ? "text-gray-900" : "text-gray-200"} 
                  "h-4 w-4 flex-shrink-0"
                `}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>

              <div className="mb-4">
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

              <button className=" group hover:scale-y-105 hover:shadow-xl border-2 border-black mb-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out">
                <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                  Buy it NOW
                </p>
              </button>
              <button
                className=" group border-2 border-black bg-black hover:scale-y-105 hover:shadow-xl  text-white mb-3   font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
                onClick={() => addToCartHandler(data._id)}
              >
                <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                  Add to Cart
                </p>
              </button>
              <button
                className=" border-2 border-transparent group hover:scale-y-105 hover:shadow-xl hover:bg-[#f4f4f4]  mb-3  font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
                onClick={() => addToWishListHandler(data)}
              >
                <div className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out flex gap-2 justify-center items-center">
                  <HeartIcon className="w-5 h-5 fill-pink-500 stroke-none" />
                  <p>Add to favourites</p>
                </div>
              </button>
            </div>

            <div className=" lg:float-right space-y-2 lg:w-[33%]">
              <div className=" mb-6">
                <Accordian
                  title={`Description`}
                  content={data.description}
                  classNameButton={"py-3 px-6"}
                  classNameTitle={"font-semibold"}
                  classNameContent={
                    "pl-8 pb-4 tracking-wider whitespace-pre-line"
                  }
                />
                <Accordian
                  title={`Meet your Seller`}
                  content={
                    <div className="w-full">
                      <Link to={`/`}>
                        <div className="flex font-Ubuntu mb-2 font-semibold items-center gap-2.5 ">
                          <img
                            className="w-[46px] h-[46px]  object-cover rounded-full "
                            src={`${
                              data?.shopId?.avatar && data?.shopId?.avatar?.url
                            }`}
                            alt=""
                          />
                          <div className="flex flex-col">
                            <span className="text-sm">
                              {data?.shopId?.shopname}
                            </span>
                            <div className="flex items-center gap-1">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <StarIcon
                                  key={rating}
                                  className={`
                               ${
                                 data?.shopId?.ratings > rating
                                   ? "text-gray-900"
                                   : "text-gray-200"
                               } 
                                  "h-4 w-4 flex-shrink-0"
                                 `}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </Link>
                      <button className=" group hover:scale-y-105 hover:shadow-xl my-3 w-full border-2 border-black mb-2 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out">
                        <div className=" group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out flex gap-2 justify-center items-center">
                          <p>Message Seller</p>
                          <PaperAirplaneIcon className="w-5 h-5" />
                        </div>
                      </button>
                    </div>
                  }
                  classNameButton={"py-3 px-6"}
                  classNameTitle={"font-semibold whitespace-nowrap"}
                  classNameContent={"pl-8 pb-4"}
                />
              </div>
            </div>
            <div className=" lg:clear-left lg:w-[60%]">
              <ProductDetailsInfo data={data} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className=" py-4 ">
      <div className=" w-full flex justify-between border-b mt-10 py-2">
        <div
          className={` ${
            active === 1 ? "text-gray-900" : "text-gray-400"
          }   relative cursor-pointer`}
        >
          <h5
            className=" leading-5 font-semibold  lg:text-lg "
            onClick={() => setActive(1)}
          >
            Product Details
          </h5>
        </div>
        <div
          className={` ${
            active === 2 ? "text-gray-900" : "text-gray-400"
          }  relative cursor-pointer`}
        >
          <h5
            className=" leading-5 font-semibold  lg:text-lg "
            onClick={() => setActive(2)}
          >
            Product Reviews
          </h5>
        </div>
        <div
          className={` ${
            active === 3 ? "text-gray-900" : "text-gray-400"
          }  relative cursor-pointer`}
        >
          <h5
            className="  leading-5 font-semibold  lg:text-lg "
            onClick={() => setActive(3)}
          >
            Seller Information
          </h5>
        </div>
      </div>
      {active === 1 ? (
        <p className=" py-2 leading-8 pb-10 whitespace-pre-line">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eius
          ipsum odio mollitia eum, fugit modi porro fugiat, distinctio eaque
          dolor id perferendis. Commodi quod modi, inventore provident maiores
          incidunt.
        </p>
      ) : null}
      {active === 2 ? (
        <div className=" w-full justify-center flex min-h-[40vh] items-center">
          <p className=" py-2 leading-8 pb-10 whitespace-pre-line">
            No reviews yet!
          </p>
        </div>
      ) : null}
      {active === 3 ? (
        <div className=" p-5 w-full lg:justify-between lg:gap-9  flex flex-col lg:flex-row ">
          <div className=" w-full lg:w-1/2  ">
            <div className="flex font-Ubuntu mb-2 font-semibold items-center gap-2.5 ">
              <img
                className="w-[46px] h-[46px]  object-cover rounded-full "
                src={`${data?.shopId?.avatar && data?.shopId?.avatar?.url}`}
                alt=""
              />
              <div className="flex flex-col">
                <span className="text-sm">{data?.shopId?.shopname}</span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`
                               ${
                                 data?.shopId?.ratings > rating
                                   ? "text-gray-900"
                                   : "text-gray-200"
                               } 
                                  "h-4 w-4 flex-shrink-0"
                                 `}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className=" pt-2 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus architecto non saepe molestias perspiciatis provident
              similique ut magnam reprehenderit fugiat nemo, rem est esse
              repellat natus incidunt ad nam obcaecati? lorem Lorem ipsum dolor
              sit amet, consectetur adipisicing elit. Odit sapiente omnis sequi,
              veniam optio quos, sit pariatur modi vero sunt quis iure hic magni
              ad officiis cum. Sint, id perspiciatis! Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Dicta aspernatur eius nihil
              recusandae aperiam quaerat veritatis fugiat esse ab doloribus,
              voluptas laboriosam exercitationem aliquid id itaque assumenda
              voluptatem repudiandae cumque.
            </p>
          </div>
          <div className=" w-full lg:w-1/2 mt-5 lg:mt-0 flex flex-col lg:items-end">
            <div className="text-left whitespace-nowrap">
              <h5 className=" font-semibold">
                Joined on: <span className="font-medium">14th March 2023</span>
              </h5>
              <h5 className=" font-semibold pt-3">
                Total Products: <span className="font-medium">1233</span>
              </h5>
              <h5 className=" font-semibold pt-3">
                Total Reviews: <span className="font-medium">324</span>
              </h5>
              <Link to={`/`}>
                <button className=" w-full mt-5 group bg-black hover:scale-y-105 hover:shadow-xl  text-white mb-3   font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out">
                  <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                    Visit shop
                  </p>
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default EventDetails;
