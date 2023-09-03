import React from 'react'
import { Box, Button, Card, CardBody,Text,Flex, Heading, FormControl, FormLabel, Input, Textarea, Checkbox, CardFooter, IconButton, Divider, CardHeader, Alert, AlertIcon } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { DeleteIcon } from '@chakra-ui/icons'
import { Link as RouterLink } from 'react-router-dom'

const Checkout = () => {
  return (
    <>
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
   
    <Flex>
      <Flex direction={'column'} w={'70%'}>
        <Box border={'0.5px solid'} borderColor={'blue.200'} borderRadius={5} padding={5}>
          <Text >Already have an account ? Please Log in to fill out the form automatically</Text>
          
          <Link to='/login'>
          <Button colorScheme='blue' variant={'link'}>Login</Button>
          </Link>
        </Box>
        <Box border={'0.5px solid'} borderColor={'blue.200'} borderRadius={5} padding={5} mt={2}>
          <Heading fontSize={'20'}> Shipping and Billing Details</Heading>
          <form>
            <Flex mt={5}>
              <FormControl mr={3}>
                <FormLabel htmlFor='firstName'>First Name</FormLabel>
                <Input id='first-name' placeholder='First Name' />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='lastName'>Last Name</FormLabel>
                <Input id='last-name' placeholder='Last Name' />
              </FormControl>
            </Flex>
            <FormControl mt={5}>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <Input id='email' placeholder='Email' />
            </FormControl>
            <FormControl mt={5}>
              <FormLabel htmlFor='address'>Address</FormLabel>
              <Input id='address' placeholder='Address' />
            </FormControl>
            <Flex mt={5}>
              <FormControl mr={3}>
                <FormLabel htmlFor='city'>City</FormLabel>
                <Input id='city' placeholder='City' />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='zip'>Zip Code</FormLabel>
                <Input id='zip' placeholder='Zip' />
              </FormControl>
            </Flex>
            <FormControl mt={5}>
              <FormLabel htmlFor='phone'>Phone</FormLabel>
              <Input id='phone' placeholder='Phone' />
            </FormControl>
            <FormControl mt={5}>
              <FormLabel htmlFor='comments'> Order Comments</FormLabel>
              <Textarea id='comments' placeholder='Comments' />
            </FormControl>

            {/* <FormControl mt={5}>
              <Checkbox fontWeight={600}>Create an account for later use</Checkbox>
            </FormControl> */}

  <Alert status='info' mt={5}>
    <AlertIcon />
    An Account will be automatically created with the email provided. You can Login and view order details.
  </Alert>
  <Alert status='info' mt={5}>
    <AlertIcon />
    Your Password will be automatically generated and sent to your email.
  </Alert>

          </form>
          
        </Box>
      </Flex>

      <Box w={'30%'} border={'0.5px solid'} borderColor={'blue.200'} ml={2} p={2}>
      <Text fontWeight={'600'}>
        Order Summary
      </Text>
      <Card bg={'gray.100'} mt={2}>
        <CardBody>
        Book1
        </CardBody>
        <CardFooter>
          Quantity
        </CardFooter>

      </Card>
      <Card bg={'gray.100'} mt={2}>
        <CardBody>
        Book2
        </CardBody>
        <CardFooter display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          Quantity
          <IconButton aria-label="Delete" icon={<DeleteIcon />} />
        </CardFooter>
        


      </Card>
      
      <Card bg={'#EBF8FF'} mt={2}>
      <CardHeader>
      <Button size={'sm'} variant={'link'} colorScheme='blue' m={'auto'} borderRadius={20}>Calculate Shipping</Button>

      </CardHeader>
      <CardBody>
      <Flex justifyContent={'space-between'} alignItems={'center'} mt={5}>
      <Text fontSize={15} fontWeight={'bold'} >Shipping</Text>
      <Text> Rs 450</Text>
      </Flex>
      </CardBody>
      </Card>

      
                <RouterLink to={'/stripe'}>
      <Button colorScheme='purple' w={'100%'}  mr={'auto'} mt={5} borderRadius={20}>
        Proceed To Payment
      </Button>
      </RouterLink>
        
      </Box>
    </Flex>

  
    
    
    </Box>
    </>
  )
}

export default Checkout