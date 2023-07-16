import React from "react";
import CheckoutSteps from "../components/checkout/CheckoutSteps";
import Payment from "../components/payment/Payment.jsx";

const PaymentPage = () => {
  return (
    <div className="w-full min-h-screen">
      <CheckoutSteps active={2} />
      <Payment />
    </div>
  );
};

export default PaymentPage;
