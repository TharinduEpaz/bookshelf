import { Box, Text, Icon, Button, ButtonGroup } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { userContext } from "../context/userContext";
import { useContext } from "react";

const PaymentSuccess = () => {
  const { user, setUser } = useContext(userContext);
  const navigate = useNavigate();
  return (
    <Box
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Icon as={CheckCircleIcon} w={16} h={16} color="red.400" mb={4} />
      <Text fontSize="2xl" fontWeight="bold" color="red.700" textAlign="center">
        It looks like an error occurred during the payment
      </Text>
      <ButtonGroup>
      <Link to={'/shop'}>
      <Button variant={'ghost'} colorScheme='blue' mt={10}>
        Continue Shopping
      </Button>
      </Link>
      <Button variant={'ghost'} colorScheme='blue' mt={10} onClick={()=>window.location.href= `cart/${user.user.userId}}`} >
        Cart
      </Button>
      </ButtonGroup>
    </Box>
  );
};

export default PaymentSuccess;
