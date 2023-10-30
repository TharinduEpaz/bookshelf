import { React, useRef } from "react";
import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function Request_Accept(id) {
  const ID = id.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();

  //accept request URL
  const URL = "http://localhost:3000/api/v1/donations/request/" + ID;

  //accept request
  const acceptRequest = async () => {
    try {
      const response = await axios.put(URL, {
        approval: "Accepted",
      });
      console.log(response);
      if (response.status === 200) {
        toast({
          title: "Accepted Successfully",
          position: "top",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Something Went Wrong. Please Try Again",
          position: "top",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something Went Wrong",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Button colorScheme="blue" mr={3} onClick={onOpen}>
        Accept
      </Button>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Accept Request
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => {
                  acceptRequest();
                  onClose();
                }}
                ml={3}
              >
                Accept
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
