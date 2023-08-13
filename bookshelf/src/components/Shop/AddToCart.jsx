import React from "react";
import { Button } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";

function AddToCart(props) {

    const {amount} = props;
    // console.log(amount);
   
  return (
    <>
      <Button
        leftIcon={<BsCart />}
        colorScheme="blue"
        variant="solid"
        borderRadius={10}
        w={200}
        onClick={() => {console.log(amount)}}
      >
        Add To Cart
      </Button>
    </>
  );
}

export default AddToCart;
