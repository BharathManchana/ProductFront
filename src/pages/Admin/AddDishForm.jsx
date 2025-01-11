import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddDishForm = ({ setShowForm, refreshDishes }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    axios.get('https://food-quality-2s5r.onrender.com/api/ingredients')
      .then(response => setIngredients(response.data))
      .catch(error => console.error('Error fetching ingredients:', error));
  }, []);

  const handleIngredientChange = (ingredientId) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientId) ? prev.filter(id => id !== ingredientId) : [...prev, ingredientId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      price: parseFloat(price),
      ingredientBlockchainIds: selectedIngredients
    };

    try {
      await axios.post('https://food-quality-2s5r.onrender.com/api/dishes/add', data);
      alert('Dish added successfully!');
      setShowForm(false);
      refreshDishes();
    } catch (error) {
      console.error('Error adding dish:', error);
      alert('Failed to add dish.');
    }
  };

  return (
    <div className="add-dish-form">
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
        <button type="submit">Add Dish</button>
        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddDishForm;