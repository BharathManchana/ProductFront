import React, { useContext, useEffect, useState } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useNavigate } from "react-router-dom";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (food_list && food_list.length > 0) {
      setLoading(false); 
    }
  }, [food_list]);

  const fetchDishHistory = (dishId) => {
    console.log("Requesting dish history for blockchainId:", dishId);
    navigate(`/dish-history/${dishId}`);
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Popular products near you</h2>
      {loading ? (
        <div className="loading-message">
          <div className="bike-animation">
            <img src="./bike.png" alt="loading image" className="bike" />
          </div>
          <p>Loading Data... Please wait!</p>
        </div>
      ) : (
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
                    onClickQualityScore={() =>
                      fetchDishHistory(item.blockchainId)
                    }
                  />
                );
              }
              return null;
            })
          ) : (
            <p>No dishes available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FoodDisplay;
