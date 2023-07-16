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
  ShopsPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  EventPage,
} from "./Routes.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toastify.css";
import { useEffect, useMemo, useState } from "react";
import { loadUser } from "./redux/actions/userAction";
import { useDispatch } from "react-redux";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { loadSeller } from "./redux/actions/sellerAction";
import {
  loadAllProduct,
  loadLatestProduct,
} from "./redux/actions/productAction";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { axiosInstanceGet } from "./utils/axiosInstance";

const App = () => {
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState();

  async function getStripeApikey() {
    try {
      const { data } = await axiosInstanceGet.get(`/payments/stripeapikey`);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // Handle the error when retrieving the Stripe API key
      console.error("Error retrieving Stripe API key:", error.message);
      toast.error(error.message);
      // Display an error message to the user or handle the error as needed
      // Example:
      // displayErrorMessage('An error occurred while retrieving the Stripe API key.');
    }
  }

  const stripePromise = useMemo(() => {
    if (stripeApiKey) {
      return loadStripe(stripeApiKey);
    }
  }, [stripeApiKey]);

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(loadAllProduct());
    getStripeApikey();
  }, []);

  console.log(stripeApiKey);

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
          path: "/product/:id",
          element: <ProductPage />,
        },
        {
          path: "/event/:id",
          element: <EventPage />,
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
          path: "/order/success",
          element: <OrderSuccessPage />,
        },
        {
          path: "/shops",
          element: <ShopsPage />,
          loader: shopsLoader,
        },
        {
          path: "/app/checkout",
          element: (
            <ProtectedRoutes type={"user"} children={<CheckoutPage />} />
          ),
        },
        {
          path: "/app/payment",
          element: (
            <ProtectedRoutes type={"user"}>
              {stripeApiKey && (
                <Elements stripe={stripePromise}>
                  <PaymentPage />
                </Elements>
              )}
            </ProtectedRoutes>
          ),
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
