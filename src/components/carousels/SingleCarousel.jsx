import React, { Children, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const SingleCarousel = ({ children }) => {
  const sliderRef = useRef();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePrevClick = () => {
    sliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    sliderRef.current.slickNext();
  };

  const slickSettings = {
    ...settings,
    speed: 1000,
    touchThreshold: 100,
    cssEase: "ease-in-out",
  };

  return (
    <div className=" h-[427px] flex relative items-center justify-center">
      <div className="absolute top-1/2 left-[-15px] transform -translate-y-1/2 z-10">
        <button
          className="bg-white rounded-full p-2 text-black focus:outline-none h-12 w-12 flex items-center justify-center shadow"
          onClick={handlePrevClick}
        >
          <ChevronLeftIcon className="h-6 w-6 stroke-current stroke-2" />
        </button>
      </div>
      <div className="absolute top-1/2 right-[-15px]  transform -translate-y-1/2 z-10">
        <button
          className="bg-white rounded-full p-2 text-black focus:outline-none h-12 w-12 flex items-center justify-center shadow"
          onClick={handleNextClick}
        >
          <ChevronRightIcon className="h-6 w-6 stroke-current stroke-2 " />
        </button>
      </div>

      <div className=" flex h-full w-full overflow-hidden relative ">
        <div className=" flex absolute z-[3] top-0 left-0 items-center justify-center h-full w-full ">
          <div className=" bg-[#f5f5f5] border border-[#efeff0] relative h-full w-full  ">
            <Slider {...slickSettings} ref={sliderRef}>
              {children}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCarousel;
