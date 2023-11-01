import React, { useState, useEffect } from "react";
import { Box, Flex, Grid, GridItem, Spinner } from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Button,
  Text,
  Stack,
} from "@chakra-ui/react";
import Search from "../../components/Sharing/Search";
import Filter from "../../components/Sharing/Filter";
import ShareBookDetails from "../../components/Sharing/ShareBookDetails";
import axios from "axios";
import { Link } from "react-router-dom";

function ShareBook() {
  const [requestDetails, setRequestDetails] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null); // State to track the selected request
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRequestDetails, setFilteredRequestDetails] =
    React.useState(requestDetails);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const getRequestDetails = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(
          `http://localhost:3000/api/v1/bookSharing/requests`
        );
        console.log(response.data);
        setRequestDetails(response.data);
        setFilteredRequestDetails(response.data);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    getRequestDetails();
  }, []);

  // Function to handle opening the AlertDialog and setting the selected request
  const openAlertDialog = (requestId) => {
    setSelectedRequest(requestDetails[requestId]);
    onOpen();
  };

  return (
    <Box
      border={"1px"}
      borderRadius={"10"}
      borderColor={"blue.200"}
      padding={10}
    >
      <Grid
        templateRows="50px 50px repeat(8, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
        h={"100%"}
      >
        <GridItem rowSpan={1} colSpan={5}>
          <Search
            requestDetails={requestDetails}
            isLoading={isLoading}
            setFilteredRequestDetails={setFilteredRequestDetails}
          />
        </GridItem>
        <GridItem rowSpan={1} colSpan={5} p={2}>
          <Filter />
        </GridItem>

        <GridItem rowSpan={8} colSpan={5}>
        
        {isLoading && <Flex w={'100%'} h={'100%'} alignItems={'center'} justifyContent={'center'} pt={'10%'}> <Spinner/></Flex>}
          {Object.keys(filteredRequestDetails).map((item) => {
            const createdAt = new Date(requestDetails[item].createdAt);
            const formattedDate = createdAt.toISOString().split("T")[0]; // Extract and format the date
            return (
              <div key={item} onClick={() => openAlertDialog(item)}>
                {/* Attach a click handler to open the AlertDialog */}
                
                <ShareBookDetails
                  bookName={requestDetails[item].bookName}
                  userName={requestDetails[item].userName}
                  details={requestDetails[item].details}
                  createdAt={formattedDate} // Use the formatted date
                  imageURL={requestDetails[item].image}
                />
              </div>
            );
          })}
        </GridItem>

        <AlertDialog
          motionPreset="slideInBottom"
          leastDestructiveRef={cancelRef}
          onClose={onClose}
          isOpen={isOpen}
          isCentered
        >
          <AlertDialogOverlay />

          <AlertDialogContent>
            <AlertDialogHeader></AlertDialogHeader>
            <AlertDialogCloseButton onClick={onClose} />

            <AlertDialogBody>
              {/* Display the details of the selected request in a Stack */}
              {selectedRequest && (
                <Stack spacing={4}>
                  <div>
                    <img
                      src={
                        selectedRequest.image
                          ? selectedRequest.image
                          : "http://localhost:3000/uploads/default.jpeg"
                      }
                      alt=""
                    />
                  </div>
                  <div>
                    <strong>BookName:</strong> {selectedRequest.bookName}
                  </div>
                  <div>
                    <strong>UserName:</strong> {selectedRequest.userName}
                  </div>
                  <div>
                    <strong>Details:</strong> {selectedRequest.details}
                  </div>
                  <div>
                    <strong>List of Books:</strong>
                    <ul>
                      
                    {console.log(selectedRequest.listOfBooks)}
                      {/* {selectedRequest.listOfBooks &&  (
                        selectedRequest.listOfBooks.map((book, index) => (
                          <li key={index}>{book} </li>
                          
                        ))
                        
                      )} */}
                    </ul>
                  </div>
                </Stack>
              )}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Link to={'chat'}>
              <Button colorScheme="blue" ml={5}>Chat</Button>
              </Link>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Grid>
    </Box>
  );
}

export default ShareBook;

//this is the new change added to the git problem
