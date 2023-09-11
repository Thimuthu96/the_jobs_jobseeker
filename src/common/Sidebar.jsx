import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
// import { BsCardChecklist } from "react-icons/bs";
// import { MdOutlineEventAvailable } from "react-icons/md";
// import { logout, auth } from "../services/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../utils/db";

//components

const Sidebar = () => {
  const navLinksActive = ({ isActive }) => {
    return {
      color: isActive ? "#fff" : "#000",
      backgroundColor: isActive ? "#FE724C" : "transparent",
    };
  };

  // const [user, loading, error] = useAuthState(auth);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isNavLinkActive = (path) => {
    return location.pathname === path;
  };

  const handleLogOut = () => {
    logout(auth);
    localStorage.setItem("userRole", null);
    localStorage.setItem("userRole", null);
    // toast.success("Logged out successfully!", {
    //   position: "bottom-right",
    // });
  };

  //   useEffect(() => {
  //     if (loading) return;
  //     if (!user) return navigate("/login");
  //     // fetchUserName();
  //   }, [user, loading]);

  return (
    <div className="navbar-container">
      <div className="logo-img">
        <h2>The Jobs</h2>
      </div>
      <div className="navigation-area">
        <NavLink
          style={navLinksActive({ isActive: isNavLinkActive("/admin") })}
          className="links"
          to="/admin"
        >
          <Typography>Appointments</Typography>
        </NavLink>
        <NavLink
          style={navLinksActive({
            isActive: isNavLinkActive("/admin/availability"),
          })}
          className="links"
          to="/admin/availability"
        >
          <Typography>Availability</Typography>
        </NavLink>

        <hr />
        <div className="space"></div>
        <NavLink
          style={navLinksActive}
          className="links"
          onClick={() => logout()}
        >
          <FiLogOut />
          <Typography>LogOut</Typography>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
