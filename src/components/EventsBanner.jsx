import { Link } from "react-router-dom";
import image from "../assets/images/pexels-k-makhasette-3805873.jpg";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
const EventsBanner = () => {
  return (
    <div className="flex items-center gap-x-6 overflow-hidden bg-[#3F0071] ">
      <div className=" h-[14rem] sm:h-[18rem] w-screen grid">
        <div className="flex items-center h-full w-full">
          <div className="flex items-start h-full sm:h-[18rem] w-1/3  ">
            <img src={image} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="h-[14rem] sm:h-[18rems] flex flex-col items-center font-Source w-2/3 text-white">
            <div className=" mx-auto mt-4 justify-center items-center flex flex-col ">
              <p className="font-light sm:text-lg tracking-widest my-1">
                BIG DEALZ & AMAZING OFFERS!
              </p>
              <p className=" font-Ubuntu sm:text-lg  tracking-widest ">
                UP TO 50% OFF YOUR FAVES*
              </p>
              <Link
                to={`/events`}
                className={` mt-6 py-3 px-4 lg:py-3 lg:px-4 flex items-center sm:text-lg gap-3 sm:tracking-widest rounded-xl whitespace-nowrap font-Ubuntu cursor-pointer shadow-2xl bg-transparent text max-w-max hover:gap-5 transition-all duration-300 ease-linear delay-0  border-purple-700`}
              >
                <p> CLICK HERE FOR THE REAL DEALZ</p>
                <ArrowRightIcon className=" w-4 h-4 hidden sm:block  " />
              </Link>

              <p className="font-light sm:text-lg trac tracking-widest my-1">
                LIMITED TIME EVENT!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsBanner;
