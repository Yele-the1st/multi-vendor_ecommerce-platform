import {
  BanknotesIcon,
  Cog8ToothIcon,
  CubeIcon,
  DocumentPlusIcon,
  EnvelopeIcon,
  FolderPlusIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
  Square3Stack3DIcon,
  SwatchIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { Link } from "react-router-dom";

const DashboardSideBar = ({ active }) => {
  return (
    <div className=" transition-all whitespace-nowrap duration-300 ease-in-out group/full w-full h-[calc(100vh-87px)] font-Ubuntu overflow-y-scroll bg-white shadow-lg sticky top-0 left-0 z-10 py-6  ">
      {/* single item */}
      <div className="space-y-2 ">
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/dashboard`}
            className={` ${
              active === 1
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <Square3Stack3DIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Dashboard
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/dashboard`}
            className={` ${
              active === 2
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <ShoppingBagIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>Orders</h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/shop-products`}
            className={` ${
              active === 3
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <CubeIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Products
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/create-product`}
            className={` ${
              active === 4
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <FolderPlusIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Create Product
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/shop-events`}
            className={` ${
              active === 5
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <SwatchIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>Events</h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/create-event`}
            className={` ${
              active === 6
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <DocumentPlusIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Create Events
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/withdraw-money`}
            className={` ${
              active === 7
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <BanknotesIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Withdraw Money
            </h5>
          </Link>
        </div>

        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/withdraw-money`}
            className={` ${
              active === 8
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <EnvelopeIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>Inbox</h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/shop-coupons`}
            className={` ${
              active === 9
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <TicketIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Discount Codes
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center px-3 ">
          <Link
            to={`/shop/withdraw-money`}
            className={` ${
              active === 10
                ? "bg-pink-200 shadow-lg"
                : "group/single hover:bg-pink-50"
            }   rounded-2xl py-2 px-3 w-full flex items-center`}
          >
            <ReceiptRefundIcon className={` w-6 h-6 `} />
            <h5 className={` px-3 hidden lg:group-hover/full:block`}>
              Refunds
            </h5>
          </Link>
        </div>
      </div>
      <div className="w-full mt-20 flex items-center px-3 ">
        <Link
          to={`/shop/withdraw-money`}
          className={` ${
            active === 11
              ? "bg-pink-200 shadow-lg"
              : "group/single hover:bg-pink-50"
          }   rounded-2xl py-2 px-3 w-full flex items-center`}
        >
          <Cog8ToothIcon className={` w-6 h-6 `} />
          <h5 className={` px-3 hidden lg:group-hover/full:block`}>Settings</h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSideBar;
