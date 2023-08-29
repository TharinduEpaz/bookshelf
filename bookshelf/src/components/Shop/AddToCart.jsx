import React, { useContext } from "react";
import { Button,useToast } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import { useCartContext } from "../../context/cartContext";
 import { userContext } from "../../context/userContext";
import { Link, Navigate } from "react-router-dom";


function AddToCart(props) {
    const { cartItems, getItemQuantity, addToCart,decreaseItemQuantity,removeFromCart } = useCartContext();
    const {amount,bookId,title,price,image,stock} = props;
    const {user} = useContext(userContext);
    const toast = useToast();

    
  return (
    <>
    
      <Button
        leftIcon={<BsCart />}
        colorScheme="blue"
        variant="solid"
        borderRadius={10}
        w={200}
        onClick={() => {
          
      if(cartItems.find((item) => item.id === bookId)){
        return toast({
        title: "Item already in the cart",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      }

      addToCart(bookId,title,price,image,stock,amount)

      return toast({
        title: "Added To Cart Successfully",
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
        
        }}
      >
        Add To Cart
      </Button> 
       
     
     
       
    </>
  );
}

export default AddToCart;
