import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageIng.css'; 

const ManageIngredientsPage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedExpiryDate, setUpdatedExpiryDate] = useState('');
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

  const deleteIngredient = async (blockchainId) => {
    try {
      setIsLoading(true);
      await axios.delete(`https://food-quality-2s5r.onrender.com/api/ingredients/delete/${blockchainId}`);
      alert('Ingredient deleted successfully!');
      fetchIngredients();
    } catch (error) {
      console.error('Error deleting ingredient:', error);
      alert('Failed to delete ingredient.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateIngredient = async (e) => {
    e.preventDefault();

    const data = {};
    if (updatedName) data.name = updatedName;
    if (updatedExpiryDate) data.expiryDate = updatedExpiryDate;

    try {
      setIsLoading(true);
      await axios.put(`https://food-quality-2s5r.onrender.com/api/ingredients/update/${selectedIngredient.blockchainId}`, data);
      alert('Ingredient updated successfully!');
      setShowUpdateForm(false);
      fetchIngredients();
    } catch (error) {
      console.error('Error updating ingredient:', error);
      alert('Failed to update ingredient.');
    } finally {
      setIsLoading(false);
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
    setUpdatedExpiryDate(ingredient.expiryDate || '');
    setShowUpdateForm(true);
  };

  return (
    <div className="manage-ingredients-page">
      <h2>Manage Ingredients</h2>
      {isLoading && <div className="popup-message">Please wait...</div>}
      {showUpdateForm ? (
        <div className="update-form-container">
          <form onSubmit={updateIngredient}>
            <h3>Update Ingredient</h3>
            <div>
              <label>Name:</label>
              <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
            </div>
            <div>
              <label>Expiry Date:</label>
              <input type="date" value={updatedExpiryDate} onChange={(e) => setUpdatedExpiryDate(e.target.value)} />
            </div>
            <div>
              <button type="submit">Update Ingredient</button>
              <button type="button" onClick={() => setShowUpdateForm(false)} className="close-button">Close</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="ingredients-list">
          <ul>
            {ingredients.map(ingredient => (
              <li key={ingredient.blockchainId}>
                <div>
                  <h4>{ingredient.name}</h4>
                  <p>Expiry Date: {new Date(ingredient.expiryDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <button onClick={() => handleUpdateClick(ingredient)}>Update</button>
                  <button onClick={() => deleteIngredient(ingredient.blockchainId)}>Delete</button>
                  <button onClick={() => viewIngredientTransaction(ingredient.blockchainId)}>View Transaction</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ManageIngredientsPage;
