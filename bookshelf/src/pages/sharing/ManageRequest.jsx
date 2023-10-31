import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Toast,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

function ManageRequest() {
  const { user, setUser } = useContext(userContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentId, setCurrentId] = useState(0);
  const cancelRef = React.useRef()

  const [requestDetails, setRequestDetails] = useState({});
  const [userEmail, setUserEmail] = useState(""); // State to store user email
  const navigate = useNavigate();
  const toast = useToast();
  const [reloadPage, setReloadPage] = useState(false);

  useEffect(() => {
    const getRequestDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/bookSharing/requests`
        );
        console.log(response.data[0].id);
        
        setRequestDetails(response.data);
        // console.log(requestDetails);

        // Set the user email to the state
        setUserEmail(user.email);
        console.log(setUserEmail);    
      } catch (error) {
        console.log(error);
      }
    };
    getRequestDetails();
  }, [user]); // Include user in dependency array

  const handleDelete = async (id) => {
    
    try {
      console.log(id)
      const response = await axios.delete(`http://localhost:3000/api/v1/bookSharing/deleteBooks/${id}`,{
        withCredentials:true
      })
      console.log(response)

      toast({
        title: 'Successfully Revoked.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
    
    });
    setReloadPage(true);
    } 
    catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (reloadPage) {
        window.location.reload(); // Reload the page
    }
}, [reloadPage]);

  return (
    <TableContainer
      bg={"white"}
      border={"1px"}
      borderColor={"blue.200"}
      borderRadius={10}
      padding={10}
    >
      <Table size="lg">
        <Thead>
          <Tr>
            <Th align="center">Book</Th>
            <Th align="center">Details</Th>
            <Th> </Th>
            <Th> </Th>
            <Th align="center">Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(requestDetails).map((item) => (
            <Tr key={item}>
              <Td>{requestDetails[item].bookName}</Td>
              <Td>{requestDetails[item].details}</Td>

              <Td colSpan={2} align="center">
                {/* <Button
                  colorScheme="purple"
                  variant={"outline"}
                  borderRadius={15}
                >
                  Edit
                </Button> */}
                <Button onClick = {
                  () => {
                    onOpen()
                    setCurrentId(requestDetails[item].id)
                  }
                }
                  marginLeft={"5"}
                  colorScheme="red"
                  variant={"outline"}
                  borderRadius={15}

                >
                  Delete
                </Button>
                

              </Td>
              <Td>lasinduwathsan@gmail.com</Td> {/* Display user email */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>  
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              

              <Button colorScheme='red' onClick = {
                () => {
                  onClose();
                  handleDelete(currentId);
                  navigate ('/postRequest/ManageRequest');
                }
              } ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </TableContainer>
    
  );
}

export default ManageRequest;
