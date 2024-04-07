import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "@/components/Layout.tsx";
import HomePage from "@/pages/HomePage.tsx";
import NotFound from "@/pages/NotFound.tsx"
import Users from "@/pages/Users.tsx";
import UserCreate from "@/pages/UserCreate.tsx";
import UserDetails from "@/pages/UserDetails.tsx";
import Orders from "@/pages/Orders.tsx";
import OrderDetails from "@/pages/OrderDetails.tsx";
import OrderCreate from "@/pages/OrderCreate.tsx";
import Reviews from "@/pages/Reviews.tsx";
import ReviewCreate from "@/pages/ReviewCreate.tsx";
import ReviewDetails from "@/pages/ReviewDetails.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'users/',
        children: [
          {
            path: '',
            element: <Users />,
          },
          {
            path: 'create',
            element: <UserCreate />,
          },
          {
            path: ':id',
            element: <UserDetails />,
          }
        ]
      },
      {
        path: 'orders/',
        children: [
          {
            path: '',
            element: <Orders />,
          },
          {
            path: 'create',
            element: <OrderCreate />,
          },
          {
            path: ':id',
            element: <OrderDetails />,
          }
        ]
      },
      {
        path: 'reviews/',
        children: [
          {
            path: '',
            element: <Reviews />,
          },
          {
            path: 'create',
            element: <ReviewCreate />,
          },
          {
            path: ':id',
            element: <ReviewDetails />,
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
