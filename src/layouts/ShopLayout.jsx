import { Outlet } from "react-router-dom";
import NavbarShop from "../components/NavbarShop";

const ShopLayout = () => {
  return (
    <div className="app">
      <NavbarShop />
      <Outlet />
    </div>
  );
};

export default ShopLayout;
