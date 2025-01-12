import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import Blockchain from "./pages/ViewBlockchain/block";
import DishHistoryPage from "./pages/DishHistoryPage/DishHistoryPage";
import AdminDashboard from "./pages/Admin/Admin";
import About from "./pages/About/About"
import FoodDisplay from "./components/FoodDisplay/FoodDisplay"

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/blockchain-history" element={<Blockchain />} />
          <Route path="/dish-history/:dishId" element={<DishHistoryPage />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/About" element={<About />} />
          <Route path="/food" element={<FoodDisplay />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
