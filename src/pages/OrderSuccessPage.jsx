import React, { useEffect, useRef } from "react";
import animationData from "../assets/animations/animation_ljzr1rmg.json";
import Lottie from "lottie-web";

const OrderSuccessPage = () => {
  let animationContainer = useRef();
  useEffect(() => {
    Lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animationData,
    });
  }, []);
  return (
    <>
      <div
        className="w-full h-[300px] flex items-center justify-center "
        ref={animationContainer}
      ></div>
      <h5 className=" font-Ubuntu text-center mb-14 text-xl font-bold">
        Your order is successful ✓
      </h5>
    </>
  );
};

export default OrderSuccessPage;
