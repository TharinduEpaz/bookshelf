import {
    Box,
    Flex,
    Heading,
    HStack,
    Link,
    Stack,
    useColorModeValue as mode,
  } from '@chakra-ui/react'
  import { CartItem } from '../components/Cart/CartItem'
  import { CartOrderSummary } from '../components/Cart/CartOrderSummary'
  

  const cartData = [
    {
      id: '1',
      price: 39.99,
      currency: 'LKR',
      name: 'Subtle Art of not giving a F*ck',
      description: 'Hardcover, 40mm',
      quantity: 3,
      imageUrl:
        'https://m.media-amazon.com/images/I/71QKQ9mwV7L._AC_UF1000,1000_QL80_.jpg',
    },
    {
      id: '2',
      price: 39.99,
      currency: 'LKR',
      name: 'GreenLights',
      description: 'Hardcover, 40mm',
      quantity: 3,
      imageUrl:
        'https://jumpbooks.lk/ceruvef/uploads/2021/08/Greenlights-.jpeg',
    },
    {
      id: '3',
      price: 39.99,
      currency: 'LKR',
      name: 'So Good They Cant Ignore You',
      description: 'Hardcover, 40mm',
      quantity: 3,
      imageUrl:
        'https://m.media-amazon.com/images/I/519wEQvVwGL.jpg',
    },
  ]
  
  export const Cart = () => (

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
      <Stack
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
            Shopping Cart (3 items)
          </Heading>
  
          <Stack spacing="6">
            {cartData.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
          </Stack>
        </Stack>
  
        <Flex direction="column" align="center" flex="1">
          <CartOrderSummary />
          <HStack mt="6" fontWeight="semibold">
            <p>or</p>
            <Link color={mode('blue.500', 'blue.200')}>Continue shopping</Link>
          </HStack>
        </Flex>
      </Stack>
    </Box>
  )

  export default Cart;
