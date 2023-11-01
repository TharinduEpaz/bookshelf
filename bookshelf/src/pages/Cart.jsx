import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { CartItem } from '../components/Cart/CartItem'
  import { CartOrderSummary } from '../components/Cart/CartOrderSummary'
  import { useCartContext } from '../context/cartContext'
  import { Link } from 'react-router-dom'
import CartBreadcrumb from '../components/Cart/CartBreadcrumb'
  

 

//   amount
// : 
// 1
// id
// : 
// "ee46879f-92ef-49ab-9394-fa9f5f76733f"
// image
// : 
// "http://localhost:3000/uploads/default.jpeg"
// price
// : 
// 30
// stock
// : 
// 4
// title
// : 
// "The Science of Everything"
  
  export function Cart() {

    const { cartItems, getItemQuantity, addToCart,decreaseItemQuantity,removeFromCart } = useCartContext();
    
    const cartData = cartItems;

    return (
    <Box
      maxW={{
        base: '3xl',
        lg: '7xl',
      }}
      mx="auto"
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}

      height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
    >
    <CartBreadcrumb />
      <Stack
      mt={10}
        direction={{
          base: 'column',
          lg: 'row',
        }}
        align={{
          lg: 'flex-start',
        }}
        spacing={{
          base: '8',
          md: '16',
        }}
      >
        <Stack
          spacing={{
            base: '8',
            md: '10',
          }}
          flex="2"
        >
          <Heading fontSize="2xl" fontWeight="extrabold">
            Shopping Cart 
          </Heading>
  
          <Stack spacing="6">
            {cartData.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary cartData={cartData}/>
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link style={{color:'#4299E1'}} to={'/shop'}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
    )
  }

  export default Cart;
