import { useState } from "react";
import CartContext from "../context/CartContext";

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState([]); 

  const addToCart = (item) => {
    const exists = cartItem.find((c) => c._id === item._id);
    if (exists) return;

    setCartItem((prev) => [...prev, { ...item, status: "Pending" }]);
  };

  const removeFromCart = (id) => {
    setCartItem((prev) => prev.filter((item) => item._id !== id));
  };

  const updateOrderStatus = (id, status) => {
    setCartItem((prev) =>
      prev.map((item) => (item._id === id ? { ...item, status } : item))
    );
  };
  return (
    <CartContext.Provider value={{ cartItem, addToCart, removeFromCart, updateOrderStatus }}>
      {children}
    </CartContext.Provider>
  );
};

