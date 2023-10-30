import { Box, Text, Icon, Button, ButtonGroup } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <Box
      height="80vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Icon as={CheckCircleIcon} w={16} h={16} color="blue.400" mb={4} />
      <Text fontSize="2xl" fontWeight="bold" color="blue.700" textAlign="center">
        Payment Completed Successfully
      </Text>
      <ButtonGroup>
      <Link to={'/shop'}>
      <Button variant={'ghost'} colorScheme='blue' mt={10}>
        Continue Shopping
      </Button>
      </Link>
      <Link to={'/account/orders'}>
      <Button variant={'ghost'} colorScheme='blue' mt={10}>
        View Orders
      </Button>


      </Link>
    
    
      </ButtonGroup>

    </Box>
  );
};

export default PaymentSuccess;
