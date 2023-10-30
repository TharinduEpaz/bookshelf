import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useCartContext } from "../context/cartContext";
import { useContext } from "react";
import { userContext } from "../context/userContext";
import { Button, Spacer, Spinner } from "@chakra-ui/react";

const Paybutton = () => {
  const { user } = useContext(userContext);
  const [isLoading,setIsLoading] = useState(false)
  console.log(user);
  const {cartItems,totalPrice} = useCartContext()
  console.log(totalPrice);

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.post('/orders/create-payment-intent',{
        cart : cartItems,
        user : user.user.userId,
        total: totalPrice,
      });
      console.log(response);
     
      window.location.href=response.data.url;
      setIsLoading(false)

    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  };

  return (
    <Button onClick={handleSubmit} colorScheme="purple">
    {isLoading && <Spinner/>}
      Pay Now
    </Button>
  )
};

export default Paybutton;
