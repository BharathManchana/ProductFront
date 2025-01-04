import React, { useContext } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);
  const navigate = useNavigate(); // Create a navigate instance to navigate

  // Fetch dish history on click
  const fetchDishHistory = (dishId) => {
    console.log("Requesting dish history for blockchainId:", dishId); // Log the blockchainId (request id)
    navigate(`/dish-history/${dishId}`); // Navigate to the DishHistoryPage with the dishId as a URL parameter
  };

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {/* Ensure food_list is defined and not empty */}
        {food_list && food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                  qualityScore={item.qualityScore} // Added Quality Score
                  freshnessScore={item.freshnessScore} // Added Freshness Score
                  onClickQualityScore={() => fetchDishHistory(item.blockchainId)} // Trigger navigation on click of Quality Score
                  onClickFreshnessScore={() => fetchDishHistory(item.blockchainId)} // Trigger navigation on click of Freshness Score
                />
              );
            }
            return null;
          })
        ) : (
          <p>No dishes available</p> // Display message if food_list is empty or undefined
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
