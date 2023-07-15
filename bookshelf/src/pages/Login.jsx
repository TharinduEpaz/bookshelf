import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import bookgirl from "../assets/bookgirl.png";
import { useState } from 'react';

import { RiReactjsLine } from "react-icons/ri";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from 'react-icons/ai';



export default function SimpleCard() {
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
          <Heading fontSize={'3xl'} marginTop={-5}>Login</Heading>
        </Stack>
        <Box>
          <Stack spacing={4}>
            <FormControl id="email">
              <InputGroup>
                <Input type="email"
                  placeholder='Email'
                  bg={useColorModeValue('white')}/>

                <InputRightElement>
                  <RiReactjsLine/>
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

            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
                marginTop={10}>

                <Checkbox>Remember me</Checkbox>

                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack>

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
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}