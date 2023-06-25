import React, { useEffect } from "react";
import { useState } from "react";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../ProductCard";

const SuggestedProduct = ({ data }) => {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    const d =
      productData && productData.filter((i) => i.category === data.category);
    setProducts(d);
  }, []);

  return (
    <div className=" font-Ubuntu">
      {data ? (
        <div className={`p-4 ${styles.section} px-4 lg:px-12`}>
          <div>
            <h2 className={` ${styles.heading} text-[25px] font-semibold mb-5`}>
              Related Products
            </h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5 xl:gap-7 mb-12">
              {products &&
                products.map((i, index) => (
                  <ProductCard key={index} seller={data.shopId} item={i} />
                ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SuggestedProduct;
