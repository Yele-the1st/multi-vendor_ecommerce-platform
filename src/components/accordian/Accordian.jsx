import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const Accordian = ({
  title,
  content,
  classNameContent,
  classNameTitle,
  classNameButton,
}) => {
  const [activeTab, setActiveTab] = useState(false);

  const toggleTab = () => {
    setActiveTab(!activeTab);
  };

  return (
    <div className=" font-Ubuntu">
      <button
        className={` ${classNameButton} flex items-center justify-between w-full hover:bg-[#f6f6f4] rounded-2xl`}
        onClick={toggleTab}
      >
        <span className={`${classNameTitle}`}>{title}</span>
        <ChevronDownIcon
          className={`${
            activeTab ? "transform rotate-180" : ""
          } w-4 h-4 stroke-[4] transition duration-300 ease-linear delay-0`}
        />
      </button>
      {activeTab && (
        <div className="mt-4 max-h-max">
          <p className={`${classNameContent}`}>{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordian;
