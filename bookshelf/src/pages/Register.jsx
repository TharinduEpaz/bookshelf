import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  CircularProgress,
} from "@chakra-ui/react";

import { useState } from "react";
import { Fa500Px } from "react-icons/fa";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function SignupCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const response = await axiosInstance.post("/register", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        address: address,
        city: city,
        province: province,
        postalCode: postalCode,
        phone: phone,

      });
      console.log(response.data);

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setIsLoading(false);

      // window.location.href = "/login";
      navigate("/login");
    } catch (error) {
      setError(error.response.data.msg);
      setIsLoading(false);
      console.log(error.response);
    }
  };

  if (isLoading) {
    return (
      <Flex minH={"100vh"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool features ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Flex alignItems={"center"} justifyContent={"center"}>
              <CircularProgress isIndeterminate color="green.300" />
            </Flex>
          </Box>
        </Stack>
      </Flex>
    );
  }

  return (
    <Flex minH={"100vh"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {error && (
              <Alert status="error">
                {" "}
                <AlertIcon /> {error}
              </Alert>
            )}
            <form onSubmit={register}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Shipping Address</FormLabel>
                <Input type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
                <HStack>
                  <Box>
                    <FormControl id="city" isRequired>
                      <FormLabel>City</FormLabel>
                      <Input type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="province" isRequired>
                      <FormLabel>Province</FormLabel>
                      <Input type="text" 
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <HStack>
                  <Box>
                    <FormControl id="postalcode" isRequired>
                      <FormLabel> Postal Code </FormLabel>
                      <Input type="text" 
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="phone" isRequired>
                      <FormLabel>Phone</FormLabel>
                      <Input type="tel"  
                      value={phone}
                      pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                      title="Please enter a valid phone number in 10 digits without spaces"
                      onChange={(e) => setPhone(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </HStack>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <Fa500Px /> : <Fa500Px />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
