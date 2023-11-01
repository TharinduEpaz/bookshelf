import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
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
  const [orgType, setOrgType] = useState('');
  const [orgRegisteredNumber, setOrgRegisteredNumber] = useState('');
  const [orgTelephone, setOrgTelephone] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPersonPhone, setContactPersonPhone] = useState('');
  const [contactPersonEmail, setContactPersonEmail] = useState('');
  const [contactPersonNIC, setContactPersonNIC] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isNICValid, setIsNICValid] = useState(true);
  const [NICError, setNICError] = useState('');

  const register = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      setError('Invalid email address');
      return;
    }

    if (!isPhoneNumberValid) {
      setError('Invalid phone number');
      return;
    }

    if (!isNICValid) {
      setError('Invalid NIC number');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('orgName', orgName);
      formData.append('orgType', orgType);
      formData.append('orgRegisteredNumber', orgRegisteredNumber);
      formData.append('orgTelephone', orgTelephone);
      formData.append('orgAddress', orgAddress);
      formData.append('orgEmail', orgEmail);
      formData.append('contactPersonName', contactPersonName);
      formData.append('contactPersonPhone', contactPersonPhone);
      formData.append('contactPersonEmail', contactPersonEmail);
      formData.append('contactPersonNIC', contactPersonNIC);
      formData.append('description', description);

      const response = await fetch("http://localhost:3000/api/v1/donations/addRequest", {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setIsSuccessModalOpen(true);
        setError('');
        setOrgName('');
        setOrgType('');
        setOrgRegisteredNumber('');
        setOrgTelephone('');
        setOrgAddress('');
        setOrgEmail('');
        setContactPersonName('');
        setContactPersonPhone('');
        setContactPersonEmail('');
        setContactPersonNIC('');
        setDescription('');
        handleReset();
      } else {
        setError('Something went wrong!');
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  
  const handleReset = () => {
    setOrgName('');
    setOrgType('');
    setOrgRegisteredNumber('');
    setOrgTelephone('');
    setOrgAddress('');
    setOrgEmail('');
    setContactPersonName('');
    setContactPersonPhone('');
    setContactPersonEmail('');
    setContactPersonNIC('');
    setDescription('');
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    console.log(handleCloseSuccessModal);
  };

  const handleOrgEmailChange = (e) => {
    const email = e.target.value;
    // Use a regular expression to validate the email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    setIsEmailValid(emailRegex.test(email));
    setOrgEmail(email);
    console.log(handleOrgEmailChange);
  };

  const handlePhoneNumberChange = (e) => {
    const phoneNumber = e.target.value;
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (sanitizedPhoneNumber.length === 10) {
      setIsPhoneNumberValid(true);
      setOrgTelephone(sanitizedPhoneNumber);
      setError('');
    } else {
      setIsPhoneNumberValid(false);
      setError('Phone number must contain exactly 10 digits');
    }
    console.log(handlePhoneNumberChange);
  };

  const handleContactPersonPhoneChange = (e) => {
    const phoneNumber = e.target.value;
    const sanitizedPhoneNumber = phoneNumber.replace(/\D/g, '');

    if (sanitizedPhoneNumber.length === 10) {
      setIsPhoneNumberValid(true);
      setContactPersonPhone(sanitizedPhoneNumber);
      setError("Contact person's phone number must contain exactly 10 digits");
    } else {
      setIsPhoneNumberValid(false);
      setError("Contact person's phone number must contain exactly 10 digits");
    }
  };
  
  const handleContactPersonNICChange = (e) => {
    const nic = e.target.value;
    const sanitizedNIC = nic.replace(/\D/g, '');

    if (sanitizedNIC.length === 12 || (sanitizedNIC.length === 9 && nic.toUpperCase().endsWith('V'))) {
      setIsNICValid(true);
      setContactPersonNIC(sanitizedNIC);
      setNICError('');
    } else {
      setIsNICValid(false);
      setNICError("Contact person's NIC should contain 12 digits or 9 digits with 'V' at the end");
    }
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
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8} w={'600px'}>
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
              <FormControl id="orgType" isRequired>
                <FormLabel>Type of the Organization</FormLabel>
                <Select
                  value={orgType}
                  onChange={(e) => setOrgType(e.target.value)}
                >
                  <option value="">Select an option</option>
                  <option value="School">School</option>
                  <option value="Library">Library</option>
                  <option value="Children's Home">Children's Home</option>
                  <option value="Elders' Home">Elders' Home</option>
                  <option value="Charity Organization">Charity Organization</option>
                  <option value="Other">Other</option>
                </Select>
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
                  type="text"
                  value={orgTelephone}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                />
                {!isPhoneNumberValid && (
                  <Text color="red" fontSize="sm">Invalid phone number</Text>
                )}
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
                  onChange={handleOrgEmailChange}
                />
                {!isEmailValid && (
                  <Text color="red" fontSize="sm">Invalid email address</Text>
                )}
              </FormControl>

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
                  type="text"
                  value={contactPersonPhone}
                  onChange={handleContactPersonPhoneChange}
                />
                {!isPhoneNumberValid && (
                  <Text color="red" fontSize="sm">
                    Contact person's phone number must contain exactly 10 digits
                  </Text>
                )}
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
            onChange={handleContactPersonNICChange}
          />
          {!isNICValid && (
            <Text color="red" fontSize="sm">
              {NICError}
            </Text>
          )}
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
    type="button"
    size="lg"
    bg={'gray.400'}
    color={'white'}
    _hover={{
      bg: 'gray.500',
    }}
    onClick={handleReset}
  >
    Reset
  </Button>
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