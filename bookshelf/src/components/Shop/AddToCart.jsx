import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import { useCartContext } from "../../context/cartContext";
 import { userContext } from "../../context/userContext";
import { Link, Navigate } from "react-router-dom";


function AddToCart(props) {
    const { cartItems, getItemQuantity, addToCart,decreaseItemQuantity,removeFromCart } = useCartContext();
    const {amount,bookId,title,price,image,stock} = props;
    const {user} = useContext(userContext);



    
    console.log(cartItems);
    
  return (
    <>
    
      <Button
        leftIcon={<BsCart />}
        colorScheme="blue"
        variant="solid"
        borderRadius={10}
        w={200}
        onClick={() => {addToCart(bookId,title,price,image,stock,amount)}}
      >
        Add To Cart
      </Button> 
       
     
     
       
    </>
  );
}

export default AddToCart;
