import { createBrowserRouter } from "react-router";

import MainRootLayout from "../Layout/MainRootLayout/MainRootLayout";
import Home from "../Pages/Home/Home/Home";
import Coverage from "../Pages/coverage/Coverage";
import AuthLayout from "../Layout/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import SendParcel from "../Pages/sendParcel/SendParcel";
import PrivateRouter from "./PrivateRoute/PrivateRouter";
import Dashboard from "../Layout/DashboardLayout/Dashboard";
import MyParcels from "../Pages/Dashboard/MyParcels/MyParcels";
import MyPay from "../Pages/Dashboard/MyPay/MyPay";
import PaymentSuccessful from "../Pages/Dashboard/PaymentSuccessful";
import PaymentCancel from "../Pages/Dashboard/PaymentCancel";
import PaymentHistory from "../Pages/Dashboard/PaymentHistroy/PaymentHistory";
import BeRider from "../Pages/BeRider/BeRider";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UserManagement from "../Pages/Dashboard/UserManagment/UserManagement";

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
        path: "be-rider",
        element: (
          <PrivateRouter>
            <BeRider></BeRider>
          </PrivateRouter>
        ),
        loader: () => fetch(`/serviceCenter.json`).then((res) => res.json()),
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
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <Dashboard></Dashboard>
      </PrivateRouter>
    ),
    children: [
      {
        index: true,
        path: "my-parcels",
        element: <MyParcels></MyParcels>,
      },
      {
        path: "parcel/:parcelId",
        element: <MyPay></MyPay>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccessful></PaymentSuccessful>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancel></PaymentCancel>,
      },
      {
        path: "users-management",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "approve-riders",
        element: <ApproveRiders></ApproveRiders>,
      },
    ],
  },
]);

export default router;
