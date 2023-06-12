import {
  TruckIcon,
  BoltIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from "@heroicons/react/20/solid";
import styles from "../../styles/styles";

const features = [
  {
    name: "Free Shipping",
    description: "Enjoy free shipping on all orders over $100.",
    icon: TruckIcon,
  },
  {
    name: "Daily Surprise Offers",
    description: "Discover daily surprise offers and save up to 25% off.",
    icon: BoltIcon,
  },
  {
    name: "Affordable Prices.",
    description: "Shop at factory direct prices for affordable products.",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Secured Payments",
    description:
      "Experience 100% protected payments for worry-free transactions.",
    icon: ShieldCheckIcon,
  },
];

const Features = () => {
  return (
    <div className={` ${styles.section}  px-4 lg:px-12`}>
      <div className="relative h-full w-full rounded-2xl shadow-lg  px-10 pb-6  flex items-center  ">
        <div className="">
          <p className="mt-5 text-3xl font-bold font-Ubuntu tracking-tight text-gray-900 sm:text-4xl">
            A better way to shop
          </p>

          <div className="mt-5  justify-between items-center space-y-4  lg:space-y-0 lg:flex text-base leading-7 w-full">
            {features.map((feature) => (
              <div key={feature.name} className=" font-Ubuntu  relative pl-9">
                <feature.icon
                  className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                  aria-hidden="true"
                />

                <h1 className=" font-semibold ">{feature.name}</h1>
                <p className=" lg:w-3/4 font-Source font-light text-sm ">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <button
            className={`py-3 px-4 mt-6 flex items-center gap-3 rounded-xl font-Ubuntu cursor-pointer shadow bg-transparent text-sm font-medium max-w-max hover:gap-5  transition-all duration-300 ease-linear delay-0`}
          >
            Learn More
            <ArrowRightIcon className=" w-4 h-4  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;
