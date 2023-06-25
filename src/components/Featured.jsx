import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/styles";
import { productData } from "../static/data";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { loadLatestProduct } from "../redux/actions/productAction";

const Featured = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLatestProduct());
  }, [dispatch]);

  const { latestProducts } = useSelector((state) => state.product);

  return (
    <div className={` ${styles.section} mt-10 py-10 px-4 lg:px-12`}>
      <p className="mt-5 text-3xl text-center font-bold font-Ubuntu tracking-tight text-gray-900 sm:text-4xl">
        Featured Products
      </p>
      <p className="mb-8 text-xl text-center font-Source font-light tracking-wider text-gray-900 sm:text-xl">
        CHECK OUT OUR FEATURED PRODUCTS + LATEST DROPS
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-4 ">
        {latestProducts && latestProducts.length !== 0 && (
          <>
            {latestProducts &&
              latestProducts.map((i, index) => (
                <ProductCard item={i} seller={i.shopId} key={index} />
              ))}
          </>
        )}
      </div>
      <div className=" my-12 flex justify-center">
        <button
          className={` py-3 px-4 lg:py-3 lg:px-4 flex items-center gap-3 rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow bg-transparent font-medium max-w-max hover:gap-5 hover:bg-black hover:text-white  transition-all duration-300 ease-linear delay-0`}
        >
          Shop Now
          <ArrowRightIcon className=" w-4 h-4  " />
        </button>
      </div>
    </div>
  );
};

export default Featured;
