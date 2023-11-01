import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  VStack,
  Image,
  Button,
  Badge,
  Input,
  useNumberInput,
  Divider,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import Search from "../components/Donation/Search";
import LinkTree from "../components/LinkTree";
import { BsCart } from "react-icons/bs";

function DonationDetails({ name, price, needsfor, imageURL }) {
  const [donatingQuantity, setDonatingQuantity] = useState(0); // Set the initial value to 0
  const [total, setTotal] = useState(0);

  const productDetails = {
    name: "Hello",
    price: 1990.0,
    quantityNeed: 25,
  };

  const handleQuantityChange = (newQuantity) => {
    setDonatingQuantity(newQuantity);
    // Calculate the total
    setTotal(productDetails.price * newQuantity);
  };

  // Define an array of products (dummy data)
  const products = [
    {
      name: "Book 1",
      price: 10.0,
      quantityNeed: 30,
    },
    {
      name: "Book 2",
      price: 15.0,
      quantityNeed: 20,
    },
    {
      name: "Book 3",
      price: 12.0,
      quantityNeed: 15,
    },
  ];

  return (
    <>
      <Box
        height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid
          templateRows="repeat(10, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
        >
          <GridItem rowSpan={2} colSpan={5}>
            <SimpleGrid columns={1}>
              <Box h={"40px"} pl={3}>
                {" "}
                <LinkTree />
              </Box>
              <Box h={"60px"}>
                {" "}
                <Search />
              </Box>
            </SimpleGrid>
          </GridItem>

          <GridItem rowSpan={7} colSpan={2} p={10} h={"100%"}>
            <Box
              boxSize="sm"
              objectFit={"contain"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"start"}
            >
              <Image
                src={imageURL}
                alt="Dan Abramov"
                borderRadius={"md"}
                maxH={300}
              />
            </Box>
          </GridItem>
          <GridItem rowSpan={7} colSpan={3} ml={10}>
            <Heading>WP/Jaya Vidyaraja Maha Vidyalaya, Hokandara</Heading>

            <Box display="flex" alignItems={"center"} mt={4}>
              <Heading
                size={"md"}
                ml={10}
                fontFamily={"montserrat"}
                fontWeight={"light"}
              ></Heading>
            </Box>

            <Divider mt={5} mb={5} color={'black.600'} borderWidth={1} borderColor={'blue.200'} />
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Name of the book</Th>
                  <Th>Price per book</Th>
                  <Th>Quantity Needed</Th>
                  <Th>Donating Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {products.map((product, index) => (
                  <Tr key={index} bg="blue.50">
                    <Td>{product.name}</Td>
                    <Td>{product.price}</Td>
                    <Td>{product.quantityNeed}</Td>
                    <Td>
                      <HookUsage
                        value={donatingQuantity}
                        onQuantityChange={handleQuantityChange}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <HStack mt={4}>
              <Text>Total: ${total}</Text>
              <Spacer />
              <Button colorScheme="blue" size="md">
                Donate
              </Button>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

function HookUsage({ value, onQuantityChange }) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
    step: 1,
    defaultValue: value,
    min: 0, // Set the minimum value to 0
    max: 10,
    onChange: (newValue) => {
      onQuantityChange(newValue);
    },
  });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack>
      <Button {...dec} bg={'blue.100'} borderRadiusLeft={100}>-</Button>
      <Input {...input} fontWeight={'bold'} textAlign={'center'} borderRadius={0} />
      <Button {...inc} bg={'blue.100'} borderRadiusRight={100}>+</Button>
    </HStack>
  );
}

export default DonationDetails;
