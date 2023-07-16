import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { loadProduct } from "../redux/actions/productAction";
import Loader from "../components/routes/Loader";
import { useLocation } from "react-router-dom";
import { axiosInstanceGet } from "../utils/axiosInstance";
import ProductCard from "../components/ProductCard";
import { cardData } from "../data/CategoryData";
import styles from "../styles/styles";

const getCategoryProducts = async (categoryName) => {
  try {
    const response = await axiosInstanceGet.get(`/products/c/${categoryName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    // Handle error
    throw new Error("Failed to retrieve category products");
  }
};

const ProductsCategoryPage = () => {
  const [products, setProducts] = useState([]);
  const { name } = useParams();
  const { pathname } = useLocation();

  console.log(products);

  useEffect(() => {
    getCategoryProducts(name)
      .then((products) => {
        setProducts(products);
      })
      .catch((err) => console.log(err));
  }, [getCategoryProducts]);

  console.log(products?.category);

  return (
    <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-white min-h-[64px] min-w-[64px] border-[1.5px] border-[#e6e7e8] flex justify-center items-center mr-5 p-3.5 rounded-[20px] ">
          <img
            src={
              products.length > 0 &&
              cardData?.find((option) => option.value === products[0]?.category)
                ?.imageUrl
                ? cardData.find(
                    (option) => option.value === products[0]?.category
                  ).imageUrl
                : ""
            }
            alt=""
            className="max-w-full align-middle"
            loading="lazy"
          />
        </div>

        <h1 className=" font-Ubuntu text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {products.length > 0 &&
            cardData?.find((option) => option.value === products[0]?.category)
              ?.title}
        </h1>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-4 ">
        {products.length > 0 &&
          products.map((product) => (
            <ProductCard
              key={product?._id}
              seller={product?.shopId}
              item={product}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductsCategoryPage;
