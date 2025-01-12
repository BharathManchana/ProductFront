import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();

  const fetchDishHistory = (dishId) => {
    console.log("Requesting dish history for blockchainId:", dishId);
    navigate(`/dish-history/${dishId}`);
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list && food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  qualityScore={item.qualityScore}
                  onClickQualityScore={() => fetchDishHistory(item.blockchainId)}
                />
              );
            }
            return null;
          })
        ) : (
          <p>No dishes available</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
