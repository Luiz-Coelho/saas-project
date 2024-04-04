import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

import { Provider } from "react-redux";
import { store } from "./state/store.ts";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import LandingPage from "./pages/LandingPage/LandingPage.tsx";
import MainPage from "./pages/app/MainPage.tsx";
import Administrative from "./pages/app/Administrative/Administrative.tsx";
import Financial from "./pages/app/Financial/Financial.tsx";
import Operational from "./pages/app/Operational/Operational.tsx";
import Customers from "./pages/app/Operational/Customers/Customers.tsx";
import Payables from "./pages/app/Financial/Payables/Payables.tsx";
import Receivables from "./pages/app/Financial/Receivables/Receivables.tsx";
import Orders from "./pages/app/Operational/Orders/Orders.tsx";
import Automobiles from "./pages/app/Operational/Automobiles/Automobiles.tsx";
import Users from "./pages/app/Administrative/Users/Users.tsx";
import Departments from "./pages/app/Administrative/Departments/Departments.tsx";
import NewCustomer from "./pages/app/Operational/Customers/NewCustomer/NewCustomer.tsx";
import NewUser from "./pages/app/Administrative/Users/NewUser/NewUser.tsx";
import Tracks from "./pages/app/Operational/Tracks/Tracks.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/app",
        element: <MainPage />,
        children: [
          {
            path: "/app/administrative",
            element: <Administrative />,
            children: [
              {
                path: "/app/administrative/users",
                element: <Users />,
              },
              {
                path: "/app/administrative/users/newuser",
                element: <NewUser />,
              },
              {
                path: "/app/administrative/departments",
                element: <Departments />,
              },
            ],
          },
          {
            path: "/app/financial",
            element: <Financial />,
            children: [
              {
                path: "/app/financial/payables",
                element: <Payables />,
              },
              {
                path: "/app/financial/receivables",
                element: <Receivables />,
              },
            ],
          },
          {
            path: "/app/operational",
            element: <Operational />,
            children: [
              {
                path: "/app/operational/customers",
                element: <Customers />,
              },
              {
                path: "/app/operational/customers/newcustomer",
                element: <NewCustomer />,
              },
              {
                path: "/app/operational/orders",
                element: <Orders />,
              },
              {
                path: "/app/operational/tracks",
                element: <Tracks />,
              },
              {
                path: "/app/operational/automobiles",
                element: <Automobiles />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
