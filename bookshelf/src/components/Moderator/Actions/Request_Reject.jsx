import React from "react";
import {
  Button,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

export default function Request_Reject(id) {
  const ID = id.id;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const toast = useToast();

  //reject request URL
    const URL = "http://localhost:3000/api/v1/donations/request/" + ID;
    
    //reject request
    const rejectRequest = async () => {
      try {
        const response = await axios.put(URL, {
            approval: "Rejected",
          });
          console.log(response);
        if(response.status === 200){
          toast({
            title: "Rejected Successfully",
            position: "top",
            status: "success",
            duration: 4000,
            isClosable: true,
          });

        }
        else{
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
      <Button colorScheme="red" onClick={onOpen}>
        Reject
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
              Reject Request
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
                  rejectRequest();
                  onClose();
                }}
                ml={3}
              >
                Reject
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
