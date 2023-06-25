import styles from "../styles/styles";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { axiosInstanceGet } from "../utils/axiosInstance";
import Loader from "../components/routes/Loader";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Pagination from "../components/Pagination";

const ProductsPage = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(1);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageRange, setCurrentPageRange] = useState(1);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);

    try {
      const categoryParams = searchParams.get("category");
      setSearchParams({
        page: page,
        pageSize: pageSize,
        category: categoryParams,
        priceRange: priceRange,
        sort: sort,
      });

      const response = await axiosInstanceGet.get(
        `/products/products?${searchParams}`
      );

      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
      setTotalProducts(response.data.totalProducts);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setSearchParams({
      page: page,
      pageSize: pageSize,
      category: category,
      priceRange: priceRange,
      sort: sort,
    });
  }, [page, pageSize, category, priceRange, sort]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setActive(newPage);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
            {products &&
              products.map((item, index) => (
                <ProductCard item={item} seller={item.shopId} key={index} />
              ))}
          </div>
          {products && products.length === 0 ? (
            <h1 className="text-center w-full font-Ubuntu pb-[100px] text-2xl font-bold">
              No Products Found
            </h1>
          ) : null}
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
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {/* Filter options */}
          <div>
            <input
              type="text"
              value={category}
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
            />
            <input
              type="text"
              value={priceRange}
              placeholder="Price Range (e.g. 0-100)"
              onChange={(e) => setPriceRange(e.target.value)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductsPage;
