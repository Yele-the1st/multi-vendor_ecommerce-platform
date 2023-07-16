import React, { useEffect, useState } from "react";
import {
  axiosInstanceJsonDataWithCredentials,
  backend_url,
} from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import {
  BookmarkIcon,
  BuildingOffice2Icon,
  BuildingOfficeIcon,
  GlobeEuropeAfricaIcon,
  MapPinIcon,
  HomeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import {
  CameraIcon,
  ArrowLeftIcon,
  UserIcon,
  ArrowRightIcon,
  ViewfinderCircleIcon,
  TrashIcon,
  CubeIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  ReceiptPercentIcon,
  TicketIcon,
  XMarkIcon,
  ArrowsPointingInIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import {
  deleteUserAddress,
  updateUserAddress,
  updateUserInfo,
} from "../../redux/actions/userAction";
import { toast } from "react-toastify";
import { City, Country, State } from "country-state-city";
import styles from "../../styles/styles";
import { getUserOrders } from "../../redux/actions/orderAction";

const ProfileContent = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [about, setAbout] = useState(user?.about || "");
  const [avatar, setAvatar] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("fullname", fullname);
    newForm.append("about", about);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("id", user._id);

    for (const entry of newForm.entries()) {
      console.log(entry);
    }

    dispatch(updateUserInfo(newForm));
    toast.success("Successfully updated user info");
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
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
                            value={fullname}
                            onChange={(e) => setFullname(e.target.value)}
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
                          value={about}
                          onChange={(e) => setAbout(e.target.value)}
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
                        <div className=" h-12 w-12 rounded-full overflow-hidden">
                          {avatar ? (
                            <img
                              src={URL.createObjectURL(avatar)}
                              alt="avatar"
                              className=" h-full w-full object-cover"
                            />
                          ) : (
                            <img
                              src={`${backend_url}${
                                user?.avatar && user?.avatar
                              }`}
                              alt="avatar"
                              className=" h-full w-full object-cover"
                            />
                            // <UserCircleIcon
                            //   className="h-12 w-12 text-gray-300"
                            //   aria-hidden="true"
                            // />
                          )}
                        </div>
                        <label
                          type="button"
                          className=" cursor-pointer rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <span>Change</span>
                          <input
                            type="file"
                            name="avatar"
                            id="file-input"
                            accept=".jpg,.jpeg,.png"
                            onChange={handleFileInputChange}
                            className=" sr-only"
                          />
                        </label>
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
          <ChangePassword />
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
  const { userOrders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders(user._id));
  }, []);
  console.log(userOrders);

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

  userOrders &&
    userOrders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "US$ " + item.totalPrice,
        status: item.status,
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

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axiosInstanceJsonDataWithCredentials
      .put(`/users/update-user-password`, {
        oldPassword,
        newPassword,
        confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className=" rounded-xl cursor-pointer mt-8 w-[95%] bg-black px-3 py-2.5 font-semibold text-white shadow-sm hover:scale-y-105 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields");
    } else {
      //
      dispatch(
        updateUserAddress({
          country,
          state,
          city,
          streetAddress,
          zipCode,
          addressType,
        })
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setStreetAddress("");
      setState("");
      setZipCode("");
      setAddressType("");
    }
  };
  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

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
        <button
          className="mb-1 font-medium whitespace-nowrap py-3 px-8 shadow-md  rounded-xl bg-[#f6f6f4] text-black hover:bg-black hover:text-white transition-all duration-300 ease-linear delay-0"
          onClick={() => setOpen(true)}
        >
          Add New
        </button>
      </div>
      {user && user.addresses.length === 0 ? (
        <div className=" sm:text-center pt-8">
          <h5 className=" font-Ubuntu font-semibold text-base">
            You currently do not have any Saved address
          </h5>
        </div>
      ) : null}
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full mt-10 bg-white max-h-max max-w-max lg:max-w-full space-y-2 lg:space-x-4 lg:space-y-0 rounded-2xl flex flex-col lg:flex-row  lg:items-center p-3 shadow justify-between pr-10  "
            key={index}
          >
            {item.addressType === "Default" ? (
              <div className="flex gap-2 items-center">
                <BookmarkIcon className="w-6 h-6" />
                <h5 className=" font-semibold ">{item.addressType}</h5>
              </div>
            ) : item.addressType === "Home" ? (
              <div className="flex gap-2 items-center">
                <HomeIcon className="w-6 h-6" />
                <h5 className=" font-semibold ">{item.addressType}</h5>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <BuildingOfficeIcon className="w-6 h-6" />
                <h5 className=" font-semibold ">{item.addressType}</h5>
              </div>
            )}
            <div className=" flex items-center">
              <h6>{item.city}</h6>
            </div>
            <div className="flex items-center">
              <h6>{item.streetAddress} </h6>
            </div>
            <div
              className=" shrink-0 cursor-pointer flex  lg:items-center justify-end  lg:justify-between lg:pl-8"
              onClick={() => handleDelete(item)}
            >
              <div className=" hover:bg-pink-200 hover:scale-110 p-2 rounded-2xl hover:shadow-lg ">
                <TrashIcon className="w-6 h-6 " />
              </div>
            </div>
          </div>
        ))}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center z-30">
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
                  Add New Address
                </h2>
              </div>
              <div className="h-full overflow-x-hidden overflow-y-scroll sm:mx-auto font-Ubuntu sm:max-w-lg ">
                <form className="" onSubmit={handleSubmit} aria-required={true}>
                  <div className=" grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-8">
                    <div className="col-span-full">
                      <label
                        htmlFor="country"
                        className="block font-medium leading-6 text-gray-900"
                      >
                        Country
                        <span className=" text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                          <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                            <GlobeEuropeAfricaIcon className=" w-5 h-5" />
                          </span>
                          <select
                            name="category"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          >
                            <option value={`Choose a category`}>
                              Choose a country
                            </option>
                            {Country &&
                              Country.getAllCountries().map((i) => (
                                <option value={i.isoCode} key={i.isoCode}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="country"
                        className="block font-medium leading-6 text-gray-900"
                      >
                        State
                        <span className=" text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                          <select
                            name="category"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          >
                            <option value={`Choose a State`}>
                              Choose a State
                            </option>
                            {State &&
                              State.getStatesOfCountry(country).map((i) => (
                                <option value={i.isoCode} key={i.isoCode}>
                                  {i.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                          <input
                            type="text"
                            value={city}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            onChange={(e) => setCity(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="username"
                        className="block font-medium leading-6 text-gray-900"
                      >
                        Street Address
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                          <input
                            type="text"
                            value={streetAddress}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            onChange={(e) => setStreetAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="username"
                        className="block font-medium leading-6 text-gray-900"
                      >
                        Zip Code
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                          <input
                            type="text"
                            value={zipCode}
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                            onChange={(e) => setZipCode(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="country"
                        className="block font-medium leading-6 text-gray-900"
                      >
                        Address Type
                        <span className=" text-red-500">*</span>
                      </label>
                      <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-lg">
                          <span className="flex select-none items-center pl-3 text-gray-900 sm:text-sm">
                            <MapPinIcon className=" w-5 h-5" />
                          </span>
                          <select
                            name="category"
                            value={addressType}
                            onChange={(e) => setAddressType(e.target.value)}
                            className="block flex-1 border-0 bg-transparent py-2.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          >
                            <option value={`Choose an address type`}>
                              Choose Type
                            </option>
                            {addressTypeData &&
                              addressTypeData.map((i, index) => (
                                <option value={i.name} key={index}>
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
                          Submit
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
  );
};

export default ProfileContent;
