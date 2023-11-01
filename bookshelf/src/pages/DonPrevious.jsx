import React, { useState } from 'react';
import Search from '../components/Donation/DonSearch';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
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
  IconButton,
  Avatar,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Sidebar from '../components/Donation/Sidebar';
import Settings from '../components/Donation/Settings';
import { Link, Outlet } from 'react-router-dom';

function DonationReceiverDashboard() {
  const [addedItems, setAddedItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRemoveConfirmationOpen, onOpen: onRemoveConfirmationOpen, onClose: onRemoveConfirmationClose } = useDisclosure();
  const [requestedMessage, setRequestedMessage] = useState('');
  const [bookToRemove, setBookToRemove] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const addBook = (bookData) => {
    const updatedItems = [...addedItems, bookData];
    setAddedItems(updatedItems);
    updateTotal(updatedItems);
  };

  const handleRequest = () => {
    const selectedBooks = addedItems.map((currentBook) => ({
      title: currentBook.title,
      price: currentBook.price,
      quantity: currentBook.quantity,
      total: currentBook.quantity * currentBook.price,
    }));

    sendRequestToServer(selectedBooks);

    handleReset();
    onOpen();
  };

  const handleReset = () => {
    setAddedItems([]);
    updateTotal([]);
  };

  const handleRemoveBook = (book) => {
    const updatedItems = addedItems.filter((currentBook) => currentBook !== book);
    setAddedItems(updatedItems);
    updateTotal(updatedItems);
    setBookToRemove(book);
    onRemoveConfirmationOpen();
  };

  const confirmRemoveBook = () => {
    const updatedItems = addedItems.filter((currentBook) => currentBook !== bookToRemove);
    setAddedItems(updatedItems);
    updateTotal(updatedItems);
    onRemoveConfirmationClose();
  };

  const updateTotal = (items) => {
    const total = items.reduce((acc, currentBook) => acc + currentBook.quantity * currentBook.price, 0);
    setTotalPrice(total);
  };

  const sendRequestToServer = (selectedBooks) => {
    const apiUrl = 'http://localhost:3000/api/v1/donationRequests';

    axios
      .post(apiUrl, { selectedBooks })
      .then((response) => {
        console.log('Request sent successfully', response.data);
      })
      .catch((error) => {
        console.error('Error sending request', error);
      });
  };

  return (
    <Box
      height="100%"
      m="auto"
      mt={10}
      w="80%"
      borderRadius="md"
      boxShadow="sm"
      bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
      backdropFilter="blur(8px)"
      p={10}
    >
      <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(1,1fr)" marginLeft={4}>
        <GridItem colSpan={1} rowSpan={1}>
          <Sidebar />
        </GridItem>
        <GridItem colSpan={3} rowSpan={1}>
          <Search onAddBook={addBook} />
          <Box p={4} ml={4} bg="white" borderRadius="lg">
            <Heading size="lg">Selected Products for Request</Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name of the book</Th>
                  <Th>Price of the book</Th>
                  <Th>Quantity needed</Th>
                  <Th>Total</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {addedItems.map((currentBook, index) => (
                  <Tr key={index} bg="blue.50">
                    <Td>{currentBook.title}</Td>
                    <Td>Rs.{currentBook.price}</Td>
                    <Td>{currentBook.quantity}</Td>
                    <Td>Rs.{currentBook.quantity * currentBook.price}</Td>
                    <Td>
                      <IconButton
                        icon={<CloseIcon />}
                        colorScheme="red"
                        onClick={() => handleRemoveBook(currentBook)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Flex mt={4} justify="space-between" align="center">
              <Box>
                <Button colorScheme="blue" onClick={handleReset}>
                  Reset
                </Button>
              </Box>
              <Box>
                <strong>Total Price: Rs.{totalPrice} </strong>
                <Button colorScheme="blue" onClick={handleRequest}>
                  Request
                </Button>
              </Box>
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
      <AlertDialog isOpen={isRemoveConfirmationOpen} onClose={onRemoveConfirmationClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove Book
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to remove this book?
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="red" onClick={confirmRemoveBook}>
                Yes
              </Button>
              <Button colorScheme="blue" onClick={onRemoveConfirmationClose}>
                No
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
}

export default DonationReceiverDashboard;
