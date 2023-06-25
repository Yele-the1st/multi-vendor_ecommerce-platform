import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadShopProducts } from "../../redux/actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/base";
import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  CubeIcon,
  ReceiptPercentIcon,
  TicketIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import Loader from "../routes/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { toast } from "react-toastify";
import {
  createCoupon,
  deleteCoupon,
  loadShopCoupons,
} from "../../redux/actions/couponAction";

const ShopCoupons = () => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);
  const [value, setValue] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState("");

  const { shopProducts } = useSelector((state) => state.product);
  const {
    shopCoupons,
    loading,
    message,
    error: errorMessage,
  } = useSelector((state) => state.coupon);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadShopProducts(seller._id));
    dispatch(loadShopCoupons(seller._id));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteCoupon(id));
      dispatch(loadShopCoupons(seller._id));
      toast.success(message);
    } catch (error) {
      console.log(error);
      // Handle error if necessary
      toast.error(errorMessage);
    }
    navigate("/shop/shop-coupons");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setName("");
    setMinAmount("");
    setMaxAmount("");
    setValue("");
    setSelectedProduct("");
    setOpen(false);

    try {
      await dispatch(
        createCoupon({
          name,
          value,
          maxAmount,
          minAmount,
          selectedProduct,
          shopId: seller._id,
        })
      );
      dispatch(loadShopCoupons(seller._id));
      toast.success("Successfully created");
      navigate("/shop/shop-coupons");
    } catch (error) {
      console.log(error);
      // Handle error if necessary
      toast.error(errorMessage);
    }
  };

  const columns = [
    { field: "id", headerName: "Id", minWidth: 150, flex: 0.7 },
    {
      field: "name",
      headerName: "Coupon Code",
      minWidth: 180,
      flex: 1.4,
    },
    {
      field: "value",
      headerName: "Value",
      type: "number",
      minWidth: 100,
      flex: 0.6,
    },
    {
      field: "Delete",
      flex: 0.8,
      minWidth: 120,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => handleDelete(params.id)}>
              <TrashIcon className="w-5 h-5" />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];

  shopCoupons &&
    shopCoupons.forEach((item) => {
      row.push({
        id: item._id,
        name: item.name,
        value: item.value + " %",
        sold: 10,
      });
    });
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" w-full pt-1 mt-6 font-Ubuntu">
          <div className=" flex flex-col sm:flex-row w-full items-start sm:items-center  justify-between">
            <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
              All Coupons
            </h2>
            <button
              className="mb-6 sm:mb-0 font-medium whitespace-nowrap py-3 px-8 shadow-md  rounded-xl bg-white text-black hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0"
              onClick={() => setOpen(true)}
            >
              Create New
            </button>
          </div>
          <div>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
            {open && (
              <div className="fixed inset-0 flex items-center justify-center z-20">
                <div
                  className="fixed inset-0 bg-black opacity-50 "
                  onClick={() => setOpen(false)}
                ></div>

                <div className=" relative max-h-max bg-white shadow-2xl rounded-2xl  py-8 px-8 sm:px-10  max-w-max ">
                  {/* Modal content goes here */}
                  <div
                    className=" absolute right-1 top-1 p-2 rounded-3xl hover:bg-[#f4f4f4] cursor-pointer "
                    onClick={() => setOpen(false)}
                  >
                    <XMarkIcon className="w-6 h-6 stroke-[3]" />
                  </div>
                  <div className=" h-full w-full overflow-hidden">
                    <div className="sm-mx-auto sm:max-w-lg ">
                      <h2 className=" py-8 tracking-widest text-center text-3xl font-extrabold text-gray-900 font-Fira">
                        Create a Coupon
                      </h2>
                    </div>
                    <div className="h-full overflow-x-hidden overflow-y-scroll sm:mx-auto font-Ubuntu sm:max-w-lg ">
                      <form
                        className=""
                        onSubmit={handleSubmit}
                        aria-required={true}
                      >
                        <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
                          <div className="col-span-full">
                            <label
                              htmlFor="username"
                              className="block font-medium leading-6 text-gray-900"
                            >
                              Name <span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                                <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                                  <TicketIcon className=" w-5 h-5" />
                                </span>
                                <input
                                  type="text"
                                  name="name"
                                  required
                                  value={name}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-full">
                            <label
                              htmlFor="username"
                              className="block font-medium leading-6 text-gray-900"
                            >
                              Discount Percentage
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                                <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                                  <ReceiptPercentIcon className=" w-5 h-5" />
                                </span>
                                <input
                                  type="number"
                                  name="value"
                                  required
                                  value={value}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  onChange={(e) => setValue(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="username"
                              className="block font-medium leading-6 text-gray-900"
                            >
                              Min Amount
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                                <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                                  <ChevronDoubleDownIcon className="w-4 h-4 stroke-[3]" />
                                </span>
                                <input
                                  type="number"
                                  name="minAmount"
                                  value={minAmount}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  onChange={(e) => setMinAmount(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="username"
                              className="block font-medium leading-6 text-gray-900"
                            >
                              Max Amount
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                                <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                                  <ChevronDoubleUpIcon className=" w-4 h-4 stroke-[3]" />
                                </span>
                                <input
                                  type="number"
                                  name="maxAmount"
                                  value={maxAmount}
                                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                  onChange={(e) => setMaxAmount(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="sm:col-span-full">
                            <label
                              htmlFor="country"
                              className="block font-medium leading-6 text-gray-900"
                            >
                              Select Product
                              <span className=" text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                                <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                                  <CubeIcon className=" w-5 h-5" />
                                </span>
                                <select
                                  onChange={(e) =>
                                    setSelectedProduct(e.target.value)
                                  }
                                  name="category"
                                  value={selectedProduct}
                                  className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                >
                                  <option value={`Choose a category`}>
                                    Choose a Product
                                  </option>
                                  {shopProducts &&
                                    shopProducts.map((i) => (
                                      <option value={i.name} key={i._id}>
                                        {i.name}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className=" col-span-full">
                            <button
                              className=" w-full group bg-black hover:scale-y-105 hover:shadow-xl  text-white   font-semibold text-base rounded-2xl py-3 px-6 items-center transition-all delay-0 duration-300 ease-in-out"
                              type="submit"
                            >
                              <p className="group-hover:scale-105 transition-all delay-0 duration-300 ease-in-out">
                                Create
                              </p>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ShopCoupons;
