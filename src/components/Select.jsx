import { useEffect, useState } from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "react-router-dom";

const Select = ({ availableSortOptions }) => {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useSearchParams();

  const reSort = (sortBy) => {
    setSort(sortBy);
    setOpen(false);
  };

  const filteredSortOptions = availableSortOptions.filter(
    (option) => option.value !== sort
  );

  useEffect(() => {
    search.set("sort", sort);
    search.delete("page");
    setSearch(search, {
      replace: true,
    });
  }, [sort]);

  return (
    <div className="flex cursor-pointer items-center relative space-x-2.5">
      <span className="font-normal text-base text-[#62646a]">Sort By</span>
      <span
        className="font-bold text-base flex gap-2 items-center"
        onClick={() => setOpen(!open)}
      >
        {search.get("sort")
          ? availableSortOptions.find(
              (option) => option.value === search.get("sort")
            )?.label
          : availableSortOptions.find((option) => option.value === sort)?.label}
        <ChevronUpDownIcon className="w-4 h-4 stroke-current cursor-pointer stroke-2" />
      </span>
      {open && (
        <div className="whitespace-nowrap z-10 absolute py-5 shadow-lg border-[0.5px] border-[lightgray]   bg-white rounded-2xl top-7 right-0 flex flex-col text-[#555]">
          {filteredSortOptions.map((option) => (
            <span
              key={option.value}
              onClick={() => reSort(option.value)}
              className="cursor-pointer px-5 py-2 hover:bg-[#f4f4f4]"
            >
              {option.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default Select;
