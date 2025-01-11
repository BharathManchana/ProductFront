import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageIngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedOrigin, setUpdatedOrigin] = useState('');
  const [updatedExpiryDate, setUpdatedExpiryDate] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');

  useEffect(() => {
    fetchIngredients();
  }, []);

  const fetchIngredients = async () => {
    try {
      const response = await axios.get('https://food-quality-2s5r.onrender.com/api/ingredients');
      setIngredients(response.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  const deleteIngredient = async (blockchainId) => {
    try {
      await axios.delete(`https://food-quality-2s5r.onrender.com/api/ingredients/delete/${blockchainId}`);
      alert('Ingredient deleted successfully!');
      fetchIngredients();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      alert('Failed to delete ingredient.');
    }
  };

  const updateIngredient = async (e) => {
    e.preventDefault();

    const data = {};
    if (updatedName) data.name = updatedName;
    if (updatedDescription) data.description = updatedDescription;
    if (updatedOrigin) data.origin = updatedOrigin;
    if (updatedExpiryDate) data.expiryDate = updatedExpiryDate;
    if (updatedQuantity) data.quantity = parseInt(updatedQuantity, 10);

    try {
      await axios.put(`https://food-quality-2s5r.onrender.com/api/ingredients/update/${selectedIngredient.blockchainId}`, data);
      alert('Ingredient updated successfully!');
      setShowUpdateForm(false);
      fetchIngredients();
    } catch (error) {
      console.error('Error updating ingredient:', error);
      alert('Failed to update ingredient.');
    }
  };

  const viewIngredientTransaction = async (blockchainId) => {
    try {
      const response = await axios.get(`https://food-quality-2s5r.onrender.com/api/ingredients/getIngredientDetails/${blockchainId}`);
      console.log('Ingredient Transaction:', response.data);
      alert('Ingredient transaction fetched successfully! Check the console for details.');
    } catch (error) {
      console.error('Error fetching ingredient transaction:', error);
      alert('Failed to fetch ingredient transaction.');
    }
  };

  const handleUpdateClick = (ingredient) => {
    setSelectedIngredient(ingredient);
    setUpdatedName(ingredient.name || '');
    setUpdatedDescription(ingredient.description || '');
    setUpdatedOrigin(ingredient.origin || '');
    setUpdatedExpiryDate(ingredient.expiryDate || '');
    setUpdatedQuantity(ingredient.quantity || '');
    setShowUpdateForm(true);
  };

  return (
    <div className="manage-ingredients-page">
      <h2>Manage Ingredients</h2>
      {showUpdateForm ? (
        <form onSubmit={updateIngredient}>
          <h3>Update Ingredient</h3>
          <div>
            <label>Name:</label>
            <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          </div>
          <div>
            <label>Description:</label>
            <input type="text" value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
          </div>
          <div>
            <label>Origin:</label>
            <input type="text" value={updatedOrigin} onChange={(e) => setUpdatedOrigin(e.target.value)} />
          </div>
          <div>
            <label>Expiry Date:</label>
            <input type="date" value={updatedExpiryDate} onChange={(e) => setUpdatedExpiryDate(e.target.value)} />
          </div>
          <div>
            <label>Quantity:</label>
            <input type="number" value={updatedQuantity} onChange={(e) => setUpdatedQuantity(e.target.value)} />
          </div>
          <button type="submit">Update Ingredient</button>
          <button type="button" onClick={() => setShowUpdateForm(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <ul>
            {ingredients.map(ingredient => (
              <li key={ingredient.blockchainId}>
                <span>{ingredient.name} - {ingredient.quantity} units</span>
                <button onClick={() => handleUpdateClick(ingredient)}>Update</button>
                <button onClick={() => deleteIngredient(ingredient.blockchainId)}>Delete</button>
                <button onClick={() => viewIngredientTransaction(ingredient.blockchainId)}>View Transaction</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageIngredientsPage;
