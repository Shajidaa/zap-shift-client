import React from "react";
import { createBrowserRouter } from "react-router";

import MainRootLayout from "../Layout/MainRootLayout/MainRootLayout";
import Home from "../Pages/Home/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainRootLayout></MainRootLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
]);

export default router;
