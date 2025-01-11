import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

const DishHistoryPage = () => {
  const { dishId } = useParams();
  const [dishHistory, setDishHistory] = useState(null);
  const jsonEditorRefs = useRef([]);

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

  useEffect(() => {
    if (dishHistory) {
      if (jsonEditorRefs.current[0] && !jsonEditorRefs.current[0].editor) {
        const editor = new JSONEditor(jsonEditorRefs.current[0], {
          mode: "tree",
          search: true,
          navigationBar: true,
          statusBar: true,
        });
        editor.set(dishHistory);
      }

      dishHistory.ingredientHistories?.forEach((history, index) => {
        if (jsonEditorRefs.current[index + 1] && !jsonEditorRefs.current[index + 1].editor) {
          const editor = new JSONEditor(jsonEditorRefs.current[index + 1], {
            mode: "tree",
            search: true,
            navigationBar: true,
            statusBar: true,
          });
          editor.set(history);
        }
      });
    }
  }, [dishHistory]);

  return (
    <div className="dish-history-page">
      {dishHistory ? (
        <div>
          <h4 style={{ marginTop: "0" }}>Blockchain Transaction</h4>
          <div ref={(el) => (jsonEditorRefs.current[0] = el)} style={{ height: "400px", marginBottom: "20px" }}></div>

          <h4>Ingredient Histories</h4>
          {dishHistory.ingredientHistories?.map((history, index) => (
            <div key={index} style={{ marginTop: "20px" }}>
              <h5>Ingredient {index + 1}</h5>
              <div ref={(el) => (jsonEditorRefs.current[index + 1] = el)} style={{ height: "400px", marginBottom: "20px" }}></div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default DishHistoryPage;
