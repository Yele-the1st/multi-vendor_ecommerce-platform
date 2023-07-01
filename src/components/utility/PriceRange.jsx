import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [openBudget, setOpenBudget] = useState(false);
  const [applyClicked, setApplyClicked] = useState(false);
  const [search, setSearch] = useSearchParams();

  const clearAllHandler = () => {
    setOpenBudget(!openBudget);
    setMaxPrice("");
    setMinPrice("");
    search.delete("priceRange");
    setSearch(search, {
      replace: true,
    });

    setApplyClicked(false);
  };

  //   useEffect(() => {
  //     search.delete("priceRange");
  //   }, [clearAllHandler]);

  const ApplyClicked = () => {
    setOpenBudget(!openBudget);
    setApplyClicked(true);
  };

  const handleApply = () => {
    const priceRange = `${minPrice}-${maxPrice}`;

    search.set("priceRange", priceRange);

    setSearch(search, {
      replace: true,
    });
  };

  useEffect(() => {
    if (applyClicked) {
      handleApply();
    }
    // setApplyClicked(false);
  }, [applyClicked]);

  return (
    <div>
      <div className=" hidden lg:flex items-center space-x-2.5 text-[#555] font-light">
        <span className="text-base font-semibold text-gray-900">Budget</span>
        <input
          className="p-[5px] border border-solid border-[lightgray] outline-none rounded-md"
          type="text"
          placeholder="min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          className="p-[5px] border border-solid border-[lightgray] outline-none rounded-md"
          type="text"
          placeholder="max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        {applyClicked ? (
          <button
            className=" w-max font-semibold text-base items-center "
            onClick={clearAllHandler}
          >
            Clear All
          </button>
        ) : (
          <button
            className="bg-black shadow-lg text-white font-semibold text-base rounded-md py-3 px-6 items-center"
            onClick={ApplyClicked}
          >
            Apply
          </button>
        )}
      </div>
      {/* dropdown menu */}
      <div className="relative">
        <div
          className=" shadow flex lg:hidden font-semibold items-center gap-2.5 border border-solid rounded-md cursor-pointer py-3 px-6 "
          onClick={() => setOpenBudget(!openBudget)}
        >
          Budget
          <span>
            <ChevronUpDownIcon className="w-4 h-4 stroke-current cursor-pointer stroke-2" />
          </span>
        </div>
        {openBudget && (
          <div className=" absolute lg:hidden  top-[100%] left-0 mt-2 border rounded-lg shadow z-10 border-[#e4e5e7] bg-white">
            <div className=" top-0 relative max-h-[284px] p-6  ">
              <div className="flex">
                <div className="mr-3 flex flex-col mb-3 text-sm">
                  <label
                    className="text-[#95979d] text-xs font-semibold leading-6 mb-1  "
                    htmlFor="Min"
                  >
                    MIN
                  </label>
                  <input
                    className=" w-full min-h-[36px] min-w-[120px] border border-[#dadbdd] rounded text-[#404145] py-2 px-3 "
                    type="text"
                    placeholder="Any"
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>
                <div className=" flex flex-col mb-3 text-sm">
                  <label
                    className="text-[#95979d] text-xs font-semibold leading-6 mb-1  "
                    htmlFor="Min"
                  >
                    Max
                  </label>
                  <input
                    className=" w-full min-h-[36px] min-w-[120px] border border-[#dadbdd] rounded text-[#404145] py-2 px-3 "
                    type="text"
                    placeholder="Any"
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex py-3 px-6 items-center justify-between gap-4 border-t border-t-[#e4e5e7] ">
              <button className=" w-max font-semibold text-base items-center ">
                Clear All
              </button>
              <button
                className="bg-black text-white font-semibold text-base rounded-md py-3 px-6 items-center"
                onClick={ApplyClicked}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceRange;
