import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css"; // Import the CSS for JSONEditor


const DishHistoryPage = () => {
  const { dishId } = useParams();
  const [dishHistory, setDishHistory] = useState(null);
  const jsonEditorRefs = useRef([]); // Ref to manage multiple JSON editors

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
      // Initialize JSONEditor for main dish history
      if (jsonEditorRefs.current[0] && !jsonEditorRefs.current[0].editor) {
        const editor = new JSONEditor(jsonEditorRefs.current[0], {
          mode: "tree", // Set the mode to 'tree' to render as a hierarchical structure
          search: true, // Enable search functionality
          navigationBar: true, // Show navigation bar
          statusBar: true, // Show status bar
        });
        editor.set(dishHistory); // Set the JSON data in the editor
      }

      // Initialize JSONEditor for ingredient histories
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
          {/* Render the JSONEditor tree view for dish history */}
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
