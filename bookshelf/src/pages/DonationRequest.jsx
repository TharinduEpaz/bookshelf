import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

import { useState } from 'react';
//import axios from 'axios';

export default function SignupCard() {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [nic, setNIC] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateNIC = (nic) => {
    // Implement your NIC validation logic here
    // Return true if NIC is valid, otherwise return false
  };

  const validateContactNumber = (contactNumber) => {
    // Implement your contact number validation logic here
    // Return true if contact number is valid, otherwise return false
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const body ={
        fullName: fullname,
        email: email,
        description: description,
        contactNumber: contactNumber,
        nic: nic,
        address: address,
      }
      console.log(body);
      const response = await fetch("http://localhost:3000/api/v1/donations/addRequest", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      //const response = await axios.post('http://localhost:3000/api/v1/donations/addRequest', body);
      console.log(response);
      if(response.ok){
        setIsSuccessModalOpen(true);
        setError('');
        setFullName('');
        setEmail('');
        setDescription('');
        setContactNumber('');
        setNIC('');
        setAddress('');
      }else{
        setError('Something went wrong!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  return (
    <Flex minH={'100vh'} justify={'center'}>
      <Stack spacing={8} mx={'auto'} maxW={'xl'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Apply for Donation
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            WE CARE YOUR DREAM
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            {error && (
              <Alert status="error">
                <AlertIcon /> {error}
              </Alert>
            )}
            <form onSubmit={register}>
              <FormControl id="fullname" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FormControl>
              <FormControl id="nic" isRequired>
                <FormLabel>National Identity Card Number</FormLabel>
                <Input
                  type="text"
                  value={nic}
                  onChange={(e) => setNIC(e.target.value)}
                />
              </FormControl>
              <FormControl id="address" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </FormControl>
              <FormControl id="contactNumber" isRequired>
                <FormLabel>Contact Number</FormLabel>
                <Input
                  type="tel"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Brief description about the need</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Submit
                </Button>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>

      {/* Success Modal */}
      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Successfully Submitted! Our team will contact you as soon as possible.
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}


