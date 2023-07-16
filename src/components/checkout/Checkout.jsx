import React, { useState } from "react";
import styles from "../../styles/styles";
import { Country, State } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { axiosInstanceJsonDataWithCredentials } from "../../utils/axiosInstance";
import { ArrowLeftIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [state, setState] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const navigate = useNavigate();

  console.log(userInfo);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      state === "" ||
      streetAddress === "" ||
      zipCode === null ||
      country === "" ||
      city === ""
    ) {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        state,
        streetAddress,
        zipCode,
        country,
        city,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/app/payment");
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) =>
      acc +
      item.qty *
        (item.discountedPrice ? item.discountedPrice : item.originalPrice),
    0
  );

  // this is shipping cost variable
  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    try {
      const response = await axiosInstanceJsonDataWithCredentials.get(
        `/coupons/get-coupon-value/${name}`
      );
      const couponCodeData = response.data.couponCode;
      console.log(couponCodeData);

      if (couponCodeData) {
        const shopId = couponCodeData.shopId;
        const couponCodeValue = couponCodeData.value;

        //Products that are eligible for discount with the coupon code,
        //In this case, products that are of the same shopId as the coupon

        const eligibleProducts = cart.filter(
          (item) => item.shopId._id === shopId
        );

        if (eligibleProducts.length === 0) {
          toast.error("Coupon code is not valid for this shop");
        } else {
          const eligiblePrice = eligibleProducts.reduce(
            (acc, item) =>
              acc +
              item.qty *
                (item.discountedPrice
                  ? item.discountedPrice
                  : item.originalPrice),
            0
          );

          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(couponCodeData);
          setCouponCode("");
        }
      } else {
        toast.error("Coupon code doesn't exist!");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  const discountPercentage = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  console.log(discountPercentage);

  return (
    <div className={` ${styles.section} px-4 lg:px-12`}>
      <div className="w-full flex flex-col py-4">
        <Link
          to={`/`}
          className=" font-Ubuntu sm:px-5 pb-6 items-center gap-2 flex cursor-pointer"
        >
          <ArrowLeftIcon className="w-4 h-4 stroke-2" />
          <h1 className=" font-semibold">Back to shopping</h1>
        </Link>
        <div className="w-full lg:flex">
          <div className="w-full lg:w-9/12">
            <ShippingInfo
              user={user}
              country={country}
              setCountry={setCountry}
              city={city}
              setCity={setCity}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              state={state}
              setState={setState}
              streetAddress={streetAddress}
              setStreetAddress={setStreetAddress}
              zipCode={zipCode}
              setZipCode={setZipCode}
            />
          </div>
          <div className="w-full lg:w-3/12 lg:mt-0 mt-8">
            <CartData
              handleSubmit={handleSubmit}
              totalPrice={totalPrice}
              shipping={shipping}
              subTotalPrice={subTotalPrice}
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              discountPercentage={discountPercentage}
            />
          </div>
        </div>
        <div className=" font-Ubuntu lg:w-5/12">
          <button
            className=" bg-black w-full  text-white group hover:scale-y-105 hover:shadow-xl border-2 border-black mt-6 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
            onClick={paymentSubmit}
          >
            <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
              Go to Payment <span aria-hidden="true">&rarr;</span>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  state,
  setState,
  streetAddress,
  setStreetAddress,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full lg:w-[95%] bg-pink-50 py-4 rounded-2xl shadow-lg font-Ubuntu px-5 pb-8">
      <h5 className=" text-3xl sm:text-4xl font-semibold mb-4">
        Shipping Address
      </h5>
      <form className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
        <div className=" sm:col-span-4">
          <label className=" font-semibold pb-2">Full Name</label>
          <input
            type="text"
            value={user && user.fullname}
            required
            className={`${styles.input}`}
            readOnly
          />
        </div>
        <div className=" sm:col-span-4">
          <label className="font-semibold pb-2">Email Address</label>
          <input
            type="email"
            value={user && user.email}
            required
            className={`${styles.input}`}
            readOnly
          />
        </div>

        <div className=" sm:col-span-4">
          <label className="font-semibold pb-2">Phone Number</label>
          <input
            type="number"
            required
            value={user && user.phoneNumber}
            className={`${styles.input} `}
            readOnly
          />
        </div>
        <div className=" sm:col-span-4">
          <label className="font-semibold pb-2">Zip Code</label>
          <input
            type="number"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            required
            className={`${styles.input}`}
          />
        </div>
        <div className=" sm:col-span-3">
          <label className="font-semibold pb-2">Country</label>
          <select
            className=" appearance-none w-full border p-[5px] rounded-[5px]"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option className="block pb-2" value="">
              Choose your country
            </option>
            {Country &&
              Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className=" sm:col-span-3">
          <label className="font-semibold pb-2">State</label>
          <select
            className=" appearance-none p-[5px] w-full border rounded-[5px]"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option className=" block font-semibold pb-2" value="">
              Choose your City
            </option>
            {State &&
              State.getStatesOfCountry(country).map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
          </select>
        </div>

        <div className=" sm:col-span-2">
          <label className="font-semibold pb-2">City</label>
          <input
            type="address"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className={`${styles.input}`}
          />
        </div>

        <div className="col-span-full">
          <label className="font-semibold pb-2">Street Address</label>
          <input
            type="address"
            required
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            className={`${styles.input} `}
          />
        </div>
      </form>
      <div className=" mt-4 flex space-x-1 items-center">
        <h5
          className="text-base font-semibold cursor-pointer inline-block"
          onClick={() => setUserInfo(!userInfo)}
        >
          Choose From saved address
        </h5>
        <ChevronUpDownIcon className=" w-5 h-5 stroke-[3]" />
      </div>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1" key={index}>
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setState(item.state) ||
                    setStreetAddress(item.streetAddress) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-pink-50 rounded-2xl shadow-lg font-Ubuntu p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentage ? "$" + discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <button
          className=" bg-indigo-600 w-full text-white group hover:scale-y-105 hover:shadow-xl border-2 border-indigo-600  mt-6 font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
          type="submit"
        >
          <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
            Confirm <span aria-hidden="true">&rarr;</span>
          </p>
        </button>
      </form>
    </div>
  );
};

export default Checkout;
