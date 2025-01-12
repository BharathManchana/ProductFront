import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactJson from 'react-json-view';

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

  return (
    <div className="dish-history-page">
      {dishHistory ? (
        <>
          <div className="box">
            <h4>Blockchain Transaction</h4>
            <ReactJson src={dishHistory.blockchainTransaction} theme="rjv-default" collapsed={1} />
          </div>

          <div className="box">
            <h4>Ingredient Histories</h4>
            {dishHistory.ingredientHistories?.map((history, index) => (
              <div key={index} className="ingredient-history">
                <h5>Ingredient {index + 1}</h5>
                <ReactJson src={history} theme="rjv-default" collapsed={1} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DishHistoryPage;
