import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import AppLayout from "./layouts/AppLayout";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import { LoginPage, SignupPage, ActivationPage } from "./Routes.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./custom-toastify.css";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/orders",
          element: <Orders />,
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
