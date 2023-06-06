import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Home/Home.jsx';
import OurMenu from './Components/Home/OurMenu/OurMenu.jsx';
import { HelmetProvider } from 'react-helmet-async';
import OurShop from './Components/Home/OurShop/OurShop.jsx';
import Login from './Components/Home/Login/Login.jsx';
import Signup from './Components/Home/Signup/Signup.jsx';
import Authproviders from './Providers/Authproviders.jsx';
import PrivateRoutes from './Components/PrivateRoutes/PrivateRoutes.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Dashboard from './Components/Home/OurShop/Dashboard.jsx';
import MyCart from './Components/Home/OurShop/myCart.jsx';
import AllUsers from './Components/DashboardItems/AllUsers.jsx';
import AddItems from './Components/DashboardItems/AdminFeatures/AddItems.jsx';
import AdminRoutes from './Components/PrivateRoutes/AdminRoutes.jsx';
import ManageItems from './Components/DashboardItems/AdminFeatures/ManageItems.jsx';
import Reservation from './Components/DashboardItems/UsersFeature/Reservation.jsx';

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/ourmenu",
        element: <PrivateRoutes><OurMenu></OurMenu></PrivateRoutes>,
      },
      {
        path: "/ourshop/:category",
        element: <PrivateRoutes><OurShop></OurShop></PrivateRoutes>
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><Dashboard></Dashboard>,</PrivateRoutes>,
    children: [
      {
        path: "allusers",
        element: <AdminRoutes><AllUsers></AllUsers></AdminRoutes>
      },
      {
        path: "additems",
        element: <AdminRoutes><AddItems></AddItems></AdminRoutes>
      },
      {
        path: "manageitems",
        element: <AdminRoutes><ManageItems></ManageItems></AdminRoutes>
      },
      {
        path: "mycart",
        element: <MyCart></MyCart>
      },
      {
        path: "reservation",
        element: <Reservation></Reservation>
      },
    ]
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/signup",
    element: <Signup></Signup>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Authproviders>
        <QueryClientProvider client={queryClient}>
          <div className='max-w-screen-xl mx-auto font-serif'>
            <RouterProvider router={router} />
          </div>
        </QueryClientProvider>
      </Authproviders>
    </HelmetProvider>
  </React.StrictMode>,
)
