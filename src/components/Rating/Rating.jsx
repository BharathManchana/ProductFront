import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RatingForm = ({ dishId }) => {
  const [foodQuality, setFoodQuality] = useState(0);
  const [taste, setTaste] = useState(0);
  const [ingredientQuality, setIngredientQuality] = useState(0);
  const [averageRatings, setAverageRatings] = useState({
    averageFoodQuality: 0,
    averageTaste: 0,
    correctPercentage: 0,
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get(`https://food-quality-2s5r.onrender.com/api/ingredients/averageRating/${dishId}`)
      .then((response) => {
        setAverageRatings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching average ratings:", error);
      });
  }, [dishId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setSuccessMessage('');

    const ratingData = { foodQuality, taste, ingredientQuality };

    axios.post(`https://food-quality-2s5r.onrender.com/api/ingredients/rate/${dishId}`, ratingData)
      .then((response) => {
        setSuccessMessage('Rating submitted successfully!');
        axios.get(`https://food-quality-2s5r.onrender.com/api/ingredients/averageRating/${dishId}`)
          .then((response) => {
            setAverageRatings(response.data);
          })
          .catch((error) => {
            console.error("Error fetching updated average ratings:", error);
          });
      })
      .catch((error) => {
        console.error('Error submitting rating:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h1>Rate the Dish</h1>
      <p>
        This form is to check whether the data shown in the dish history regarding the ingredients 
        and the dish of the product match the product delivered to you. Please rate the following aspects 
        based on your experience with the delivered dish.
      </p>
      <br />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="foodQuality">Food Quality:</label>
          <input
            type="number"
            id="foodQuality"
            name="foodQuality"
            min="1"
            max="10"
            value={foodQuality}
            onChange={(e) => setFoodQuality(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="taste">Taste:</label>
          <input
            type="number"
            id="taste"
            name="taste"
            min="1"
            max="10"
            value={taste}
            onChange={(e) => setTaste(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="ingredientQuality">Ingredient Quality:</label>
          <input
            type="number"
            id="ingredientQuality"
            name="ingredientQuality"
            min="1"
            max="10"
            value={ingredientQuality}
            onChange={(e) => setIngredientQuality(Number(e.target.value))}
            required
          />
        </div>
        
        <button type="submit" disabled={loading}>Submit Rating</button>
      </form>

      {loading && <p>Please wait... Your rating is being submitted.</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      
      <h2>Average Ratings</h2>
      <p>Food Quality: {averageRatings.averageFoodQuality}%</p>
      <p>Taste: {averageRatings.averageTaste}%</p>
      <p>Ingredient Quality: {averageRatings.correctPercentage}%</p>
    </div>
  );
};

export default RatingForm;
