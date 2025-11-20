import React from "react";
import { createBrowserRouter } from "react-router";

import MainRootLayout from "../Layout/MainRootLayout/MainRootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import SendParcel from "../Pages/sendParcel/SendParcel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRootLayout></MainRootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "send-parcels",
        element: <SendParcel></SendParcel>,
        loader: () => fetch(`/serviceCenter.json`).then((res) => res.json()),
      },
      {
        path: "coverage",
        element: <Coverage></Coverage>,
        loader: () => fetch(`/serviceCenter.json`).then((res) => res.json()),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
