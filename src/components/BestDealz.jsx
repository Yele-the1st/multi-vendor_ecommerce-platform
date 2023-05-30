import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/styles";
import { productData } from "../static/data";

const BestDealz = () => {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    const firstFive = d.slice(0, 4);
    setData(firstFive);
  }, []);
  return (
    <div className={` ${styles.section} mt-10 py-10 px-4 lg:px-12`}>
      <p className="mt-5 text-3xl text-center font-bold font-Ubuntu tracking-tight text-gray-900 sm:text-4xl">
        MOST WANTED DEALZ
      </p>
      <p className="mb-8 text-xl text-center font-Source font-light tracking-wider text-gray-900 sm:text-xl">
        CHECK OUT OUR BESTSELLERS
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 mt-4 ">
        {data.map((product) => (
          <ProductCard key={product.id} item={product} />
        ))}
      </div>
    </div>
  );
};

export default BestDealz;
