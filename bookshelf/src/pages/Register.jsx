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
} from '@chakra-ui/react';

import { useState } from 'react';
//import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { AiOutlineEyeInvisible } from 'react-icons/ai';
import { RiReactjsLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";



export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);

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

            <FormControl id="firstName">
              <InputGroup>
                <Input type="text"
                  placeholder='First Name'
                  bg={useColorModeValue('white')} />

                <InputRightElement>
                  <RiReactjsLine />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="lastName">
              <InputGroup>
                <Input type="text"
                  placeholder='Last Name'
                  bg={useColorModeValue('white')} />

                <InputRightElement>
                  <RiReactjsLine />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="nic">
              <InputGroup>
                <Input type="text"
                  placeholder='NIC'
                  bg={useColorModeValue('white')} />

                <InputRightElement>
                  <RiReactjsLine />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="email">
              <InputGroup>
                <Input type="email"
                  placeholder='Email'
                  bg={useColorModeValue('white')} />

                <InputRightElement>
                  <RiReactjsLine />
                </InputRightElement>
              </InputGroup>
            </FormControl>


            <FormControl id="password" isRequired>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  placeholder='Create Password'
                  bg={useColorModeValue('white')} />
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

            <FormControl id="password" isRequired>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'}
                  placeholder='Confirm Password'
                  bg={useColorModeValue('white')} />
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
            </Stack> */}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}