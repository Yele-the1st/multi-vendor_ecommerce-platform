import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "./routes/Loader";

const ProtectedRoutes = ({ type, children }) => {
  const user = useSelector((state) => state.user);
  const seller = useSelector((state) => state.seller);

  if (type === "user" && !user.isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  if (type === "seller" && !seller.sellerIsAuthenticated) {
    return <Navigate to="/auth/shop/login" replace />;
  }

  return children;
};

export default ProtectedRoutes;
