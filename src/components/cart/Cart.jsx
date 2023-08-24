import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/styles";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";

const Cart = ({ setOpenCart, openCart }) => {
  const { cart } = useSelector((state) => state.cart);
  // const price = cart.discountedPrice
  //   ? cart.discountedPrice
  //   : cart.originalPrice;

  const dispatch = useDispatch();

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
  };

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.qty *
        (item.discountedPrice ? item.discountedPrice : item.originalPrice),
    0
  );

  const quantityChangeHandler = (data) => {
    dispatch(addToCart(data));
  };

  return (
    <div className=" relative z-20">
      <div
        className="fixed inset-0 transition-opacity bg-opacity-7  backdrop-filter backdrop-blur-sm "
        onClick={() => setOpenCart(false)}
      ></div>

      <div class=" fixed inset-y-0 right-0 overflow-hidden  flex max-w-full pl-10">
        {/* Slide-over panel */}
        <div
          className={`pointer-events-auto w-screen max-w-md transform transition-all ease-in-out duration-500 sm:duration-700  ${
            openCart ? "translate-x-0" : "translate-x-full "
          }`}
        >
          <div className="flex h-screen flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 h-full  px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-xl font-Ubuntu font-semibold whitespace-nowrap text-gray-900"
                  id="slide-over-title"
                >
                  Shopping cart
                </h2>
                <div
                  className=" flex w-full justify-end -m-2 p-2 cursor-pointer"
                  onClick={() => setOpenCart(false)}
                >
                  <XMarkIcon className="w-6 h-6 stroke-[3]" />
                </div>
              </div>
              {/* item length */}
              <div className={`${styles.noramlFlex} py-4`}>
                <ShoppingBagIcon className="w-7 h-7 text-pink-600" />
                <h5 className=" font-Ubuntu pl-2 font-medium whitespace-nowrap flex items-center justify-center">
                  {cart && cart.length}
                  <span className="ml-1">Items</span>
                </h5>
              </div>
              {/* cart single items */}
              {cart && cart.length === 0 ? (
                <div className=" h-[calc(100vh-360px)] overflow-y-scroll  w-full mt-8 flow-root">
                  <div className=" font-Ubuntu text-lg font-semibold flex h-full justify-center flex-col items-center">
                    No Item in cart
                  </div>
                </div>
              ) : (
                <>
                  <div className=" h-[calc(100vh-360px)] overflow-y-scroll  w-full mt-8 flow-root">
                    <div className=" overflow-y-auto  -my-6 divide-y divide-gray-200">
                      {cart &&
                        cart.map((i, index) => (
                          <CartSingle
                            setOpenCart={setOpenCart}
                            key={index}
                            data={i}
                            quantityChangeHandler={quantityChangeHandler}
                            removeFromCartHandler={removeFromCartHandler}
                          />
                        ))}
                    </div>
                  </div>

                  <div className=" font-Ubuntu border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between mb-2 text-base font-semibold text-gray-900">
                      <p>Subtotal</p>
                      <p>${totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <Link
                        to="/app/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        onClick={() => setOpenCart(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500 ml-1"
                          onClick={() => setOpenCart(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSingle = ({ data, quantityChangeHandler, removeFromCartHandler }) => {
  const [count, setCount] = useState(data && data.qty);
  const price = data.discountedPrice
    ? data.discountedPrice
    : data.originalPrice;
  // const totalPrice = count * price;

  const decrementCount = (data) => {
    if (count > 1) {
      setCount(count - 1);
      const updatedCartData = { ...data, qty: count - 1 };
      quantityChangeHandler(updatedCartData);
    }
  };
  const incrementCount = (data) => {
    if (data.stock > data.qty) {
      setCount(count + 1);
      const updatedCartData = { ...data, qty: count + 1 };
      quantityChangeHandler(updatedCartData);
    } else {
      toast.error("Item stock is limited");
    }
  };
  return (
    <div className=" font-Ubuntu flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={`${data.images && data.images[0]?.url}`}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className=" text-sm font-medium">
              <Link to={``}>{data.name}</Link>
            </h3>
            <p className="ml-4 text-base font-semibold">
              $
              {data.discountedPrice ? data.discountedPrice : data.originalPrice}
              <span className="ml-4 text-sm">QTY({data.qty})</span>
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{data.description}</p>
        </div>
        <div className="flex mt-1 flex-1 items-end justify-between text-sm">
          <div>
            <button
              className=" bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold rounded-l px-2 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
              onClick={() => decrementCount(data)}
            >
              -
            </button>
            <span className="bg-gray-200 text-gray-800 font-medium px-2 py-1.5">
              {data && data.qty}
            </span>
            <button
              className=" bg-gradient-to-r from-pink-600 to-pink-500 text-white font-bold rounded-r px-2 py-1 shadow-lg hover:opacity-75 transition duration-300 ease-in-out "
              onClick={() => incrementCount(data)}
            >
              +
            </button>
          </div>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => removeFromCartHandler(data)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;
