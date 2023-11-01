import {
    Flex,
    Box,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  
  export default function RegistrationPage() {
    return (
      <Flex minH={'100vh'} justify={'center'} align={'center'}>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
          w={'300px'}
          textAlign={'center'}
        >
          <Heading fontSize={'2xl'}>Welcome to Organization Registration</Heading>
          <h2>First, please register your organization.</h2>
          <Button
            mt={4}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Organization Registration
          </Button>
          <Text mt={2}>
            Already registered?{' '}
            <Link color={'blue.400'} href="#">
              Enter your email.
              Enter your password.
            </Link>
          </Text>
        </Box>
      </Flex>
    );
  }
  