import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/styles";
import { HeartIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishList } from "../../redux/slices/wishListSlice";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/slices/cartSlice";
import { backend_url } from "../../utils/axiosInstance";

const Wishlist = ({ setOpenWishlist, openWishlist }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromWishList(data));
  };

  const addToCartHandler = (data) => {
    const isItemExists = cart && cart.find((i) => i._id === data._id);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart");
    }
  };

  return (
    <div className=" relative z-20">
      <div
        className="fixed inset-0 transition-opacity bg-opacity-7  backdrop-filter backdrop-blur-sm "
        onClick={() => setOpenWishlist(false)}
      ></div>

      <div class=" fixed inset-y-0 right-0 overflow-hidden  flex max-w-full pl-10">
        {/* Slide-over panel */}
        <div
          className={`pointer-events-auto w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700  ${
            openWishlist ? "translate-x-0" : "translate-x-full "
          }`}
        >
          <div className="flex h-screen flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 h-full  px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-xl font-Ubuntu font-semibold whitespace-nowrap text-gray-900"
                  id="slide-over-title"
                >
                  Favourite Items
                </h2>
                <div
                  className=" flex w-full justify-end -m-2 p-2 cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                >
                  <XMarkIcon className="w-6 h-6 stroke-[3]" />
                </div>
              </div>
              {/* item length */}
              <div className={`${styles.noramlFlex} py-4`}>
                <HeartIcon className="w-7 h-7 text-gray-900" />
                <h5 className=" font-Ubuntu pl-2 font-medium whitespace-nowrap">
                  {wishList && wishList.length}
                </h5>
              </div>
              {/* cart single items */}
              {wishList && wishList.length === 0 ? (
                <div className=" h-[calc(100vh-360px)] overflow-y-scroll  w-full mt-8 flow-root">
                  <div className=" font-Ubuntu text-lg font-semibold flex h-full justify-center flex-col items-center">
                    No Item in cart
                  </div>
                </div>
              ) : (
                <>
                  <div className=" h-[calc(100vh-220px)] overflow-y-scroll  w-full mt-8 flow-root">
                    <div className=" overflow-y-auto  -my-6 divide-y divide-gray-200">
                      {wishList &&
                        wishList.map((i, index) => (
                          <WishlistSingle
                            setOpenWishlist={setOpenWishlist}
                            key={index}
                            data={i}
                            removeFromCartHandler={removeFromCartHandler}
                            addToCartHandler={addToCartHandler}
                          />
                        ))}
                    </div>
                  </div>

                  <div className="mt-6 font-Ubuntu flex justify-center text-center text-sm text-gray-500">
                    <p>
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                        onClick={() => setOpenWishlist(false)}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WishlistSingle = ({
  setOpenWishlist,
  removeFromCartHandler,
  addToCartHandler,
  data,
}) => {
  return (
    <div className=" font-Ubuntu flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={`${backend_url}${data.images && data.images[0]}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className=" text-sm font-medium">
              <Link to={``}>{data.name}</Link>
            </h3>
            <p className="ml-4 text-base font-semibold">
              $
              {data.discountedPrice ? data.discountedPrice : data.originalPrice}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{data.description}</p>
        </div>
        <div className="flex mt-1 flex-1 items-end space-x-4 text-sm">
          <button
            className={` py-2 px-4 flex items-center rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow text-sm font-medium max-w-max bg-black text-white hover:scale-110 transition-all duration-300 ease-linear delay-0`}
            onClick={() => addToCartHandler(data)}
          >
            Add to cart
          </button>
          <button
            className={` py-1.5 px-4 flex items-center rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow bg-transparent text-sm font-medium border-2 border-black max-w-max hover:bg-black hover:text-white transition-colors duration-300 ease-linear delay-0`}
            onClick={() => removeFromCartHandler(data)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
