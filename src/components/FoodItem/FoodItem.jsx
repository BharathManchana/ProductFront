import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({
  id,
  name,
  description,
  price,
  image,
  qualityScore,
  freshnessScore,
  onClickQualityScore,
  onClickFreshnessScore,
}) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className="food-item">
      {/* Image and Cart Controls */}
      <div className="food-item-img-container">
        <img src={image} alt={name} className="food-item-image" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more to Cart"
            />
          </div>
        )}
      </div>

      {/* Food Information */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_stars} alt="Rating Stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>

        {/* Scores Section */}
        <div className="food-item-scores">
          <span
            className="score"
            onClick={onClickQualityScore} // Trigger API when clicked
            style={{ cursor: "pointer", marginRight: "10px" }}
          >
            Quality: {qualityScore}/10
          </span>
          <span
            className="score"
            onClick={onClickFreshnessScore} // Trigger API when clicked
            style={{ cursor: "pointer" }}
          >
            Freshness: {freshnessScore}/10
          </span>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
