import React, { useState, useEffect } from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import Search from "../../components/Sharing/Search";
import Filter from "../../components/Sharing/Filter";
import ShareBookDetails from "../../components/Sharing/ShareBookDetails";
import axios from "axios";

function ShareBook() {
  const [requestDetails, setRequestDetails] = useState({});
  const [selectedRequest, setSelectedRequest] = useState(null); // State to track the selected request
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  useEffect(() => {
    const getRequestDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/bookSharing/requests`
        );
        console.log(response.data);
        setRequestDetails(response.data);
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
          <Search />
        </GridItem>
        <GridItem rowSpan={1} colSpan={5} p={2}>
          <Filter />
        </GridItem>

        <GridItem rowSpan={8} colSpan={5}>
          {Object.keys(requestDetails).map((item) => {
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
          css={{ maxWidth: "800px" }}
        >
          <AlertDialogOverlay />

          <AlertDialogContent >
            <AlertDialogHeader></AlertDialogHeader>
            <AlertDialogCloseButton onClick={onClose} />
            <AlertDialogBody>
  {/* Display the details of the selected request in a Grid */}
  {selectedRequest && (
    <Grid templateColumns="1fr 1fr" gridGap={4}>
    <GridItem display="flex" alignItems="left">
      <strong>BookName: {selectedRequest.bookName}</strong>
    </GridItem>
    <GridItem display="flex" alignItems="left">
      <strong>UserName: {selectedRequest.userName}</strong>
    </GridItem>
    <GridItem display="flex" alignItems="left">
      <strong>Image: <img src={selectedRequest.image} alt="" /></strong>
    </GridItem>
    <GridItem display="flex" alignItems="left">
      <strong>Details: {selectedRequest.details}</strong>
    </GridItem>
  </Grid>
  
  )}
</AlertDialogBody>


            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Grid>
    </Box>
  );
}

export default ShareBook;

//this is the new change added to the git problem