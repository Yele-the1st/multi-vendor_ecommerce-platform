import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

const Carousel = ({ children, name: title }) => {
  const sliderRef = useRef();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
    <div className=" mx-3 justify-center pt-[90px] pb-[20px] lg:pb-[45px]">
      <div className="relative mx-auto max-w-[1200px]  ">
        <h1 className="text-3xl sm:text-4xl font-Ubuntu font-bold inline-block my-5  ml-4">
          {title}
        </h1>
        <Slider {...slickSettings} ref={sliderRef}>
          {children}
        </Slider>
        <div className="absolute top-1/2 left-[-15px] z-10">
          <button
            className="bg-white rounded-full p-2 text-black focus:outline-none h-12 w-12 flex items-center justify-center shadow"
            onClick={handlePrevClick}
          >
            <ChevronLeftIcon className="h-6 w-6 stroke-current stroke-2" />
          </button>
        </div>
        <div className="absolute top-1/2 right-[-15px]  z-10">
          <button
            className="bg-white rounded-full p-2 text-black focus:outline-none h-12 w-12 flex items-center justify-center shadow"
            onClick={handleNextClick}
          >
            <ChevronRightIcon className="h-6 w-6 stroke-current stroke-2 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
