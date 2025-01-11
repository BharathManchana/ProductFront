import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDishPage = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedIngredients, setUpdatedIngredients] = useState('');

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('https://food-quality-2s5r.onrender.com/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const deleteDish = async (blockchainId) => {
    try {
      await axios.delete(`https://food-quality-2s5r.onrender.com/api/dishes/delete/${blockchainId}`);
      alert('Dish deleted successfully!');
      fetchDishes();
    } catch (error) {
      console.error('Error deleting dish:', error);
      alert('Failed to delete dish.');
    }
  };

  const updateDish = async (e) => {
    e.preventDefault();
    const data = {};

    // Only include fields that are provided
    if (updatedName) data.name = updatedName;
    if (updatedPrice) data.price = parseFloat(updatedPrice);
    if (updatedIngredients) {
      data.ingredientBlockchainIds = updatedIngredients
        .split(',')
        .map(id => id.trim());
    }

    console.log('Updating dish with data:', data); // Debug logging

    try {
      await axios.put(`https://food-quality-2s5r.onrender.com/api/dishes/update/${selectedDish.blockchainId}`, data);
      alert('Dish updated successfully!');
      setShowUpdateForm(false);
      fetchDishes();
    } catch (error) {
      console.error('Error updating dish:', error);
      alert('Failed to update dish.');
    }
  };

  const viewDishHistory = async (blockchainId) => {
    try {
      const response = await axios.get(`https://food-quality-2s5r.onrender.com/api/dishes/dishHistory/${blockchainId}`);
      console.log('Dish History:', response.data);
      alert('Dish history fetched successfully! Check the console for details.');
    } catch (error) {
      console.error('Error fetching dish history:', error);
      alert('Failed to fetch dish history.');
    }
  };

  const handleUpdateClick = (dish) => {
    setSelectedDish(dish);
    setUpdatedName(dish.name);
    setUpdatedPrice(dish.price);
    setUpdatedIngredients(dish.ingredients.map(ingredient => ingredient.blockchainId).join(','));
    setShowUpdateForm(true);
  };

  return (
    <div className="manage-dish-page">
      <h2>Manage Dishes</h2>
      {showUpdateForm ? (
        <form onSubmit={updateDish}>
          <h3>Update Dish</h3>
          <div>
            <label>Name:</label>
            <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          </div>
          <div>
            <label>Price:</label>
            <input type="number" value={updatedPrice} onChange={(e) => setUpdatedPrice(e.target.value)} />
          </div>
          <div>
            <label>Ingredient Blockchain IDs (comma-separated):</label>
            <input type="text" value={updatedIngredients} onChange={(e) => setUpdatedIngredients(e.target.value)} />
          </div>
          <button type="submit">Update Dish</button>
          <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <ul>
            {dishes.map(dish => (
              <li key={dish.blockchainId}>
                <span>{dish.name} - ${dish.price}</span>
                <button onClick={() => handleUpdateClick(dish)}>Update</button>
                <button onClick={() => deleteDish(dish.blockchainId)}>Delete</button>
                <button onClick={() => viewDishHistory(dish.blockchainId)}>View History</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageDishPage;
