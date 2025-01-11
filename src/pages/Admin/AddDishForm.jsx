import React, { useState } from 'react';
import axios from 'axios';

const AddDishForm = ({ setShowForm, refreshDishes }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [ingredientBlockchainIds, setIngredientBlockchainIds] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      price: parseFloat(price),
      ingredientBlockchainIds: ingredientBlockchainIds.split(',').map(id => id.trim())
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
          <label>Ingredient Blockchain IDs (comma-separated):</label>
          <input type="text" value={ingredientBlockchainIds} onChange={(e) => setIngredientBlockchainIds(e.target.value)} required />
        </div>
        <button type="submit">Add Dish</button>
        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddDishForm;