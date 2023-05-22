import { Outlet } from "react-router-dom";
import NavbarApp from "../components/NavbarApp";

const AppLayout = () => {
  return (
    <div className="app">
      <NavbarApp />
      <Outlet />
    </div>
  );
};

export default AppLayout;
