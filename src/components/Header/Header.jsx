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
      <h2>Product with Confidence</h2>
      <p>
          At TraceMyProduct, we combine cutting-edge technology with industry expertise to ensure that every product you purchase is not only effective but also safe, authentic, and high-quality.
        </p>
        <button onClick={handleViewMenuClick}>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
