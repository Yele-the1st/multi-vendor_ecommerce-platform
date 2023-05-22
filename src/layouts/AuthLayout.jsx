import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
