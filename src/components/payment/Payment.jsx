import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useEffect } from "react";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";
import axios from "axios";

import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import {
  axiosInstanceJsonData,
  axiosInstanceJsonDataWithCredentials,
} from "../../utils/axiosInstance";

const Payment = () => {
  const [orderData, setOrderData] = useState([]);
  const [open, setOpen] = useState(false);
  const [wait, setWait] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  const order = {
    cart: orderData?.cart,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstanceJsonDataWithCredentials.post(
        `/payments/process`,
        paymentData
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymnentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          };

          await axiosInstanceJsonDataWithCredentials
            .post(`/orders/create-order`, order)
            .then((res) => {
              setOpen(false);
              navigate("/order/success");
              // toast.success("Order successful!");
              localStorage.setItem("cartItems", JSON.stringify([]));
              localStorage.setItem("latestOrder", JSON.stringify([]));
              setWait(false);
              window.location.reload();
            });
        }
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axiosInstanceJsonDataWithCredentials
      .post(`/orders/create-order`, order)
      .then((res) => {
        setOpen(false);
        navigate("/order/success");
        // toast.success("Order successful!");
        localStorage.setItem("cartItems", JSON.stringify([]));
        localStorage.setItem("latestOrder", JSON.stringify([]));
      });
  };

  return (
    <div className={` ${styles.section} px-4 lg:px-12`}>
      <div className="w-full font-Ubuntu flex flex-col py-4">
        <Link
          to={`/`}
          className=" font-Ubuntu sm:px-5 pb-6 items-center gap-2 flex cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4 stroke-2" />
          <h1 className=" font-semibold">Back to shopping</h1>
        </Link>
        <div className="w-full lg:flex">
          <div className="w-full lg:w-9/12">
            <PaymentInfo
              user={user}
              open={open}
              wait={wait}
              setWait={setWait}
              setOpen={setOpen}
              paymentHandler={paymentHandler}
              cashOnDeliveryHandler={cashOnDeliveryHandler}
            />
          </div>
          <div className="w-full lg:w-3/12 lg:mt-0 mt-8">
            <CartData orderData={orderData} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  setWait,
  wait,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full lg:w-[95%] bg-pink-50 rounded-2xl shadow-lg p-5 pb-8">
      {/* select buttons */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Debit/credit card
          </h4>
        </div>

        {/* pay with card */}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Name On Card</label>
                  <input
                    required
                    placeholder={user && user.fullname}
                    className={`${styles.input} h-[35px]  !w-[95%] text-black`}
                    defaultValue={user && user.fullname}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">Exp Date</label>
                  <CardExpiryElement
                    className={`${styles.input} h-[35px] w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",

                          color: "black",
                          fontFamily: "'Ubuntu Mono', monospace",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "black",
                          },
                          fontFamily: "'Ubuntu Mono', monospace",
                        },
                      },
                    }}
                  />
                </div>
              </div>

              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Card Number</label>
                  <CardNumberElement
                    className={`${styles.input} h-[35px] w-[95%]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",

                          color: "black",
                          fontFamily: "'Ubuntu Mono', monospace",
                        },
                        empty: {
                          color: "#3a120a",
                          fontFamily: "'Ubuntu Mono', monospace",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "black",
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div className="w-[50%]">
                  <label className="block pb-2">CVV</label>
                  <CardCvcElement
                    className={`${styles.input} !h-[35px]`}
                    options={{
                      style: {
                        base: {
                          fontSize: "19px",

                          color: "black",
                          fontFamily: "'Ubuntu Mono', monospace",
                        },
                        empty: {
                          color: "#3a120a",
                          backgroundColor: "transparent",
                          "::placeholder": {
                            color: "black",
                            fontFamily: "'Ubuntu Mono', monospace",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
              <button
                className={` ${
                  wait
                    ? "bg-gray-100 border-gray-100 cursor-not-allowed"
                    : "bg-black border-black"
                }  text-white group hover:scale-y-105 hover:shadow-xl border-2  mb-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out`}
                type="submit"
                onClick={() => setWait(true)}
              >
                <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                  Submit <span aria-hidden="true">&rarr;</span>
                </p>
              </button>
            </form>
          </div>
        ) : null}
      </div>

      <br />
      {/* paypal payment */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Pay with Paystack
          </h4>
        </div>

        {/* pay with payement */}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <button
              className=" bg-black text-white group hover:scale-y-105 hover:shadow-xl border-2 border-black my-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
              onClick={() => setOpen(true)}
            >
              <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                Pay Now <span aria-hidden="true">&rarr;</span>
              </p>
            </button>

            {open && (
              <div className="w-full fixed top-0 left-0 bg-[#00000039] h-screen flex items-center justify-center z-[99999]">
                <div className="w-full lg:w-[40%] h-screen lg:h-[80vh] bg-white rounded-[5px] shadow flex flex-col justify-center p-8 relative overflow-y-scroll">
                  <div className="w-full flex justify-end p-3">
                    <RxCross1
                      size={30}
                      className="cursor-pointer absolute top-3 right-3"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  {/* <PayPalScriptProvider
                    options={{
                      "client-id":
                        "Aczac4Ry9_QA1t4c7TKH9UusH3RTe6onyICPoCToHG10kjlNdI-qwobbW9JAHzaRQwFMn2-k660853jn",
                    }}
                  >
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      onApprove={onApprove}
                      createOrder={createOrder}
                    />
                  </PayPalScriptProvider> */}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      <br />
      {/* cash on delivery */}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1acb] rounded-full" />
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Cash on Delivery
          </h4>
        </div>

        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <button
                className=" bg-black text-white group hover:scale-y-105 hover:shadow-xl border-2 border-black my-3 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
                type="submit"
              >
                <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                  Confirm <span aria-hidden="true">&rarr;</span>
                </p>
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

const CartData = ({ orderData }) => {
  const shipping = orderData?.shipping?.toFixed(2);
  return (
    <div className="w-full bg-pink-50 shadow-lg rounded-2xl p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${orderData?.subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          {orderData?.discountPrice ? "$" + orderData.discountPrice : "-"}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        ${orderData?.totalPrice}
      </h5>
      <br />
    </div>
  );
};

export default Payment;
