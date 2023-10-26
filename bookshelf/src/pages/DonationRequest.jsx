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

export default function DonationRequestForm() {
  const [orgName, setOrgName] = useState('');
  const [orgRegisteredNumber, setOrgRegisteredNumber] = useState('');
  const [orgTelephone, setOrgTelephone] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
 // const [orgConfirmationDocument, setOrgConfirmationDocument] = useState(null);
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPersonPhone, setContactPersonPhone] = useState('');
  const [contactPersonEmail, setContactPersonEmail] = useState('');
  const [contactPersonNIC, setContactPersonNIC] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('orgName', orgName);
      formData.append('orgRegisteredNumber', orgRegisteredNumber);
      formData.append('orgTelephone', orgTelephone);
      formData.append('orgAddress', orgAddress);
      formData.append('orgEmail', orgEmail);
      //formData.append('orgConfirmationDocument', orgConfirmationDocument);
      formData.append('contactPersonName', contactPersonName);
      formData.append('contactPersonPhone', contactPersonPhone);
      formData.append('contactPersonEmail', contactPersonEmail);
      formData.append('contactPersonNIC', contactPersonNIC);
      formData.append('description', description);

      const response = await fetch("http://localhost:3000/api/v1/donations/addRequest", {
        method: 'POST',
        body: formData,
      });

      console.log (formData.get("description"))

      if (response.ok) {
        setIsSuccessModalOpen(true);
        setError('');
        setOrgName('');
        setOrgRegisteredNumber('');
        setOrgTelephone('');
        setOrgAddress('');
        setOrgEmail('');
        //setOrgConfirmationDocument(null);
        setContactPersonName('');
        setContactPersonPhone('');
        setContactPersonEmail('');
        setContactPersonNIC('');
        setDescription('');
      } else {
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
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} w={"200%"}>
          <Stack spacing={4}>
            {error && (
              <Alert status="error">
                <AlertIcon /> {error}
              </Alert>
            )}
            <form onSubmit={register}>
              {/* Organization Information */}
              <FormControl id="orgName" isRequired>
                <FormLabel>Name of the Organization</FormLabel>
                <Input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </FormControl>
              <FormControl id="orgRegisteredNumber" isRequired>
                <FormLabel>Organization Registered Number</FormLabel>
                <Input
                  type="text"
                  value={orgRegisteredNumber}
                  onChange={(e) => setOrgRegisteredNumber(e.target.value)}
                />
              </FormControl>
              <FormControl id="orgTelephone" isRequired>
                <FormLabel>Telephone Number</FormLabel>
                <Input
                  type="tel"
                  value={orgTelephone}
                  onChange={(e) => setOrgTelephone(e.target.value)}
                />
              </FormControl>
              <FormControl id="orgAddress" isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  type="text"
                  value={orgAddress}
                  onChange={(e) => setOrgAddress(e.target.value)}
                />
              </FormControl>
              <FormControl id="orgEmail" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={orgEmail}
                  onChange={(e) => setOrgEmail(e.target.value)}
                />
              </FormControl>
             {/*  <FormControl id="orgConfirmationDocument" isRequired>
                <FormLabel>Organization Registered Confirmation Document</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setOrgConfirmationDocument(e.target.files[0])}
                />
              </FormControl>
 */}
              {/* Contact Person Information */}
              <FormControl id="contactPersonName" isRequired>
                <FormLabel>Name of the Contact Person</FormLabel>
                <Input
                  type="text"
                  value={contactPersonName}
                  onChange={(e) => setContactPersonName(e.target.value)}
                />
              </FormControl>
              <FormControl id="contactPersonPhone" isRequired>
                <FormLabel>Contact Person's Phone Number</FormLabel>
                <Input
                  type="tel"
                  value={contactPersonPhone}
                  onChange={(e) => setContactPersonPhone(e.target.value)}
                />
              </FormControl>
              <FormControl id="contactPersonEmail" isRequired>
                <FormLabel>Contact Person's Email address</FormLabel>
                <Input
                  type="email"
                  value={contactPersonEmail}
                  onChange={(e) => setContactPersonEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="contactPersonNIC" isRequired>
                <FormLabel>Contact Person's NIC Number</FormLabel>
                <Input
                  type="text"
                  value={contactPersonNIC}
                  onChange={(e) => setContactPersonNIC(e.target.value)}
                />
              </FormControl>

              <FormControl id="description" isRequired>
                <FormLabel>Brief description about the Organization</FormLabel>
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
