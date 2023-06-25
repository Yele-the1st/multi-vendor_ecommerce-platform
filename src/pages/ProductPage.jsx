import React, { useEffect } from "react";
import ProductDetails from "../components/ProductDetails";
import { useParams } from "react-router-dom";
import SuggestedProduct from "../components/products/SuggestedProduct";
import { loadProduct } from "../redux/actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/routes/Loader";
import { useLocation } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleProduct, loading, message } = useSelector(
    (state) => state.product
  );
  console.log(singleProduct);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    dispatch(loadProduct(id));
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ProductDetails data={singleProduct} />
      {singleProduct && <SuggestedProduct data={singleProduct} />}
    </div>
  );
};

export default ProductPage;
