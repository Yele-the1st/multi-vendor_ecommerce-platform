import React from "react";
import styles from "../../styles/styles";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";

import { Link } from "react-router-dom";
import {
  footercompanyLinks,
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <div
      className={`${styles.section} clear-both mt-10 font-Ubuntu bg-black text-white flex flex-col px-4 lg:px-12 `}
    >
      <div className="grid grid-cols-1 sm:gird-cols-3 lg:grid-cols-4 gap-10  py-16 sm:text-center">
        <ul className=" text-center sm:text-start flex sm:block flex-col items-center">
          <h1 className=" text-2xl lg:text-3xl font-fira font-extrabold text-[#E0005B] ">
            Vendorr
          </h1>
          <br />
          <p>
            Subscribe now and be the first to know about exclusive offers,
            product updates, product launches & events.
          </p>

          <div className=" flex mt-2 justify-between  p-2 w-[350px] lg:w-full border-b border-b-white uppercase">
            <div className="w-full h-10 leading-8">
              <input
                name="email"
                placeholder="EMAIL"
                type="email"
                className=" bg-transparent  z-10 h-full relative w-full text-white text-sm  "
              />
            </div>
            <button
              type="button"
              aria-label="I want in"
              className=" flex font-medium justify-center items-center"
            >
              <span className="flex gap-1 items-center whitespace-nowrap">
                Subscribe
                <ArrowRightIcon className=" w-4 h-4 stroke-2  " />
              </span>
            </button>
          </div>

          <div className="flex items-center mt-[15px]">
            <AiFillFacebook size={25} className="cursor-pointer" />
            <AiOutlineTwitter
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillInstagram
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
            <AiFillYoutube
              size={25}
              style={{ marginLeft: "15px", cursor: "pointer" }}
            />
          </div>
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Company</h1>
          {footerProductLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-pink-500 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Shop</h1>
          {footercompanyLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-pink-500 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="text-center sm:text-start">
          <h1 className="mb-1 font-semibold">Support</h1>
          {footerSupportLinks.map((link, index) => (
            <li key={index}>
              <Link
                className="text-gray-400 hover:text-pink-500 duration-300
                   text-sm cursor-pointer leading-6"
                to={link.link}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:text-start gap-10
         text-center pt-2 text-gray-400 text-sm pb-8"
      >
        <span>© 2020 Vendorr. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
        <div className="sm:block flex items-center justify-center w-full">
          <img
            src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
