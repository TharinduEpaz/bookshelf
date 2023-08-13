import React, { createContext, useState, useEffect, useMemo,useContext } from "react";

const cartContext = createContext();

const initialState = {
  cartItems: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 0,
};

const dummyCartItem = {
  id: 1,
  title: "The Lord of the Rings",
  amount: 1,
  price: 100,
  image:
    "https://images-na.ssl-images-amazon.com/images/I/51%2BkPlbH-UL._SX331_BO1,204,203,200_.jpg",
  stock: 10,
};

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  function getItemQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.amount : 0;
  }

  function addToCart(id, title, price, image, stock, amount) {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      item.amount = item.amount + amount;
      setCartItems([...cartItems]);
    } else {
      setCartItems([...cartItems, { id, title, price, image, stock, amount }]);
    }
  }

  function decreaseItemQuantity(id) {
    if (cartItems.find((item) => item.id === id)?.amount === 1) {
      return cartItems.filter((item) => item.id !== id);
    } else {
      return cartItems.map((item) => {
        if (item.id === id) {
          item.amount = item.amount - 1;
        }
        return item;
      });
    }
  }

  function removeFromCart(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  return (
    <cartContext.Provider value={{ cartItems,getItemQuantity, addToCart,decreaseItemQuantity,removeFromCart }}>
      {children}
    </cartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(cartContext);
};

export { CartProvider, useCartContext };