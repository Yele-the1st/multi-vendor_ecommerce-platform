import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { StarIcon, ArrowRightIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { generateComponents } from "../utils/generateComponent";
import ProductOverview from "./ProductOverview";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addTocart } from "../redux/actions/cartAction";
import {
  addToWishList,
  removeFromWishList,
} from "../redux/slices/wishListSlice";
import { addToCart } from "../redux/slices/cartSlice";

const ProductCard = ({ item, seller, isShop }) => {
  const { wishList } = useSelector((state) => state.wishList);
  const { cart } = useSelector((state) => state.cart);
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (wishList && wishList.find((i) => i._id === item._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishList]);

  const removeFromWishListHandler = (item) => {
    setClick(!click);
    dispatch(removeFromWishList(item));
  };

  const addToWishListHandler = (item) => {
    setClick(!click);
    dispatch(addToWishList(item));
  };

  const addToCartHandler = (id) => {
    const isItemExists = cart && cart.find((i) => i._id === id);
    if (isItemExists) {
      toast.error("Item already in cart");
    } else {
      const cartData = { ...item, qty: 1 };
      dispatch(addToCart(cartData));
      toast.success("Item added to cart");
    }
  };

  return (
    <div className=" group w-full hover:shadow-md rounded-t-xl  bg-white flex flex-col">
      <div className=" shadow rounded-t-xl border-0.5 relative h-0 overflow-hidden pb-[63.25%]">
        <Link to={`/product/${item?._id}`}>
          <img
            className="absolute inset-0 w-full h-full  overflow-clip object-contain"
            src={`${item?.images && item.images[0]?.url}`}
            alt=""
          />
        </Link>
        {click ? (
          <button
            className={`group-hover:animate-bounce group-hover:opacity-100 sm:opacity-0  absolute top-3 right-3 border p-1 rounded-full hover:shadow-lg transition-all duration-300 ease-linear delay-0`}
          >
            <HeartIcon
              className={` fill-pink-600 stroke-none w-5 h-5 `}
              title="Add to wishlist"
              onClick={() => removeFromWishListHandler(item)}
            />
          </button>
        ) : (
          <button
            className={`group-hover:animate-bounce group-hover:opacity-100 sm:opacity-0  absolute top-3 right-3 border p-1 rounded-full hover:shadow-lg transition-all duration-300 ease-linear delay-0`}
          >
            <HeartIcon
              className={` w-5 h-5 stroke-2 `}
              title="Add to wishlist"
              onClick={() => addToWishListHandler(item)}
            />
          </button>
        )}
        <button
          className={` hidden md:block group-hover:opacity-100  sm:opacity-0  absolute left-3 font-Ubuntu right-3 bottom-3 border p-1 text-center rounded-full hover:shadow-lg transition-all duration-300 ease-linear delay-0`}
          onClick={() => setOpen(!open)}
        >
          quick view
        </button>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/shop/${seller?._id}`}>
          <div className="flex font-Ubuntu mb-2 font-semibold items-center gap-2.5 ">
            <img
              className="w-[26px] h-[26px]  object-cover rounded-full "
              src={`${seller?.avatar && seller?.avatar?.url}`}
              alt=""
            />
            <span className="text-sm">{seller?.shopname}</span>
          </div>
        </Link>
        <p className="line-clamp-2 font-light text-sm font-Source">
          {item.name}
        </p>
        <div className=" items-baseline justify-between  border-b-[0.5px] border-gray-300">
          {/* <div className="flex items-center gap-1.5">
            {generateComponents(item.rating, <StarIcon className="w-4 h-4" />)}
          </div> */}
          <div className="flex items-center gap-1">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={`
                  ${item?.rating > rating ? "text-gray-900" : "text-gray-200"} 
                  "h-4 w-4 flex-shrink-0"
                `}
                aria-hidden="true"
              />
            ))}
          </div>

          {/* <span className="text-base font-Source">{item.rating}</span> */}
          <div className="flex items-center gap-3">
            <h4 className={`text-lg font-semibold font-Source`}>
              $
              {item?.discountedPrice
                ? item?.discountedPrice
                : item?.originalPrice}
            </h4>
            {item?.discountedPrice && item?.originalPrice && (
              <h3 className=" line-through text-gray-600 font-Source">
                ${item?.originalPrice}
              </h3>
            )}
          </div>
          <h2 className=" whitespace-nowrap font-Ubuntu">
            {item?.sold_out} Sold
          </h2>
        </div>

        <div className=" mt-2 flex items-center justify-between">
          <button
            className={` py-3 px-4 lg:py-3 lg:px-4 flex items-center gap-3 rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow bg-transparent text-sm font-medium max-w-max hover:gap-5 hover:bg-black hover:text-white  transition-all duration-300 ease-linear delay-0`}
            onClick={() => addToCartHandler(item._id)}
          >
            + Add to cart
            <ArrowRightIcon className=" w-4 h-4  " />
          </button>
        </div>
      </div>
      {open ? (
        <ProductOverview
          open={open}
          seller={seller}
          setOpen={setOpen}
          item={item}
        />
      ) : null}
    </div>
  );
};

export default ProductCard;
