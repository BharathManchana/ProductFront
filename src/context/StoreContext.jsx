import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFoodList] = useState([]);
  const [token, setToken] = useState("");
  const url = "https://food-delivery-backend-5b6g.onrender.com"; 

  // Add item to cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      const response = await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Item Added to Cart");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    if (cartItems[itemId] > 1) {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const newCartItems = { ...cartItems };
      delete newCartItems[itemId];
      setCartItems(newCartItems);
    }

    if (token) {
      const response = await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success("Item Removed from Cart");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // Get the total cart amount
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Fetch food list from the new API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get("https://food-quality-2s5r.onrender.com/api/dishes");
      // console.log("Response data in StoreContext is ", response);
      if (response.data) {
        const fetchedDishes = response.data.map((dish) => ({
          _id: dish._id,
          blockchainId: dish.blockchainId, // Store blockchainId as well
          name: dish.name,
          price: dish.price,
          description: dish.ingredients.map((ingredient) => ingredient.name).join(", "),
          image: dish.blockchainId, // You can update this to reflect the actual image path
          qualityScore: dish.qualityScore,
          freshnessScore: dish.ingredients[0].freshnessScore, // Assuming freshness score is from the first ingredient
        }));
        setFoodList(fetchedDishes);
      } else {
        toast.error("Failed to load dishes.");
      }
    } catch (error) {
      toast.error("Error fetching dishes.");
    }
  };

  // Load cart data
  const loadCardData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList(); // Fetch dishes from the external API
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCardData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
