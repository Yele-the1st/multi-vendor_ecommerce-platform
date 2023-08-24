import {
  ArrowRightOnRectangleIcon,
  BanknotesIcon,
  EnvelopeIcon,
  IdentificationIcon,
  LockClosedIcon,
  LockOpenIcon,
  ReceiptRefundIcon,
  ShoppingBagIcon,
  UserIcon,
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import { logoutUser } from "../../redux/actions/userAction";

const ProfileSidebar = ({ active, setActive }) => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("logged out Successfully");
  };
  return (
    <div className=" transition-all duration-300 ease-in-out whitespace-nowrap w-full h-full flex flex-col font-Ubuntu bg-white rounded-3xl px-3 lg:px-6 py-4  shadow-lg pt-8">
      <div
        className={` ${
          active === 1 ? "bg-pink-200 shadow-lg rounded-2xl p-2" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => setActive(1)}
      >
        <UserIcon className={` ${active === 1 ? " scale-110" : ""} w-6 h-6 `} />
        <span
          className={`${
            active === 1 ? "scale-110 " : ""
          } pl-3 hidden lg:block `}
        >
          profile
        </span>
      </div>
      <div
        className={` ${
          active === 2 ? "bg-pink-200 rounded-2xl p-2 shadow-lg" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => setActive(2)}
      >
        <ShoppingBagIcon
          className={` ${active === 2 ? "scale-110" : "text-black"} w-6 h-6 `}
        />
        <span
          className={`${active === 2 ? "scale-110" : ""} pl-3 hidden lg:block`}
        >
          Orders
        </span>
      </div>
      <div
        className={` ${
          active === 3 ? "bg-pink-200 rounded-2xl p-2 shadow-lg" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => setActive(3)}
      >
        <ReceiptRefundIcon
          className={` ${active === 3 ? "scale-110" : "text-black"} w-6 h-6 `}
        />
        <span
          className={`${active === 3 ? "scale-110" : ""} pl-3 hidden lg:block`}
        >
          Refunds
        </span>
      </div>
      <div
        className={` ${
          active === 4 ? "bg-pink-200 rounded-2xl p-2 shadow-lg" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => navigate("/app/messages")}
      >
        <EnvelopeIcon
          className={` ${active === 4 ? "scale-110" : "text-black"} w-6 h-6 `}
        />
        <span
          className={`${active === 4 ? "scale-110" : ""} pl-3 hidden lg:block`}
        >
          Indox
        </span>
      </div>
      <div
        className={` ${
          active === 5 ? "bg-pink-200 rounded-2xl p-2 shadow-lg" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => setActive(5)}
      >
        <ViewfinderCircleIcon
          className={` ${active === 5 ? "scale-110" : "text-black"} w-6 h-6 `}
        />
        <span
          className={`${active === 5 ? "scale-110" : ""} pl-3 hidden lg:block`}
        >
          Track Order
        </span>
      </div>
      <div
        className={` ${
          active === 6 ? "bg-pink-200 rounded-2xl p-2 pr-3 shadow-lg" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => setActive(6)}
      >
        <LockClosedIcon
          className={` ${active === 6 ? "scale-110" : "text-black"} w-6 h-6 `}
        />
        <span
          className={`${active === 6 ? "scale-110" : ""} pl-3 hidden lg:block`}
        >
          Change Password
        </span>
      </div>
      <div
        className={` ${
          active === 7 ? "bg-pink-200 rounded-2xl p-2 shadow-lg" : ""
        } flex items-center cursor-pointer w-full mb-6`}
        onClick={() => setActive(7)}
      >
        <IdentificationIcon
          className={` ${active === 7 ? "scale-110" : "text-black"} w-6 h-6 `}
        />
        <span
          className={`${active === 7 ? "scale-110" : ""} pl-3 hidden lg:block`}
        >
          Address
        </span>
      </div>
      <div
        className=" group hover:bg-pink-200 rounded-2xl hover:shadow-lg flex mt-auto p-2 items-center  cursor-pointer w-full mb-6"
        onClick={() => logoutHandler()}
      >
        <ArrowRightOnRectangleIcon
          className={` ${
            active === 8 ? "scale-110" : "text-black"
          } group-hover:scale-110 w-6 h-6 `}
        />
        <span
          className={`${
            active === 8 ? "scale-110" : ""
          } group-hover:scale-110 pl-3 hidden lg:block`}
        >
          Log out
        </span>
      </div>
      {user?.avatar ? (
        <div className=" flex items-center relative h-[35px ] w-[35px] mr-1 rounded-2xl shadow-xl">
          <img
            src={`${user?.avatar.url}`}
            className=" h-full w-full rounded-2xl object-center object-cover "
            alt=""
          />
          <h2 className=" whitespace-nowrap ml-2 font-semibold capitalize hidden lg:block">
            {user.fullname}
          </h2>
        </div>
      ) : (
        <UserCircleIcon className="h-9 w-9 text-[#d3d3d3]" />
      )}
    </div>
  );
};

export default ProfileSidebar;
