import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  InputGroup,
  Alert,  
  AlertIcon,
  SkeletonCircle,
  SkeletonText,
  Spinner,
  CircularProgress,

  



} from '@chakra-ui/react';

import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Fa500Px } from 'react-icons/fa';

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const[firstName,setFirstName] = useState('');
  const[lastName,setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [isLoading,setIsLoading] = useState(false);

  const regUrl = 'http://localhost:3000/api/v1/register';

  const register = async (e) => {
     e.preventDefault();
     try {
      setIsLoading(true);
    
      const response = await axios.post(regUrl,{ firstName : firstName, lastName : lastName, email : email, password : password});
      console.log(response.data);
      setEmail('');
      setPassword('');
      setFirstName('');
      setLastName('');
      setIsLoading(false);

      window.location.href = "/login";
      
     } catch (error) {
      setError(error.response.data.msg);  
      setIsLoading(false);
    console.log(error.response);
     }
  
  }

  if(isLoading){
    return (
      <Flex
      minH={'100vh'}
      
      justify={'center'}
      >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Flex alignItems={'center'} justifyContent={'center'}>
          <CircularProgress isIndeterminate color='green.300' />
            
          </Flex>
        </Box>
      </Stack>
    </Flex>
    )
  }




  return (
    <Flex
      minH={'100vh'}
      
      justify={'center'}
      >
      <Stack
        spacing={8}
        mx={'auto'}
        maxW={'lg'}
        py={12}
        px={6}
        border={'1px'}
        borderRadius={20}
        width={400}
        height={"auto"}
        marginTop={30}
        bg={useColorModeValue('blure')}>

        <Stack align={'center'}>
          <Heading fontSize={'3xl'} marginTop={-5}>Signup</Heading>
        </Stack>
        <Box>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl id="password" isRequired>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={''}
                    size={"xlarge"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Login
              </Button>
              <p align='center'>or</p>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Login with Google
              </Button>
            </Stack>
            {/* <Stack spacing={10} pt={2}>
              <Button
              type='submit'
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack> */}
            {/* <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}