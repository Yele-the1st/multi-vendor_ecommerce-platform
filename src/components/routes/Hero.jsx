import React from "react";
import styles from "../../styles/styles";
import image from "../../assets/images/pexels-george-dolgikh-1666067-removebg-preview.png";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Hero = () => {
  return (
    <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
      <div className="relative h-full w-full rounded-3xl py-6 shadow-lg flex items-center  ">
        <div
          className="absolute inset-x-0 -top-30 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-90"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[92.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className=" flex  w-full px-10 rounded-2xl items-center ">
          <div className="">
            <h1 className="text-5xl tracking-wide font-Ubuntu text-black font-bold mb-2.5">
              Simplify your shopping experience..
            </h1>
            <p className="text-base tracking-wide font-Source font-light mb-2.5">
              Discover the convenience of finding everything you need in one
              place, sourced from different vendors who are passionate about
              delivering exceptional products.
            </p>
            <button
              className={`py-3 px-4 flex items-center gap-3 rounded-xl font-Ubuntu cursor-pointer shadow bg-transparent  mt-5 text-lg font-medium max-w-max hover:gap-5 hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0`}
            >
              Get Started
              <ArrowRightIcon className=" w-4 h-4 stroke-2 " />
            </button>
          </div>
        </div>
        <div className=" hidden lg:flex relative justify-center items-center ">
          <img className="" src={image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
