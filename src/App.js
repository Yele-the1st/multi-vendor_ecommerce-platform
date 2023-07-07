import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import ErrorPage from "./layouts/ErrorPage";
import ShopLayout from "./layouts/ShopLayout";
import AppLayout from "./layouts/AppLayout";
import Orders from "./pages/Orders";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import { loader as shopsLoader } from "./pages/ShopsPage";
import { loader as eventsLoader } from "./pages/EventsPage";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  FaqPage,
  EventsPage,
  ProductPage,
  ProductsPage,
  ProfilePage,
  CreateShopPage,
  ShopActivationPage,
  ShopLoginPage,
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
  ShopProductsPage,
  ShopCreateEventPage,
  ShopEventsPage,
  ShopCouponsPage,
  ProductsCategoryPage,
  ShopsPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toastify.css";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { loadSeller } from "./redux/actions/sellerAction";
import {
  loadAllProduct,
  loadLatestProduct,
} from "./redux/actions/productAction";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(loadAllProduct());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/products/c/:name",
          element: <ProductsCategoryPage />,
        },
        {
          path: "/product/:id",
          element: <ProductPage />,
        },

        {
          path: "/events",
          element: <EventsPage />,
          loader: eventsLoader,
        },
        {
          path: "/about",
          element: <FaqPage />,
        },
        {
          path: "/shops",
          element: <ShopsPage />,
          loader: shopsLoader,
        },
      ],
    },
    {
      path: "/app/",
      element: <AppLayout />,
      children: [
        {
          path: "/app/messages",
          element: <Messages />,
        },
        {
          path: "/app/message/:id",
          element: <Message />,
        },

        {
          path: "/app/profile",
          element: <ProtectedRoutes type={"user"} children={<ProfilePage />} />,
        },
      ],
    },
    {
      path: "/auth/",
      element: <AuthLayout />,
      children: [
        {
          path: "/auth/login",
          element: <LoginPage />,
        },
        {
          path: "/auth/signup",
          element: <SignupPage />,
        },
        {
          path: "/auth/activation/:activation_token",
          element: <ActivationPage />,
        },
        {
          path: "/auth/shop/create-shop",
          element: <CreateShopPage />,
        },
        {
          path: "/auth/shop/activation/:activation_token",
          element: <ShopActivationPage />,
        },
        {
          path: "/auth/shop/login",
          element: <ShopLoginPage />,
        },
      ],
    },
    {
      path: "/shop/",
      element: <ShopLayout />,
      children: [
        {
          path: "/shop/:id",
          element: (
            <ProtectedRoutes type={"seller"} children={<ShopHomePage />} />
          ),
        },
        {
          path: "/shop/dashboard",
          element: (
            <ProtectedRoutes type={"seller"} children={<ShopDashboardPage />} />
          ),
        },
        {
          path: "/shop/create-product",
          element: (
            <ProtectedRoutes
              type={"seller"}
              children={<ShopCreateProductPage />}
            />
          ),
        },
        {
          path: "/shop/shop-products",
          element: (
            <ProtectedRoutes type={"seller"} children={<ShopProductsPage />} />
          ),
        },
        {
          path: "/shop/create-event",
          element: (
            <ProtectedRoutes
              type={"seller"}
              children={<ShopCreateEventPage />}
            />
          ),
        },
        {
          path: "/shop/shop-events",
          element: (
            <ProtectedRoutes type={"seller"} children={<ShopEventsPage />} />
          ),
        },
        {
          path: "/shop/shop-coupons",
          element: (
            <ProtectedRoutes type={"seller"} children={<ShopCouponsPage />} />
          ),
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default App;
