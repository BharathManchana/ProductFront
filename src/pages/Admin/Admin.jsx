import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import AddDishForm from './AddDishForm';
import AddIngredientForm from './AddIngForm';
import ManageDishPage from './ManageDish';
import ManageIngredientsPage from './ManageIng';
import Blockchain from '../ViewBlockchain/block';

const AdminDashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [averageScores, setAverageScores] = useState({ freshness: 0, quality: 0 });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [showAddDishForm, setShowAddDishForm] = useState(false);
  const [showAddIngredientForm, setShowAddIngredientForm] = useState(false);
  const [showManageDishPage, setShowManageDishPage] = useState(false);
  const [showManageIngredientsPage, setShowManageIngredientsPage] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    axios.get('https://food-quality-2s5r.onrender.com/api/dishes')
      .then(response => {
        const reversedDishes = response.data.reverse();
        setDishes(reversedDishes);
      })
      .catch(error => console.error('Error fetching dishes:', error));

    axios.get('https://food-quality-2s5r.onrender.com/api/ingredients')
      .then(response => {
        const reversedIngredients = response.data.reverse();
        setIngredients(reversedIngredients);
      })
      .catch(error => console.error('Error fetching ingredients:', error));

    setAverageScores({ freshness: 85, quality: 90 });

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const sortData = (data, key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    return sortedData;
  };

  const handleDishSort = (key) => {
    setDishes(sortData(dishes, key));
  };

  const handleIngredientSort = (key) => {
    setIngredients(sortData(ingredients, key));
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return '';
    return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
  };

  return (
    <div className="admin-dashboard">
      <header>
        <h1>TraceMy Meal Admin Dashboard</h1>
      </header>

      {isSmallScreen && (
        <div className="small-screen-warning">
          <p>This content is best viewed on a desktop. For an optimal experience, please switch to a larger screen or enable desktop view on the current device.</p>
        </div>
      )}

      <div className="dashboard-container">
        <div className="sidebar">
          <button onClick={() => setShowAddDishForm(true)}>Add Dish</button>
          <button onClick={() => setShowManageDishPage(true)}>Manage Dishes</button>
          <button onClick={() => setShowAddIngredientForm(true)}>Add Ingredient</button>
          <button onClick={() => setShowManageIngredientsPage(true)}>Manage Ingredients</button>
          <button onClick={() => navigate('/blockchain-history')}>Blockchain Transactions</button>
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
        {showAddDishForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowAddDishForm(false)}>&times;</span>
              <AddDishForm setShowForm={setShowAddDishForm} refreshDishes={() => setDishes([...dishes])} />
            </div>
          </div>
        )}
        {showAddIngredientForm && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowAddIngredientForm(false)}>&times;</span>
              <AddIngredientForm setShowForm={setShowAddIngredientForm} refreshIngredients={() => setIngredients([...ingredients])} />
            </div>
          </div>
        )}
        {showManageDishPage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowManageDishPage(false)}>&times;</span>
              <ManageDishPage />
            </div>
          </div>
        )}
        {showManageIngredientsPage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={() => setShowManageIngredientsPage(false)}>&times;</span>
              <ManageIngredientsPage />
            </div>
          </div>
        )}

        <h2>Dishes</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th onClick={() => handleDishSort('name')}>Name {getSortArrow('name')}</th>
                <th onClick={() => handleDishSort('blockchainId')}>Blockchain ID {getSortArrow('blockchainId')}</th>
                <th onClick={() => handleDishSort('qualityScore')}>Quality Score {getSortArrow('qualityScore')}</th>
              </tr>
            </thead>
            <tbody>
              {dishes.length > 0 ? (
                dishes.map((dish, index) => (
                  <tr key={dish._id}>
                    <td>{index + 1}</td>
                    <td>{dish.name}</td>
                    <td>{dish.blockchainId}</td>
                    <td>{dish.qualityScore}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No dishes available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <h2>Ingredients</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Sno</th>
                <th onClick={() => handleIngredientSort('name')}>Name {getSortArrow('name')}</th>
                <th onClick={() => handleIngredientSort('blockchainId')}>Blockchain ID {getSortArrow('blockchainId')}</th>
                <th onClick={() => handleIngredientSort('description')}>Description {getSortArrow('description')}</th>
                <th onClick={() => handleIngredientSort('origin')}>Origin {getSortArrow('origin')}</th>
                <th onClick={() => handleIngredientSort('expiryDate')}>Expiry Date {getSortArrow('expiryDate')}</th>
                <th onClick={() => handleIngredientSort('qualityScore')}>Quality Score {getSortArrow('qualityScore')}</th>
              </tr>
            </thead>
            <tbody>
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, index) => (
                  <tr key={ingredient._id}>
                    <td>{index + 1}</td>
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
                  <td colSpan="7">No ingredients available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
