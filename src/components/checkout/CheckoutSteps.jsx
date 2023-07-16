import React from "react";
import styles from "../../styles/styles";
import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";

const CheckoutSteps = ({ active }) => {
  console.log(active);
  return (
    <div className={` ${styles.section} px-4 lg:px-12`}>
      <div className="py-4 sm:py-6">
        <ol className="flex font-Ubuntu font-semibold items-center w-full p-3 space-x-2 text-sm text-center  bg-white border border-gray-200 rounded-lg shadow-sm sm:text-base  sm:p-4 sm:space-x-4">
          <li className="flex items-center text-pink-600 ">
            <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-pink-600 rounded-full shrink-0">
              1
            </span>
            Shipping <span className="hidden sm:inline-flex sm:ml-2">Info</span>
            <ChevronDoubleRightIcon className=" ml-3 w-6 h-6" />
          </li>
          <li
            className={`flex items-center ${
              active > 1 ? "text-pink-600 " : null
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
                active > 1 ? "border-pink-600 " : "border-gray-500"
              }  rounded-full shrink-0 `}
            >
              2
            </span>
            Payment <span className="hidden sm:inline-flex sm:ml-2">Info</span>
            <ChevronDoubleRightIcon className=" ml-3 w-6 h-6" />
          </li>
          <li
            className={`flex items-center ${
              active > 2 ? "text-pink-600 " : null
            }`}
          >
            <span
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
                active > 2 ? "border-pink-600 " : "border-gray-500"
              }  rounded-full shrink-0 `}
            >
              3
            </span>
            Success
          </li>
        </ol>
      </div>
    </div>
  );
};

export default CheckoutSteps;
