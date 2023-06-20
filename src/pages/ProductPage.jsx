import React, { useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { productData } from "../static/data";
import SuggestedProduct from "../components/products/SuggestedProduct";

const ProductPage = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");

  useEffect(() => {
    const data = productData.find((i) => i.name === productName);
    setData(data);
  }, []);

  return (
    <div>
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
    </div>
  );
};

export default ProductPage;
