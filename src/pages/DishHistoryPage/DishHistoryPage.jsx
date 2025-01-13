import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";
import '../DishHistoryPage/DishHistoryPage.css'

const DishHistoryPage = () => {
  const { dishId } = useParams();
  const [dishHistory, setDishHistory] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); 

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (dishHistory) {
      if (jsonEditorRefs.current[0] && !jsonEditorRefs.current[0].editor) {
        const editor = new JSONEditor(jsonEditorRefs.current[0], {
          mode: "tree", 
          search: true, 
          navigationBar: true, 
          statusBar: true,
          onChange: () => {
            document.querySelectorAll('.jsoneditor .jsoneditor-value').forEach(element => {
              element.style.color = '#ff4500';
            });
            document.querySelectorAll('.jsoneditor .jsoneditor-field').forEach(element => {
              element.style.color = '#32cd32';
            });
            document.querySelectorAll('.jsoneditor .jsoneditor-string').forEach(element => {
              element.style.color = '#1e90ff';
            });
            document.querySelectorAll('.jsoneditor .jsoneditor-number').forEach(element => {
              element.style.color = '#ffd700';
            });
          }
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
            onChange: () => {
              document.querySelectorAll('.jsoneditor .jsoneditor-value').forEach(element => {
                element.style.color = '#ff4500';
              });
              document.querySelectorAll('.jsoneditor .jsoneditor-field').forEach(element => {
                element.style.color = '#32cd32';
              });
              document.querySelectorAll('.jsoneditor .jsoneditor-string').forEach(element => {
                element.style.color = '#1e90ff';
              });
              document.querySelectorAll('.jsoneditor .jsoneditor-number').forEach(element => {
                element.style.color = '#ffd700';
              });
            }
          });
          editor.set(history);
        }
      });
    }
  }, [dishHistory]);

  return (
    <div className="dish-history-page">
      {isSmallScreen && (
        <div className="warning-message">
          <p>This content is best viewed on a desktop. For an optimal experience, please switch to a larger screen or enable desktop view on the current device.</p>
        </div>
      )}

      {dishHistory ? (
        <div>
          <h4>Blockchain Transaction</h4>
          <div ref={(el) => (jsonEditorRefs.current[0] = el)} className="jsoneditor-container"></div>

          <h4>Ingredient Histories</h4>
          {dishHistory.ingredientHistories?.map((history, index) => (
            <div key={index} className="ingredient-history">
              <h5>Ingredient {index + 1}</h5>
              <div ref={(el) => (jsonEditorRefs.current[index + 1] = el)} className="jsoneditor-container"></div>
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
