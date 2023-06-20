import React, { useEffect } from "react";
import LoginShop from "../components/shop/LoginShop";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ShopLoginPage = () => {
  const navigate = useNavigate();
  const { sellerIsAuthenticated, seller } = useSelector(
    (state) => state.seller
  );
  useEffect(() => {
    if (sellerIsAuthenticated === true) {
      navigate(`/shop/dashboard`);
    }
  }, [sellerIsAuthenticated, navigate]);
  return (
    <div>
      <LoginShop />
    </div>
  );
};

export default ShopLoginPage;
