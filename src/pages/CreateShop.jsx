import React, { useEffect } from "react";
import CreateShop from "../components/shop/CreateShop.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateShopPage = () => {
  const navigate = useNavigate();
  const { sellerIsAuthenticated } = useSelector((state) => state.seller);

  useEffect(() => {
    if (sellerIsAuthenticated) {
      navigate("/shop/dashboard");
    }
  }, [sellerIsAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-80px)]">
      <CreateShop />
    </div>
  );
};

export default CreateShopPage;
