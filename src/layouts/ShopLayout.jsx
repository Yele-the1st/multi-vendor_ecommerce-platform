import { Outlet } from "react-router-dom";
import NavbarShop from "../components/NavbarShop";

const ShopLayout = () => {
  return (
    <div className="">
      <NavbarShop />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default ShopLayout;
