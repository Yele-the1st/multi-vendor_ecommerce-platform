import React from "react";
import useSearch from "../hooks/useSearch";
import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { backend_url } from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const SearchBar = ({ className }) => {
  const { allProducts } = useSelector((state) => state.product);

  const {
    isOpen,
    searchQuery,
    searchResults,
    searchRef,
    resultRef,
    handleSearchClick,
    handleSearchChange,
  } = useSearch(allProducts);

  return (
    <div
      className={`${className} relative w-full flex items-center rounded-full h-12 px-5 border-2 transition-colors delay-0, transition-border duration-300 ease-linear delay-0 border-black  ${
        isOpen && searchQuery.length > 0
          ? "bg-white rounded-[24px] rounded-b-none shadow-lg border-none "
          : "bg-[#f6f6f4]"
      }`}
    >
      <div className="flex-1 flex items-center z-20 ">
        <input
          name="Search"
          placeholder="Search for anything... "
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          onClick={handleSearchClick}
          className={` outline-none font-light font-Ubuntu h-full w-full text-base overflow-hidden whitespace-nowrap text-ellipsis bg-transparent`}
          ref={searchRef}
        />
        <MagnifyingGlassIcon className={`w-6 h-6 stroke-2 stroke-black `} />
      </div>
      {isOpen && searchQuery.length > 0 && (
        <div
          className=" absolute left-0 top-10 bg-white rounded-[24px] rounded-t-none border-t-[#e6e7e8] border-t border-[#e6e7e8]  py-6 overflow-scroll min-w-full max-h-[calc(100vh-250px)] shadow text-left z-10"
          ref={resultRef}
        >
          <div className=" gap-6 flex flex-col  h-full  ">
            <div className="w-full flex flex-col flex-wrap items-start font-Ubuntu ">
              {searchResults && searchResults?.length > 0 ? (
                searchResults?.map((result) => {
                  return (
                    <Link
                      to={`/product/${result._id}`}
                      key={result._id}
                      className=" px-6 w-full hover:bg-[#f6f6f4]"
                    >
                      <div className="w-full flex items-center justify-start py-3 ">
                        <img
                          src={`${backend_url}${
                            result?.images && result.images[0]
                          }`}
                          alt=""
                          className="w-10 h-10 mr-[10px]"
                        />
                        <h1>{result.name}</h1>
                      </div>
                    </Link>
                  );
                })
              ) : searchResults && searchResults.length === 0 ? (
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
