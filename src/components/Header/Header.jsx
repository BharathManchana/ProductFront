import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./Header.css";

const Header = () => {
  const navigate = useNavigate(); 

  const handleViewMenuClick = () => {
    navigate("/food"); 
  };

  return (
    <div className="header">
      <div className="header-contents">
        <h2>Meal with Confidence</h2>
        <p>
        At TraceMyMeal, we combine cutting-edge technology with culinary expertise to ensure that every meal you order is not only mouthwatering but also safe, authentic, and health-conscious.
        </p>
        <button onClick={handleViewMenuClick}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
