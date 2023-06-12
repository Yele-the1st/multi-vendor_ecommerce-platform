import { useState } from "react";
import styles from "../styles/styles";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const FaqPage = () => {
  return (
    <div>
      <Faq />
    </div>
  );
};

const Faq = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className={`${styles.section} font-Ubuntu my-8 px-4 lg:px-12`}>
      <h2 className="text-3xl font-Ubuntu font-bold mb-8">FAQ</h2>
      <div className=" mx-auto space-y-4 ">
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className=" flex items-center justify-between w-full "
            onClick={() => toggleTab(1)}
          >
            <span className="text-lg font-medium">
              How do I track my order ?
            </span>
            <ChevronDownIcon
              className={` ${
                activeTab === 1 ? "transform rotate-180" : ""
              } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0 `}
            />
          </button>
          {activeTab === 1 && (
            <div className="mt-4">
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                accusamus quia voluptas, nemo inventore dolor, expedita incidunt
                animi voluptatem nostrum vel? Dolores quis temporibus sint
                suscipit a harum at unde.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className=" flex items-center justify-between w-full "
            onClick={() => toggleTab(2)}
          >
            <span className="text-lg font-medium">
              How do I track my order ?
            </span>
            <ChevronDownIcon
              className={` ${
                activeTab === 2 ? "transform rotate-180" : ""
              } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0 `}
            />
          </button>
          {activeTab === 2 && (
            <div className="mt-4">
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                accusamus quia voluptas, nemo inventore dolor, expedita incidunt
                animi voluptatem nostrum vel? Dolores quis temporibus sint
                suscipit a harum at unde.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className=" flex items-center justify-between w-full "
            onClick={() => toggleTab(3)}
          >
            <span className="text-lg font-medium">
              How do I track my order ?
            </span>
            <ChevronDownIcon
              className={` ${
                activeTab === 3 ? "transform rotate-180" : ""
              } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0 `}
            />
          </button>
          {activeTab === 3 && (
            <div className="mt-4">
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                accusamus quia voluptas, nemo inventore dolor, expedita incidunt
                animi voluptatem nostrum vel? Dolores quis temporibus sint
                suscipit a harum at unde.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className=" flex items-center justify-between w-full "
            onClick={() => toggleTab(4)}
          >
            <span className="text-lg font-medium">
              How do I track my order ?
            </span>
            <ChevronDownIcon
              className={` ${
                activeTab === 4 ? "transform rotate-180" : ""
              } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0 `}
            />
          </button>
          {activeTab === 4 && (
            <div className="mt-4">
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                accusamus quia voluptas, nemo inventore dolor, expedita incidunt
                animi voluptatem nostrum vel? Dolores quis temporibus sint
                suscipit a harum at unde.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className=" flex items-center justify-between w-full "
            onClick={() => toggleTab(5)}
          >
            <span className="text-lg font-medium">
              How do I track my order ?
            </span>
            <ChevronDownIcon
              className={` ${
                activeTab === 5 ? "transform rotate-180" : ""
              } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0 `}
            />
          </button>
          {activeTab === 5 && (
            <div className="mt-4">
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                accusamus quia voluptas, nemo inventore dolor, expedita incidunt
                animi voluptatem nostrum vel? Dolores quis temporibus sint
                suscipit a harum at unde.
              </p>
            </div>
          )}
        </div>
        <div className="border-b border-gray-200 pb-4 ">
          <button
            className=" flex items-center justify-between w-full "
            onClick={() => toggleTab(6)}
          >
            <span className="text-lg font-medium">
              How do I track my order ?
            </span>
            <ChevronDownIcon
              className={` ${
                activeTab === 6 ? "transform rotate-180" : ""
              } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0 `}
            />
          </button>
          {activeTab === 6 && (
            <div className="mt-4">
              <p className=" text-gray-500">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum
                accusamus quia voluptas, nemo inventore dolor, expedita incidunt
                animi voluptatem nostrum vel? Dolores quis temporibus sint
                suscipit a harum at unde.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
