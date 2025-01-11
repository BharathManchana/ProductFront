import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Admin.css';
import AddDishForm from './AddDishForm';
import AddIngredientForm from './AddIngForm';
import ManageDishPage from './ManageDish';
import ManageIngredientsPage from './ManageIng';
import DishHistoryPage from "../DishHistoryPage/DishHistoryPage";

const AdminDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [blockchainTransactions, setBlockchainTransactions] = useState([]);
  const [averageScores, setAverageScores] = useState({ freshness: 0, quality: 0 });
  const [showAddDishForm, setShowAddDishForm] = useState(false);
  const [showAddIngredientForm, setShowAddIngredientForm] = useState(false);
  const [showManageDishPage, setShowManageDishPage] = useState(false);
  const [showManageIngredientsPage, setShowManageIngredientsPage] = useState(false);

  useEffect(() => {
    axios.get('https://food-quality-2s5r.onrender.com/api/dishes')
      .then(response => setDishes(response.data))
      .catch(error => console.error('Error fetching dishes:', error));

    axios.get('https://food-quality-2s5r.onrender.com/api/ingredients')
      .then(response => setIngredients(response.data))
      .catch(error => console.error('Error fetching ingredients:', error));

    axios.get('https://food-quality-2s5r.onrender.com/api/blockchain/transactions')
      .then(response => setBlockchainTransactions(response.data))
      .catch(error => console.error('Error fetching blockchain transactions:', error));

    setAverageScores({ freshness: 85, quality: 90 });

  }, []);

  const refreshIngredients = () => {
    axios.get('https://food-quality-2s5r.onrender.com/api/ingredients')
      .then(response => setIngredients(response.data))
      .catch(error => console.error('Error fetching ingredients:', error));
  };

  const refreshDishes = () => {
    axios.get('https://food-quality-2s5r.onrender.com/api/dishes')
      .then(response => setDishes(response.data))
      .catch(error => console.error('Error fetching dishes:', error));
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>TraceMy Meal Admin Dashboard</h1>
      </header>
      <div className="dashboard-container">
        <div className="sidebar">
          <button onClick={() => setShowAddDishForm(true)}>Add Dish</button>
          <button onClick={() => setShowManageDishPage(true)}>Manage Dishes</button>
          <button onClick={() => setShowAddIngredientForm(true)}>Add Ingredient</button>
          <button onClick={() => setShowManageIngredientsPage(true)}>Manage Ingredients</button>
          <button onClick={() => { DishHistoryPage(true); }}>Blockchain Transactions</button>
        </div>
        <div className="summary-widgets">
          <div className="widget">
            <h3>Total Dishes</h3>
            <p>{dishes.length}</p>
          </div>
          <div className="widget">
            <h3>Total Ingredients</h3>
            <p>{ingredients.length}</p>
          </div>
          <div className="widget">
            <h3>Average Quality Score</h3>
            <p>{averageScores.quality}</p>
          </div>
        </div>
      </div>
      <main>
        {showAddDishForm && <AddDishForm setShowForm={setShowAddDishForm} refreshDishes={refreshDishes} />}
        {showAddIngredientForm && <AddIngredientForm setShowForm={setShowAddIngredientForm} refreshIngredients={refreshIngredients} />}
        {showManageDishPage && <ManageDishPage />}
        {showManageIngredientsPage && <ManageIngredientsPage />}
        
        <h2>Dishes</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blockchain ID</th>
              <th>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            {dishes.length > 0 ? (
              dishes.map((dish) => (
                <tr key={dish._id}>
                  <td>{dish.name}</td>
                  <td>{dish.blockchainId}</td>
                  <td>{dish.qualityScore}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No dishes available</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Ingredients</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blockchain ID</th>
              <th>Description</th>
              <th>Origin</th>
              <th>Expiry Date</th>
              <th>Quality Score</th>
            </tr>
          </thead>
          <tbody>
            {ingredients.length > 0 ? (
              ingredients.map((ingredient) => (
                <tr key={ingredient._id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.blockchainId}</td>
                  <td>{ingredient.description}</td>
                  <td>{ingredient.origin}</td>
                  <td>{new Date(ingredient.expiryDate).toLocaleDateString()}</td>
                  <td>{ingredient.qualityScore}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No ingredients available</td>
              </tr>
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default AdminDashboard;
