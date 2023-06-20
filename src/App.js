import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import ShopLayout from "./layouts/ShopLayout";
import AppLayout from "./layouts/AppLayout";
import Orders from "./pages/Orders";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import {
  LoginPage,
  SignupPage,
  ActivationPage,
  HomePage,
  FaqPage,
  EventsPage,
  ShopPage,
  ProductPage,
  ProductsPage,
  ProfilePage,
  CreateShopPage,
  ShopActivationPage,
  ShopLoginPage,
  ShopHomePage,
  ShopDashboardPage,
  ShopCreateProductPage,
} from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toastify.css";
import { useEffect } from "react";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { loadSeller } from "./redux/actions/sellerAction";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
    dispatch(loadSeller());
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "/",
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
          path: "/product/:name",
          element: <ProductPage />,
        },
        {
          path: "/shops",
          element: <ShopPage />,
        },
        {
          path: "/events",
          element: <EventsPage />,
        },
        {
          path: "/about",
          element: <FaqPage />,
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
