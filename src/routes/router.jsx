import React from "react";
import { createBrowserRouter } from "react-router";

import MainRootLayout from "../Layout/MainRootLayout/MainRootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/coverage/Coverage";

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
        path: "/coverage",
        element: <Coverage></Coverage>,
      },
    ],
  },
]);

export default router;
