import styles from "../styles/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import { axiosInstanceGet } from "../utils/axiosInstance";
import Loader from "../components/routes/Loader";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

import { ChevronUpDownIcon, CubeIcon } from "@heroicons/react/24/solid";
import Pagination from "../components/Pagination";
import { useItems, useProductQuery } from "../hooks/useItems";
import Select from "../components/Select";
import PriceRange from "../components/utility/PriceRange";

const ProductsPage = () => {
  const [active, setActive] = useState(1);
  const [search, setSearch] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const availableSortOptions = [
    { value: "sales", label: "Best Selling" },
    { value: "createdAt", label: "Most Recent" },
    { value: "priceAsc", label: "Lowest Price" },
    { value: "priceDesc", label: "Highest Price" },
    { value: "", label: "Relevancy" },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setActive(newPage);
  };

  useEffect(() => {
    search.set("page", page);
    setSearch(search, {
      replace: true,
    });
  }, [page]);

  const sort = search.get("sort");
  const priceRange = search.get("priceRange");

  useEffect(() => {
    setPage(1);
  }, [sort, priceRange]);

  const getItems = useProductQuery();

  // Assuming setTotalPages is a state update function
  useEffect(() => {
    if (getItems.data) {
      setTotalPages(getItems.data.totalPages);
      setProducts(getItems.data?.products);
    }
  }, [getItems.data]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
          <div className="flex items-center mb-6">
            <CubeIcon className="w-5 h-5 mr-2 " />

            <h1 className=" font-Ubuntu text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
              All Products
            </h1>
          </div>

          <div className=" font-Ubuntu flex items-center justify-between mb-10">
            <PriceRange />
            {/* ***************************************** */}
            <Select availableSortOptions={availableSortOptions} />
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
            {!getItems.isLoading && products && products.length > 0
              ? products.map((item, index) => (
                  <ProductCard item={item} seller={item.shopId} key={index} />
                ))
              : null}
          </div>
          {/* Pagination */}
          <div className=" sm:hidden  font-Ubuntu text-center pb-3 justify-between flex items-center flex-wrap -mb-1.5  ">
            <button
              className=" mr-1.5 mb-1.5 p-3 cursor-pointer rounded-full min-h-[48px] min-w-[48px] z-10 flex justify-center items-center align-middle bg-gray-100 hover:bg-gray-200 hover:scale-105 "
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              <ArrowLeftIcon className=" w-3 h-3 stroke-[4]" />
            </button>
            <span className=" ">
              Showing Pages {page} of {totalPages}
            </span>
            <button
              className=" ml-1.5 mb-1.5 p-3 cursor-pointer rounded-full min-h-[48px] min-w-[48px] z-10 flex justify-center items-center align-middle bg-gray-100 hover:bg-gray-200 hover:scale-105 "
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              <ArrowRightIcon className=" w-3 h-3 stroke-[4]" />
            </button>
          </div>

          {/* Pagination */}
          <div className="hidden sm:block">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
