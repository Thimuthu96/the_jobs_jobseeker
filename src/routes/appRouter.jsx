import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import { Box } from "@mui/material";
import { ToastContainer } from "react-toastify";

//Components
import Sidebar from "../common/Sidebar";
import Appointments from "../views/Appointments/view/Appointments";
import Availability from "../views/Availability/view/Availability";
import Login from "../views/Login/View/Login";
import Home from "../views/Home/view/Home";
import SignUp from "../views/signup/Signup";

const AppRoutes = () => {
  const routers = createBrowserRouter([
    {
      path: "/admin",
      element: <Layout />,

      children: [
        {
          path: "/admin",
          element: <Appointments />,
        },
        {
          path: "/admin/availability",
          element: <Availability />,
        },
      ],
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/jobseeker",
      element: <Home />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routers} />
    </>
  );
};

function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Sidebar />
      </Box>
      <Box
        sx={{
          width: { sm: `calc(100% - 250px)` },
          backgroundColor: "#ffffff",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AppRoutes;
