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
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios'; // Import Axios for making HTTP requests

function DonationReceiverDashboard() {
  const [addedItems, setAddedItems] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isRemoveConfirmationOpen, onOpen: onRemoveConfirmationOpen, onClose: onRemoveConfirmationClose } = useDisclosure();
  const [requestedMessage, setRequestedMessage] = useState('');
  const [bookToRemove, setBookToRemove] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // Initialize total price

  const addBook = (bookData) => {
    const updatedItems = [...addedItems, bookData];
    setAddedItems(updatedItems);
    updateTotal(updatedItems);
  };

  const handleRequest = () => {
    // Prepare the data to be sent to the server
    const selectedBooks = addedItems.map((currentBook) => ({
      title: currentBook.title,
      price: currentBook.price,
      quantity: currentBook.quantity,
      total: currentBook.quantity * currentBook.price,
    }));
    
  
    // Send the request to the server
    sendRequestToServer(selectedBooks);
  
    // Reset the form
    handleReset();
  
    // Open the success dialog
    onOpen();
  };

  const handleReset = () => {
    setAddedItems([]);
    updateTotal([]); // Reset total when clearing the list
  };

  const handleRemoveBook = (book) => {
    const updatedItems = addedItems.filter((currentBook) => currentBook !== book);
    setAddedItems(updatedItems);
    updateTotal(updatedItems);
    setBookToRemove(book);
    onRemoveConfirmationOpen();
  };

  const confirmRemoveBook = () => {
    const updatedItems = addedItems.filter((book) => book !== bookToRemove);
    setAddedItems(updatedItems);
    updateTotal(updatedItems);
    onRemoveConfirmationClose();
  };

  const updateTotal = (items) => {
    const total = items.reduce((acc, currentBook) => acc + currentBook.quantity * currentBook.price, 0);
    setTotalPrice(total);
  };

  // Function to send the request to the server
  const sendRequestToServer = (selectedBooks) => {
    const apiUrl = 'http://localhost:3000/api/v1/donationRequests'; // Replace with your actual server API URL

    axios
      .post(apiUrl, { selectedBooks })
      .then((response) => {
        console.log('Request sent successfully', response.data);
        // You can handle the success response here.
      })
      .catch((error) => {
        console.error('Error sending request', error);
        // Handle errors here.
      });
  };

  return (
    <Flex align="center" justify="center" h="40vh" backgroundColor={'white'} m={200} mr={300} ml={300}>
      <Grid templateColumns="1fr 1fr" gap={8}>
        <GridItem colSpan={1}>
          <Search onAddBook={addBook} />
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
    <Button colorScheme="blue" onClick={handleRequest} >
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
    </Flex>
  );
}

export default DonationReceiverDashboard;
