import React from "react";
import { useNavigate } from "react-router-dom"; 
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  const navigate = useNavigate(); 

  const handleItemClick = (item) => {
    setCategory((prev) => (prev === item.menu_image.name ? "All" : item.menu_name));
    navigate("/food");
  };

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
      Choose from a diverse selection featuring a range of premium products. Our
      mission is to cater to your needs and elevate your experience, one high-quality product at a time.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div 
              onClick={() => handleItemClick(item)} 
              key={index} 
              className="explore-menu-list-item"
            >
              <img 
                className={category === item.menu_name ? "active" : ""} 
                src={item.menu_image} 
                alt="" 
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
