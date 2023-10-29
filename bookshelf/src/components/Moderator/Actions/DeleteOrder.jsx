import { React, useState, useRef } from "react";
import {
  Box,
  Icon,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";

export default function DeleteOrder(id) {
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const deleteOrder = async () => {
    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:3000/api/v1/orders/${id.id}`);
      setIsLoading(false);
      if(response.status === 200){
        toast({
          title: "Deleted Successfully",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      }
      toast({
        title: "Something Went Wrong",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast({
        title: "Something Went Wrong",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  if(isLoading){
    return (
      <>
        <Box mb={"100vh"}>
          <Spinner
            position={"absolute"}
            top={"30%"}
            left={"50%"}
            size={"xl"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        </Box>
      </>
    );
  }

  return (
    <>
      <Box bgColor={"red.500"} pt={1} px={1} borderRadius={4}>
        <Icon
          as={AiFillDelete}
          onClick={onOpen}
          fontSize={"md"}
          color={"white"}
        />
      </Box>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Order
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  deleteOrder();
                  // setShowSuccessAlert(false);
                  onClose();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
