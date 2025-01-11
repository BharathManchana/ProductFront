import React, { useState } from 'react';
import axios from 'axios';

const AddIngredientForm = ({ setShowForm, refreshIngredients }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [origin, setOrigin] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      origin,
      expiryDate,
      quantity: parseInt(quantity, 10)
    };

    try {
      await axios.post('https://food-quality-2s5r.onrender.com/api/ingredients/add', data);
      alert('Ingredient added successfully!');
      setShowForm(false);
      refreshIngredients();
    } catch (error) {
      console.error('Error adding ingredient:', error);
      alert('Failed to add ingredient.');
    }
  };

  return (
    <div className="add-ingredient-form">
      <h2>Add New Ingredient</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Origin:</label>
          <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
        </div>
        <div>
          <label>Expiry Date:</label>
          <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
        </div>
        <div>
          <label>Quantity:</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <button type="submit">Add Ingredient</button>
        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default AddIngredientForm;