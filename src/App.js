import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import LandingLayout from "./layouts/LandingLayout";
import AppLayout from "./layouts/AppLayout";
import Orders from "./pages/Orders";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Messages from "./pages/Messages";
import { LoginPage, SignupPage } from "./Routes.js";

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
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
