import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useItems } from "../hooks/useItems";
import { debounce } from "lodash";
import { useRef } from "react";

const SearchBar = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useSearchParams();

  const searchRef = useRef(null);
  const resultRef = useRef(null);

  const onSearchChange = debounce((e) => {
    const text = e.target.value;

    if (text.length === 0) {
      search.delete("query");
      setSearch(search, {
        replace: true,
      });
    } else {
      search.set("query", text);
      setSearch(search, {
        replace: true,
      });
    }
  }, 350);

  // const queryString = search.toString();
  const queryString = search.get("query");

  const getItems = useItems();
  const Items = useMemo(() => getItems.data?.results ?? [], [getItems.data]);

  console.log(search.toString());

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleClickOutside = useCallback(
    (event) => {
      const clickedElementIsLink = event.target.tagName.toLowerCase() === "a";
      const clickedElementIsOutsideSearch =
        searchRef.current && !searchRef.current.contains(event.target);
      const clickedElementIsOutsideResultPane =
        resultRef.current && !resultRef.current.contains(event.target);

      if (
        (clickedElementIsLink && clickedElementIsOutsideSearch) ||
        clickedElementIsOutsideResultPane
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  console.log(isOpen);

  return (
    <div
      className={`${className} relative w-full flex items-center rounded-full h-12 px-5 border-2 transition-colors delay-0, transition-border duration-300 ease-linear delay-0 border-black  ${
        isOpen && queryString?.length > 0
          ? "bg-white rounded-[24px] rounded-b-none shadow-lg border-none "
          : "bg-[#f6f6f4]"
      }`}
    >
      <div className="flex-1 flex items-center z-20 ">
        <input
          name="Search"
          placeholder="Search for anything... "
          type="text"
          defaultValue={search.get("query") ?? ""}
          onChange={onSearchChange}
          onClick={handleSearchClick}
          className={` outline-none font-light font-Ubuntu h-full w-full text-base overflow-hidden whitespace-nowrap text-ellipsis bg-transparent`}
          ref={searchRef}
        />
        <MagnifyingGlassIcon className={`w-6 h-6 stroke-2 stroke-black `} />
      </div>
      {isOpen && queryString && (
        <div
          className=" absolute left-0 top-10 bg-white rounded-[24px] rounded-t-none border-t-[#e6e7e8] border-t border-[#e6e7e8]  py-6 overflow-scroll min-w-full max-h-[calc(100vh-250px)] shadow text-left z-10"
          ref={resultRef}
        >
          <div className=" gap-6 flex flex-col  h-full  ">
            <div className="w-full flex flex-col flex-wrap items-start font-Ubuntu ">
              {Items && Items?.length > 0 ? (
                Items?.map((result) => {
                  return (
                    <Link
                      to={`/product/${result._id}`}
                      key={result._id}
                      className=" px-6 w-full hover:bg-[#f6f6f4]"
                    >
                      <div className="w-full flex items-center justify-start py-3 ">
                        <img
                          src={`${result?.images && result.images[0]?.url}`}
                          alt=""
                          className="w-10 h-10 mr-[10px]"
                        />
                        <h1>{result.name}</h1>
                      </div>
                    </Link>
                  );
                })
              ) : !getItems.isLoading && Items && Items.length === 0 ? (
                <p className="px-6">
                  Oops! We couldn't find any products matching your search.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
