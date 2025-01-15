import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import "./FoodItem.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import RatingForm from "../Rating/Rating";

const FoodItem = ({
  id,
  name,
  price,
  qualityScore,
  onClickQualityScore,
}) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const [showRatingForm, setShowRatingForm] = useState(false);

  const toggleRatingForm = () => {
    setShowRatingForm(!showRatingForm);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
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

      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating Stars" />
        </div>
        <p className="food-item-price">${price}</p>

        <div className="food-item-scores">
          <span
            className="score unlock-info"
            onClick={onClickQualityScore}
          >
            Quality: {qualityScore}/10{" "}
            <span className="unlock-text">(Unlock more info)</span>
          </span>
        </div>

        <button onClick={toggleRatingForm} className="rate-dish-btn">
          {showRatingForm ? "Close Rating Form" : "Rate This Product"}
        </button>
      </div>

      {showRatingForm &&
        ReactDOM.createPortal(
          <div className="rating-popup">
            <div className="rating-popup-content">
              <button className="close-popup" onClick={toggleRatingForm}>
                &times;
              </button>
              <RatingForm dishId={id} />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};

export default FoodItem;
