import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDishPage = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedDish, setSelectedDish] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchDishes();
    fetchIngredients();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('https://food-quality-2s5r.onrender.com/api/dishes');
      setDishes(response.data);
    } catch (error) {
      console.error('Error fetching dishes:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('https://food-quality-2s5r.onrender.com/api/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const handleIngredientChange = (ingredientId) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredientId) ? prev.filter(id => id !== ingredientId) : [...prev, ingredientId]
    );
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
    const data = {
      name: updatedName,
      price: parseFloat(updatedPrice),
      ingredientBlockchainIds: selectedIngredients
    };

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

  const handleUpdateClick = (dish) => {
    setSelectedDish(dish);
    setUpdatedName(dish.name);
    setUpdatedPrice(dish.price);
    setSelectedIngredients(dish.ingredients.map(ingredient => ingredient.blockchainId));
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
            <label>Ingredients:</label>
            {ingredients.map(ingredient => (
              <div key={ingredient.blockchainId}>
                <input
                  type="checkbox"
                  id={ingredient.blockchainId}
                  value={ingredient.blockchainId}
                  checked={selectedIngredients.includes(ingredient.blockchainId)}
                  onChange={() => handleIngredientChange(ingredient.blockchainId)}
                />
                <label htmlFor={ingredient.blockchainId}>{ingredient.name}</label>
              </div>
            ))}
          </div>
          <button type="submit">Update Dish</button>
          <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          {dishes.map(dish => (
            <div key={dish.blockchainId}>
              <h3>{dish.name}</h3>
              <button onClick={() => handleUpdateClick(dish)}>Update</button>
              <button onClick={() => deleteDish(dish.blockchainId)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageDishPage;