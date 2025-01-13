import React, { useContext, useState } from "react";
import "./Navbar.css";
import { assets } from "../../assets/frontend_assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLinkClick = (menu) => {
    setMenu(menu);
    setSidebarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="logo" />
      </Link>
      <div className="navbar-toggle" onClick={toggleSidebar}>
        <img src={assets.menu_icon} alt="Menu Icon" className="menu-icon" />
      </div>
      <ul className={`navbar-menu ${sidebarOpen ? "active" : ""}`}>
        <Link
          to="/"
          onClick={() => handleLinkClick("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <Link
          to="/food"
          onClick={() => handleLinkClick("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </Link>
        <Link
          to="/blockchain-history"
          onClick={() => handleLinkClick("View Blockchain History")}
          className={menu === "View Blockchain History" ? "active" : ""}
        >
          View Blockchain History
        </Link>
        <Link
          to="/about"
          onClick={() => handleLinkClick("about")}
          className={menu === "about" ? "active" : ""}
        >
          About Us
        </Link>
        <Link
          to="/admin"
          onClick={() => handleLinkClick("admin")}
          className={menu === "admin" ? "active" : ""}
        >
          Admin Page
        </Link>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search Icon" />
        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="Basket Icon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        ) : (
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="Profile Icon" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate("/myorders")}>
                <img src={assets.bag_icon} alt="Orders Icon" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout Icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
