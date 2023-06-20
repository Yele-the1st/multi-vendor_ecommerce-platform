import React, { useState } from "react";
import { backend_url } from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import {
  CameraIcon,
  ArrowLeftIcon,
  UserIcon,
  ArrowRightIcon,
  ViewfinderCircleIcon,
  TrashIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.fullname);
  const [phoneNumber, setPhoneNumber] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full overflow-auto font-Ubuntu ">
      {/* profile Page */}
      {active === 1 && (
        <div className="flex flex-col justify-center w-full">
          <div className="pb-3 items-center gap-2 flex cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 stroke-2" />
            <h1 className=" font-Ubuntu font-semibold">Back to shopping</h1>
          </div>
          <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6">
            Welcome Back, <span className=" capitalize">{user.fullname}</span>
          </h2>
          <div className=""></div>
          <div>
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Profile
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful
                    what you share.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4 col-span-full">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Fullname
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            <UserIcon className="w-4 h-4" />
                          </span>
                          <input
                            type="text"
                            name="fullname"
                            required
                            autoComplete="fullname"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Johnny Depp"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="sm:col-span-4 col-span-full">
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone Number
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                          <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                            +234
                          </span>
                          <input
                            type="number"
                            name="phonenumber"
                            required
                            autoComplete="phonenumber"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="80233****"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                        <textarea
                          id="about"
                          name="about"
                          rows={3}
                          className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a few sentences about yourself. would help us when
                        recommending Products
                      </p>
                    </div>

                    <div className="col-span-3">
                      <label
                        htmlFor="photo"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Photo
                      </label>
                      <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon
                          className="h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
                        <button
                          type="button"
                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          Change
                        </button>
                      </div>
                    </div>
                    <div className="sm:col-span-3 col-span-full ">
                      <div className=" flex items-end pb-2 h-full justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:scale-y-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* order Pane */}
      {active === 2 && (
        <div className="flex flex-col justify-center w-full">
          <div className="pb-3 items-center gap-2 flex cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 stroke-2" />
            <h1 className=" font-Ubuntu font-semibold">Back to shopping</h1>
          </div>
          <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
            All Orders
          </h2>
          <AllOrders />
        </div>
      )}
      {/* Refund Pane */}
      {active === 3 && (
        <div className="flex flex-col justify-center w-full">
          <div className="pb-3 items-center gap-2 flex cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 stroke-2" />
            <h1 className=" font-Ubuntu font-semibold">Back to shopping</h1>
          </div>
          <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
            Refunds
          </h2>
          <AllRefundOrders />
        </div>
      )}
      {/* Track order Pane */}
      {active === 5 && (
        <div className="flex flex-col justify-center w-full">
          <div className="pb-3 items-center gap-2 flex cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 stroke-2" />
            <h1 className=" font-Ubuntu font-semibold">Back to shopping</h1>
          </div>
          <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
            Track Orders
          </h2>
          <TrackOrder />
        </div>
      )}
      {/* Payment Method Pane */}
      {active === 6 && (
        <div className="flex flex-col justify-center w-full">
          <PaymentMethod />
        </div>
      )}
      {/* user Address Pane */}
      {active === 7 && (
        <div className="flex flex-col justify-center w-full">
          <Address />
        </div>
      )}
    </div>
  );
};

const AllOrders = () => {
  const orders = [
    {
      _id: "7433874839843898489",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.row.status;

        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <ArrowRightIcon className=" w-6 h-6" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pt-3">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const orders = [
    {
      _id: "7433874839843898489",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.row.status;

        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <ArrowRightIcon className=" w-6 h-6" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pt-3">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const TrackOrder = () => {
  const orders = [
    {
      _id: "7433874839843898489",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 120,
      orderStatus: "Processing",
    },
  ];

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        const status = params.row.status;

        return status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <ViewfinderCircleIcon className=" w-6 h-6" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        total: "US$ " + item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <div className="pt-3">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const PaymentMethod = () => {
  return (
    <div className="w-full font-Ubuntu">
      <div className="pb-3 items-center gap-2 flex cursor-pointer">
        <ArrowLeftIcon className="w-4 h-4 stroke-2" />
        <h1 className=" font-Ubuntu font-semibold">Back to shopping</h1>
      </div>
      <div className=" flex flex-col sm:flex-row w-full items-start sm:items-center  justify-between">
        <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
          Payment Methods
        </h2>
        <button className="mb-1 font-medium whitespace-nowrap py-3 px-8 shadow-md  rounded-xl bg-[#f6f6f4] text-black hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0">
          Add New
        </button>
      </div>
      <div className="w-full mt-10 bg-white max-h-max max-w-max lg:max-w-full space-y-2 lg:space-x-4 lg:space-y-0 rounded-2xl flex flex-col lg:flex-row  lg:items-center p-3 shadow justify-between pr-10  ">
        <div className="flex items-center">
          <img
            src="https://bonik-react.vercel.app/assets/images/payment-methods/Visa.svg"
            alt=""
          />
        </div>
        <div className=" flex items-center">
          <h6>1234 **** **** ****</h6>
        </div>
        <div className="flex items-center">
          <h5 className=""> 08/2022</h5>
        </div>
        <div className=" shrink-0 cursor-pointer flex  lg:items-center justify-end  lg:justify-between ">
          <div className=" hover:bg-pink-200 hover:scale-110 p-2 rounded-2xl hover:shadow-lg ">
            <TrashIcon className="w-6 h-6 " />
          </div>
        </div>
      </div>
    </div>
  );
};
const Address = () => {
  return (
    <div className="w-full font-Ubuntu">
      <div className="pb-3 items-center gap-2 flex cursor-pointer">
        <ArrowLeftIcon className="w-4 h-4 stroke-2" />
        <h1 className=" font-Ubuntu font-semibold">Back to shopping</h1>
      </div>
      <div className=" flex flex-col sm:flex-row w-full items-start sm:items-center  justify-between">
        <h2 className=" font-Ubuntu text-3xl lg:text-5xl font-bold py-6 whitespace-nowrap">
          My Addresses
        </h2>
        <button className="mb-1 font-medium whitespace-nowrap py-3 px-8 shadow-md  rounded-xl bg-[#f6f6f4] text-black hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0">
          Add New
        </button>
      </div>
      <div className="w-full mt-10 bg-white max-h-max max-w-max lg:max-w-full space-y-2 lg:space-x-4 lg:space-y-0 rounded-2xl flex flex-col lg:flex-row  lg:items-center p-3 shadow justify-between pr-10  ">
        <div className="flex gap-2 items-center">
          <HomeIcon className="w-6 h-6" />
          <h5 className=" font-semibold ">Default</h5>
        </div>
        <div className=" flex items-center">
          <h6>478 Jordan Close, Maitama District, FCT Abuja </h6>
        </div>
        <div className="flex items-center">
          <h6>(234) 514-6335423 </h6>
        </div>
        <div className=" shrink-0 cursor-pointer flex  lg:items-center justify-end  lg:justify-between lg:pl-8">
          <div className=" hover:bg-pink-200 hover:scale-110 p-2 rounded-2xl hover:shadow-lg ">
            <TrashIcon className="w-6 h-6 " />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
