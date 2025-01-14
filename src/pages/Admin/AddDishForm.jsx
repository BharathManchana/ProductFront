import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddDishForm = ({ setShowForm, refreshDishes }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://food-quality-2s5r.onrender.com/api/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIngredientChange = (ingredientId) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientId) ? prev.filter(id => id !== ingredientId) : [...prev, ingredientId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      name,
      price: parseFloat(price),
      ingredientBlockchainIds: selectedIngredients
    };

    try {
      setIsLoading(true);
      await axios.post('https://food-quality-2s5r.onrender.com/api/dishes/add', data);
      alert('Dish added successfully!');
      setShowForm(false);
      refreshDishes();
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Failed to add dish.');
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="add-dish-form">
      {isLoading && (
        <div className="popup-message">
          <p>Please wait...</p>
        </div>
      )}
      <h2>Add New Dish</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Ingredients:</label>
          {ingredients.map(ingredient => (
            <div key={ingredient.blockchainId}>
              <input
                type="checkbox"
                id={ingredient.blockchainId}
                value={ingredient.blockchainId}
                onChange={() => handleIngredientChange(ingredient.blockchainId)}
              />
              <label htmlFor={ingredient.blockchainId}>{ingredient.name}</label>
            </div>
          ))}
        </div>
        <button type="submit" disabled={isSubmitting}>Add Dish</button>
        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddDishForm;
