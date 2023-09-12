import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  CircularProgress,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BiX, BiCheck } from "react-icons/bi";
import { userContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";

export default function GeneralSetting() {
  const { user } = useContext(userContext);
  const [isEditFName, setIsEditFName] = useState(false);
  const [isEditLName, setIsEditLName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [userData, setUserData] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [validateErrors, setErrors] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLodaing] = useState(false);
  const [showSuccessAlert1, setShowSuccessAlert1] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  //URLs
  const updateUserUrl =
    "http://localhost:3000/api/v1/users/" + user.user.userId;

  // Get User Details
  const getUserDetails = async () => {
    try {
      const response = await fetch(updateUserUrl);
      const userData = await response.json();
      setUserData(userData);
      setFName(userData.firstName);
      setLName(userData.lastName);
      setEmail(userData.email);
    } catch (error) {
      console.error(error);
    }
  };

  //Validate General Details
  const validateForm = () => {
    let errors = "";
    if (fName === "") {
      errors = "First name cannot be empty";
    }
    if (lName === "") {
      errors = "Last name cannot be empty";
    }
    if (email === "") {
      errors = "Email cannot be empty";
    }
    if (/\d/.test(fName) || /\d/.test(lName)) {
      errors = "Name cannot contain digits or special characters";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors = "Invalid email";
    }

    setErrors(errors);
    if (errors === "") {
      onOpen();
    }
  };

  // Update General Details
  const updateGeneralDetails = async (e) => {
    e.preventDefault();
    try {
      setIsLodaing(true);
      const response = await axios.patch(
        updateUserUrl,
        {
          firstName: fName,
          lastName: lName,
          email: email,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setIsLodaing(false);
      if (response.statusText === "OK") {
        setShowSuccessAlert1(true);
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.msg);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (isLoading) {
    return (
      <Flex justifyContent={"center"} alignItems={"center"} h={"70vh"}>
        <CircularProgress isIndeterminate color="blue.300" />
      </Flex>
    );
  }

  return (
    <>
      {error && (
        <Alert status="error">
          {" "}
          <AlertIcon /> {error}
        </Alert>
      )}
      {validateErrors && (
        <Alert status="error">
          {" "}
          <AlertIcon /> {validateErrors}
        </Alert>
      )}
      {showSuccessAlert1 && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Profile updated successfully!
        </Alert>
      )}
      <form onSubmit={updateGeneralDetails}>
        {/* First Name */}
        <FormControl mb={5}>
          <FormLabel fontWeight={"semibold"}>First Name</FormLabel>
          <Flex>
            <Input
              type="text"
              value={fName}
              width={"50%"}
              onChange={(e) => setFName(e.target.value)}
              isReadOnly={!isEditFName}
            />
            <Box
              display={"flex"}
              bg={"blue.600"}
              width={50}
              justifyContent={"center"}
              alignItems={"center"}
              color={"white"}
              borderRadius={"md"}
              mr={2}
              onClick={() => {
                isEditFName ? setIsEditFName(false) : setIsEditFName(true);
              }}
            >
              {isEditFName ? <Icon as={BiCheck} /> : <Icon as={AiFillEdit} />}
            </Box>
            {isEditFName ? (
              <Box
                display={"flex"}
                bg={"red.600"}
                width={50}
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
                borderRadius={"md"}
                onClick={() => {
                  setFName(userData.firstName);
                  setIsEditFName(false);
                }}
              >
                <Icon as={BiX} />
              </Box>
            ) : null}
          </Flex>
        </FormControl>

        {/* Last Name */}
        <FormControl mb={5}>
          <FormLabel fontWeight={"semibold"}>Last Name</FormLabel>
          <Flex>
            <Input
              type="text"
              value={lName}
              width={"50%"}
              onChange={(e) => setLName(e.target.value)}
              isReadOnly={!isEditLName}
            />
            <Box
              display={"flex"}
              bg={"blue.600"}
              width={50}
              justifyContent={"center"}
              alignItems={"center"}
              color={"white"}
              borderRadius={"md"}
              mr={2}
              onClick={() => {
                isEditLName ? setIsEditLName(false) : setIsEditLName(true);
              }}
            >
              {isEditLName ? <Icon as={BiCheck} /> : <Icon as={AiFillEdit} />}
            </Box>
            {isEditLName ? (
              <Box
                display={"flex"}
                bg={"red.600"}
                width={50}
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
                borderRadius={"md"}
                onClick={() => {
                  setLName(userData.lastName);
                  setIsEditLName(false);
                }}
              >
                <Icon as={BiX} />
              </Box>
            ) : null}
          </Flex>
        </FormControl>

        {/* Email */}
        <FormControl>
          <FormLabel fontWeight={"semibold"}>Email</FormLabel>
          <Flex>
            <Input
              type="text"
              value={email}
              width={"50%"}
              onChange={(e) => setEmail(e.target.value)}
              isReadOnly={!isEditEmail}
            />
            <Box
              display={"flex"}
              bg={"blue.600"}
              width={50}
              justifyContent={"center"}
              alignItems={"center"}
              color={"white"}
              borderRadius={"md"}
              mr={2}
              onClick={() => {
                isEditEmail ? setIsEditEmail(false) : setIsEditEmail(true);
              }}
            >
              {isEditEmail ? <Icon as={BiCheck} /> : <Icon as={AiFillEdit} />}
            </Box>
            {isEditEmail ? (
              <Box
                // display={"flex"}
                bg={"red.600"}
                width={50}
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
                borderRadius={"md"}
                onClick={() => {
                  console.log(userData.email);
                  setEmail(userData.email);
                  setIsEditEmail(false);
                }}
              >
                <Icon as={BiX} />
              </Box>
            ) : null}
          </Flex>
        </FormControl>

        {/* Save Button */}
        <Button
          colorScheme="blue"
          mt={5}
          onClick={() => {
            validateForm();
            setShowSuccessAlert1(false);
          }}
        >
          Save Changes
        </Button>
      </form>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Password
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
                onClick={(e) => {
                  updateGeneralDetails(e);
                  onClose();
                }}
                ml={3}
              >
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
