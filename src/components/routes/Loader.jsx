import React, { useEffect, useRef } from "react";
import animationData from "../../assets/animations/48979-product-loader.json";
import Lottie from "lottie-web";

const Loader = () => {
  let animationContainer = useRef();
  useEffect(() => {
    Lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animationData,
    });
  }, []);
  return (
    <div
      className="w-full h-screen flex items-center justify-center "
      ref={animationContainer}
    ></div>
  );
};

export default Loader;
