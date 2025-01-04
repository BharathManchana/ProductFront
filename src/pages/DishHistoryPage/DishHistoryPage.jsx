// DishHistoryPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const DishHistoryPage = () => {
  const { dishId } = useParams();
  const [dishHistory, setDishHistory] = useState(null);

  useEffect(() => {
    const fetchDishHistory = async () => {
      try {
        const response = await axios.get(
          `https://food-quality-2s5r.onrender.com/api/dishes/dishHistory/${dishId}`
        );
        setDishHistory(response.data);
      } catch (error) {
        toast.error("Error fetching dish history.");
      }
    };

    fetchDishHistory();
  }, [dishId]);

  // Recursive function to render data in a tree-like view
  const renderTree = (data) => {
    if (typeof data !== 'object' || data === null) {
      return <span>{data}</span>;
    }

    return (
      <ul>
        {Object.keys(data).map((key) => (
          <li key={key}>
            <strong>{key}:</strong>
            {Array.isArray(data[key]) ? (
              <ul>
                {data[key].map((item, index) => (
                  <li key={index}>{renderTree(item)}</li>
                ))}
              </ul>
            ) : (
              renderTree(data[key])
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="dish-history-page">
      <h3>Dish History</h3>
      {dishHistory ? (
        <>
          <p><strong>Name:</strong> {dishHistory.dish.name}</p>
          <p><strong>Price:</strong> ${dishHistory.dish.price}</p>
          <p><strong>Ingredients:</strong> {dishHistory.dish.ingredients?.map((ingredientId, index) => (
            <span key={index}>{ingredientId}</span>
          ))}</p>
          <p><strong>Blockchain Transaction:</strong></p>
          {renderTree(dishHistory.blockchainTransaction)}

          <h4>Ingredient Histories</h4>
          {dishHistory.ingredientHistories?.map((history, index) => (
            <div key={index}>
              <h5>Ingredient {index + 1}</h5>
              {renderTree(history)}
            </div>
          ))}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DishHistoryPage;
