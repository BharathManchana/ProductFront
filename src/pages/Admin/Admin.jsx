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
    // Fetch all dishes
    axios.get('https://food-quality-2s5r.onrender.com/api/dishes')
      .then(response => setDishes(response.data))
      .catch(error => console.error('Error fetching dishes:', error));

    // Fetch all ingredients
    axios.get('https://food-quality-2s5r.onrender.com/api/ingredients')
      .then(response => setIngredients(response.data))
      .catch(error => console.error('Error fetching ingredients:', error));

    // Fetch latest blockchain transactions (example endpoint, adjust as needed)
    axios.get('https://food-quality-2s5r.onrender.com/api/blockchain/transactions')
      .then(response => setBlockchainTransactions(response.data))
      .catch(error => console.error('Error fetching blockchain transactions:', error));

    // Calculate average freshness and quality scores
    // (implement your logic to calculate these scores)
    setAverageScores({ freshness: 85, quality: 90 });

  }, []);

  const refreshIngredients = () => {
    // Fetch all ingredients again to refresh the list
    axios.get('https://food-quality-2s5r.onrender.com/api/ingredients')
      .then(response => setIngredients(response.data))
      .catch(error => console.error('Error fetching ingredients:', error));
  };

  const refreshDishes = () => {
    // Fetch all dishes again to refresh the list
    axios.get('https://food-quality-2s5r.onrender.com/api/dishes')
      .then(response => setDishes(response.data))
      .catch(error => console.error('Error fetching dishes:', error));
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>Food Quality Admin Dashboard</h1>
        <nav>
          <ul>
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#manage-dishes" onClick={() => setShowManageDishPage(true)}>Manage Dishes</a></li>
            <li><a href="#manage-ingredients">Manage Ingredients</a></li>
            <li><a href="#blockchain-records">Blockchain Records</a></li>
          </ul>
        </nav>
      </header>
      <div className="sidebar">
        <button onClick={() => setShowAddDishForm(true)}>Add Dish</button>
        <button onClick={() => setShowManageDishPage(true)}>Manage Dishes</button>
        <button onClick={() => setShowAddIngredientForm(true)}>Add Ingredient</button>
        <button onClick={() => setShowManageIngredientsPage(true)}>Manage Ingredients</button>
        <button onClick={() => {  DishHistoryPage(true) }}>Blockchain Transactions</button>
      </div>
      <main>
        {showAddDishForm && <AddDishForm setShowForm={setShowAddDishForm} refreshDishes={refreshDishes} />}
        {showAddIngredientForm && <AddIngredientForm setShowForm={setShowAddIngredientForm} refreshIngredients={refreshIngredients} />}
        {showManageDishPage && <ManageDishPage />}
        {showManageIngredientsPage && <ManageIngredientsPage />}
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
            <h3>Latest Blockchain Transactions</h3>
            <ul>
              {blockchainTransactions.slice(0, 5).map(tx => (
                <li key={tx.id}>{tx.description}</li>
              ))}
            </ul>
          </div>
          <div className="widget">
            <h3>Average Freshness Score</h3>
            <p>{averageScores.freshness}</p>
          </div>
          <div className="widget">
            <h3>Average Quality Score</h3>
            <p>{averageScores.quality}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;