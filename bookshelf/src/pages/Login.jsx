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
  Spinner,
  Alert,
  AlertIcon,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  CircularProgress,


} from "@chakra-ui/react";
import { useContext, useState } from "react";
//import axios from "axios";
import { userContext } from "../context/userContext"

export default function SimpleCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user, setUser } = useContext(userContext);

  const loginUrl = "http://localhost:3000/api/v1/login";

  const login = async (e) => {
    setIsLoading(true);
    console.log(email, password);
    e.preventDefault();
    try {

      const response = await axios.post(loginUrl, {
        email: email,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setUser(response.data);
      console.log(response.data.user);
      setEmail("");
      setPassword("");
      setIsLoading(false);
      //redirect to home route
      window.location.href = "/";

    } catch (error) {
      // console.log(error.response.data.msg);

      error.response ? setError(error.response.data.msg) : setError("Something went wrong");
      setIsLoading(false);

    }
  };

  if (isLoading) {
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
    <Flex minH={"100vh"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {error && <Alert status="error"> <AlertIcon /> {error}</Alert>}
            <form onSubmit={login}>

              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  type="submit"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
