import { calc } from "@chakra-ui/react";
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
  
    const localStorageKey = "cartItems";
    
    const [cartItems, setCartItems] = useState(() => {
        const storedCartItems = localStorage.getItem(localStorageKey);
        return storedCartItems ? JSON.parse(storedCartItems) : initialState.cartItems;
      });
      const [totalPrice, setTotalPrice] = useState(0)
    
      useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(cartItems));
        calculateTotalPrice();
      }, [cartItems]);

  function getItemQuantity(id) {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.amount : 0;
  }

  function addToCart(id, title, price, image, stock, amount) {
  
      setTotalPrice(totalPrice + amount*price);
      setCartItems([...cartItems, { id, title, price, image, stock, amount }]);
  
  }

  function changeItemQuantity (id, amount) {
    const item = cartItems.find((item) => item.id === id);
    setTotalPrice(totalPrice + (amount-item.amount)*item.price);

    if (item) {
      item.amount = amount;
      }
    }

    function calculateTotalPrice() {
      let total = 0;
      cartItems.forEach((item) => {
        total += item.price * item.amount;
      });
      setTotalPrice(total);
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

    setTotalPrice(totalPrice - cartItems.find((item) => item.id === id).price*cartItems.find((item) => item.id === id).amount);
    setCartItems(cartItems.filter((item) => item.id !== id));

  }

  return (
    <cartContext.Provider value={{ cartItems,getItemQuantity, addToCart,decreaseItemQuantity,removeFromCart, totalPrice,changeItemQuantity }}>
      {children}
    </cartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(cartContext);
};

export { CartProvider, useCartContext };