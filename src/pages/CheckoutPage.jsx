import React from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Checkout from "../components/checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div>
      <CheckoutSteps active={1} />
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
