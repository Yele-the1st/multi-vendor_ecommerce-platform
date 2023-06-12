import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/layout/Footer";

const LandingLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LandingLayout;
