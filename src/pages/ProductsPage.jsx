import styles from "../styles/styles";
import { useSearchParams, useParams } from "react-router-dom";
import { productData } from "../static/data";
import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const filter = searchParams.get("bestselling");
  const [data, setData] = useState([]);

  useEffect(() => {
    let filteredData = [...productData];

    if (categoryData) {
      filteredData = filteredData.filter(
        (item) => item.category === categoryData
      );
    }

    if (filter === "true") {
      filteredData.sort((a, b) => b.total_sell - a.total_sell);
    }

    // Check if both categoryData and filter are falsy (null, undefined, or empty string)
    if (!categoryData && !filter) {
      filteredData.sort((a, b) => a.total_sell - b.total_sell);
    }

    setData(filteredData);
    window.scrollTo(0, 0);
  }, [categoryData, filter]);

  return (
    <div className={` ${styles.section}  mt-6 px-4 lg:px-12`}>
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
        {data && data.map((i, index) => <ProductCard item={i} key={index} />)}
      </div>
      {data && data.length === 0 ? (
        <h1 className="text-center w-full font-Ubuntu pb-[100px] text-2xl font-bold">
          No Products Found
        </h1>
      ) : null}
    </div>
  );
};

export default ProductsPage;
