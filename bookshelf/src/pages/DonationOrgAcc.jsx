import React, { useState } from 'react';
import Search from "../components/Search";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Checkbox,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

function DonationReceiverDashboard() {
  const [products, setProducts] = useState([
    
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantities, setQuantities] = useState(Array(products.length).fill(''));

  const [requestedMessage, setRequestedMessage] = useState(''); // New state for the requested message

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProductSelection = (productId, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, productId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== productId));
    }
  };

  const handleGo = () => {
    // Check if any selected product has no quantity entered
    const hasMissingQuantity = checkedItems.some((id) => !quantities[products.findIndex(product => product.id === id)]);
    if (hasMissingQuantity) {
      // Show a pop-up message if there are missing quantities
      setRequestedMessage('Please enter the quantity you want');
      onOpen();
    } else if (checkedItems.length === 0) {
      // Show a pop-up message if no item is selected
      setRequestedMessage('Please Select The Book');
      onOpen();
    } else {
      const updatedSelections = products
        .filter((product) => checkedItems.includes(product.id))
        .map((product, index) => {
          const quantity = quantities[products.findIndex(p => p.id === product.id)] || 0;
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          };
        });
      setSelectedProducts(updatedSelections);
    }
  };

  const handleReset = () => {
    setSelectedProducts([]);
    setCheckedItems([]);
    setQuantities(Array(products.length).fill(''));
    setRequestedMessage(''); // Reset the requested message
  };

  const handleRequest = () => {
    // Send selectedProducts to the "RequestBooks" table in the database (placeholder code)

    // Generate the requested message
    const message = selectedProducts.map((product) => {
      return `${product.name} - Quantity: ${product.quantity}`;
    }).join(', ');

    setRequestedMessage(`Requested Books: ${message}`);

    // Reset the form
    handleReset();

    // Open the success dialog
    onOpen();
  };
   
  return (
    <Flex align="center" justify="center" h="40vh" backgroundColor={'white'} m={200} mr={300} ml={300}>
      <Grid templateColumns="1fr 1fr" gap={8}>
        <GridItem colSpan={1}>
          <Box>
            <Heading size="lg">Available Products</Heading>
            {products.map((product, index) => (
              <Flex key={product.id} align="center">
                <Checkbox
                  size="lg"
                  mr={2}
                  onChange={(e) => handleProductSelection(product.id, e.target.checked)}
                  isChecked={checkedItems.includes(product.id)}
                />
                <span>{product.name} - ${product.price}</span>
                <Input
                  type="number"
                  placeholder="Quantity"
                  size="sm"
                  ml={2}
                  value={quantities[products.findIndex(p => p.id === product.id)] || ''}
                  onChange={(e) => {
                    const newQuantities = [...quantities];
                    newQuantities[products.findIndex(p => p.id === product.id)] = parseInt(e.target.value, 10);
                    setQuantities(newQuantities);
                  }}
                />
              </Flex>
            ))}
            <Search/>
            <Button colorScheme="blue" mt={4} onClick={handleGo}>
              Go
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box>
            <Heading size="lg">Selected Products for Request</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name of the book</Th>
                  <Th>Price of the book</Th>
                  <Th>Quantity needed</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedProducts.map((product) => (
                  <Tr key={product.id} bg="blue.50">
                    <Td>{product.name}</Td>
                    <Td>${product.price}</Td>
                    <Td>{product.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex mt={4}>
              <Button colorScheme="blue" onClick={handleReset} mr={2}>
                Reset
              </Button>
              <Button colorScheme="blue" onClick={handleRequest}>
                Request
              </Button>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alert
            </AlertDialogHeader>
            <AlertDialogBody>{requestedMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default DonationReceiverDashboard;









import React from "react";
import { IconButton, Input, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);
 
  const navigate = useNavigate();
  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get(
        "books/getBookNames",
        {
          withCredentials: true,
        }
      );

      setResults(res.data);

      console.log(res.data);
      results && console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  const filterItems = Object.values(results).filter((item) => {
    return item.title.toLowerCase().includes(input.toLowerCase());
  });

  const handleChange = (value) => {
    setInput(value);
    fetchResults();
    setFilteredItems(filterItems);
    // console.log(results);
  };

  return (
    <>
      <Box
      
        mt={5}
        mb={5}
        w={'80%'}
        borderRadius="2xl"
      
        background={"rgba(255, 255, 255,0)"}
        bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={2}
        pl={5}
        pb={5}
        display={"flex"}
        alignItems={"center"}
        
      
        
        gap={5}
      >
        <Input
          type="text"
          w={"90%"}
          fontWeight={"extrabold"}
          placeholder="Search thousands of books"
          borderColor={"blue.100"}
          onChange={(e) => handleChange(e.target.value)}
          variant={'flushed'}
          h={'50px'}
        />
        <IconButton
          icon={<Search2Icon />}
          color="blue.400"
          ml={0}
          borderRadius={5}
          w={100}
          h={'50px'}
          bg={'none'}
        />
      </Box>
      <Box
        // m={"auto"}
        mt={0}
        w="30%"
        boxShadow="sm"
        background={"rgba(255, 255, 255, 0.7)"}
        borderRadius={10}
        // bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={5}
        // position={"absolute"}
        left={"6%"}
        // justifyContent={'center'}
        zIndex={'9999'}
        alignItems={"center"}
        gap={5}
        display={input.length > 0 ? "" : "none"}
      >

        {filteredItems.slice(0, 10).map((result) => (

          <Box
            fontSize={20}
            fontWeight={"medium"}
            onClick={() => navigate(`/shop/${result.id}`)}
            cursor={"pointer"}
            zIndex={'9999'}
          >
            {result.title}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Search;



import React, { useState } from 'react';
import Search from "../components/Donation/DonSearch";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Checkbox,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';

function DonationReceiverDashboard() {
  const [products, setProducts] = useState([
    
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantities, setQuantities] = useState(Array(products.length).fill(''));

  const [requestedMessage, setRequestedMessage] = useState(''); // New state for the requested message

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleProductSelection = (productId, isChecked) => {
    if (isChecked) {
      setCheckedItems([...checkedItems, productId]);
    } else {
      setCheckedItems(checkedItems.filter((id) => id !== productId));
    }
  };

  const handleGo = () => {
    // Check if any selected product has no quantity entered
    const hasMissingQuantity = checkedItems.some((id) => !quantities[products.findIndex(product => product.id === id)]);
    if (hasMissingQuantity) {
      // Show a pop-up message if there are missing quantities
      setRequestedMessage('Please enter the quantity you want');
      onOpen();
    } else if (checkedItems.length === 0) {
      // Show a pop-up message if no item is selected
      setRequestedMessage('Please Select The Book');
      onOpen();
    } else {
      const updatedSelections = products
        .filter((product) => checkedItems.includes(product.id))
        .map((product, index) => {
          const quantity = quantities[products.findIndex(p => p.id === product.id)] || 0;
          return {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
          };
        });
      setSelectedProducts(updatedSelections);
    }
  };

  const handleReset = () => {
    setSelectedProducts([]);
    setCheckedItems([]);
    setQuantities(Array(products.length).fill(''));
    setRequestedMessage(''); // Reset the requested message
  };

  const handleRequest = () => {
    // Send selectedProducts to the "RequestBooks" table in the database (placeholder code)

    // Generate the requested message
    const message = selectedProducts.map((product) => {
      return `${product.name} - Quantity: ${product.quantity}`;
    }).join(', ');

    setRequestedMessage(`Requested Books: ${message}`);

    // Reset the form
    handleReset();

    // Open the success dialog
    onOpen();
  };
   
  return (
    <Flex align="center" justify="center" h="40vh" backgroundColor={'white'} m={200} mr={300} ml={300}>
      <Grid templateColumns="1fr 1fr" gap={8}>
        <GridItem colSpan={1}>
          <Box>
            <Heading size="lg">Available Products</Heading>
            {products.map((product, index) => (
              <Flex key={product.id} align="center">
                <Checkbox
                  size="lg"
                  mr={2}
                  onChange={(e) => handleProductSelection(product.id, e.target.checked)}
                  isChecked={checkedItems.includes(product.id)}
                />
                <span>{product.name} - ${product.price}</span>
                <Input
                  type="number"
                  placeholder="Quantity"
                  size="sm"
                  ml={2}
                  value={quantities[products.findIndex(p => p.id === product.id)] || ''}
                  onChange={(e) => {
                    const newQuantities = [...quantities];
                    newQuantities[products.findIndex(p => p.id === product.id)] = parseInt(e.target.value, 10);
                    setQuantities(newQuantities);
                  }}
                />
              </Flex>
            ))}
            <Search/>
            <Button colorScheme="blue" mt={4} onClick={handleGo}>
              Go
            </Button>
          </Box>
        </GridItem>
        <GridItem colSpan={1}>
          <Box>
            <Heading size="lg">Selected Products for Request</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name of the book</Th>
                  <Th>Price of the book</Th>
                  <Th>Quantity needed</Th>
                </Tr>
              </Thead>
              <Tbody>
                {selectedProducts.map((product) => (
                  <Tr key={product.id} bg="blue.50">
                    <Td>{product.name}</Td>
                    <Td>${product.price}</Td>
                    <Td>{product.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex mt={4}>
              <Button colorScheme="blue" onClick={handleReset} mr={2}>
                Reset
              </Button>
              <Button colorScheme="blue" onClick={handleRequest}>
                Request
              </Button>
            </Flex>
          </Box>
        </GridItem>
      </Grid>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Alert
            </AlertDialogHeader>
            <AlertDialogBody>{requestedMessage}</AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="blue" onClick={onClose}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
}

export default DonationReceiverDashboard;













import React, { useState } from "react";
import {
  IconButton,
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Image,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1); // Add quantity state
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get("books/getBookNames", {
        withCredentials: true,
      });

      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterItems = Object.values(results).filter((item) => {
    return item.title.toLowerCase().includes(input.toLowerCase());
  });

  const handleChange = (value) => {
    setInput(value);
    fetchResults();
    setFilteredItems(filterItems);
  };

  const handleResultClick = (id) => {
    setSelectedBook(id);
    onOpen(); // Open the pop-up
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleGo = () => {
    // Handle adding the selected book with quantity to your list
    // For now, let's log the selected book and quantity
    console.log("Selected Book:", selectedBook);
    console.log("Quantity Needed:", quantity);
  };

  return (
    <>
      <Box
        mt={5}
        mb={5}
        w={"80%"}
        borderRadius="2xl"
        background={"rgba(255, 255, 255,0)"}
        bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2)"
        p={2}
        pl={5}
        pb={5}
        display={"flex"}
        alignItems={"center"}
        gap={5}
      >
        <Input
          type="text"
          w={"90%"}
          fontWeight={"extrabold"}
          placeholder="Search thousands of books"
          borderColor={"blue.100"}
          onChange={(e) => handleChange(e.target.value)}
          variant={"flushed"}
          h={"50px"}
        />
        <IconButton
          icon={<Search2Icon />}
          color="blue.400"
          ml={0}
          borderRadius={5}
          w={100}
          h={"50px"}
          bg={"none"}
        />
      </Box>
      <Box
        mt={0}
        w="30%"
        boxShadow="sm"
        background={"rgba(255, 255, 255, 0.7)"}
        borderRadius={10}
        backdropFilter="blur(8px)"
        p={5}
        left={"6%"}
        zIndex={"9999"}
        alignItems={"center"}
        gap={5}
        display={input.length > 0 ? "" : "none"}
      >
        {filteredItems.slice(0, 10).map((result) => (
          <Box
            key={result.id}
            fontSize={20}
            fontWeight={"medium"}
            onClick={() => handleResultClick(result)}
            cursor={"pointer"}
            zIndex={"9999"}
          >
            {result.title}
          </Box>
        ))}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
  {selectedBook && (
    <div>
      <Image src={selectedBook.image} alt={selectedBook.title} />
      <h2>Title: {selectedBook.title}</h2>
      <p>Author: {selectedBook.author}</p>
      <p>Price: {selectedBook.price}</p>
      <div>
        
        <p>Quantity Needed: </p>
        <Button onClick={handleDecreaseQuantity}>-</Button>
        <span>{quantity}</span>
        <Button onClick={handleIncreaseQuantity}>+</Button>
      </div>
    </div>
  )}
</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleGo}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
