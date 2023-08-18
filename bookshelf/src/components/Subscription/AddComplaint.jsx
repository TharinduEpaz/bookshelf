import React from 'react'

import {
  Text,
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

import ComplaintForm from "./ComplintForm";
import { useState } from 'react';


function AddComplaint() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      onClose();
    }, 2000);
  };

  return (
    <Box padding={5}>
      
      <Text fontSize={'2xl'} fontWeight={'extrabold'}>
        Add a Complaint
      </Text>
      <Text fontSize={'xl'} padding={4}>
        You can add complaints to bookshelf admin about any issue you have been faced.
      </Text>
      <Button
        onClick={onOpen}
        color={'#3182CE'}
        variant={'outline'}
        border={'1px'}
        borderRadius={10}
        marginLeft={5}>Add a Complaint</Button>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Complaint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Text fontWeight='bold' mb='1rem'>
              You can click the form and send a complaint to our Admin
            </Text>
            <ComplaintForm />
          </ModalBody>

          <ModalFooter>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default AddComplaint
