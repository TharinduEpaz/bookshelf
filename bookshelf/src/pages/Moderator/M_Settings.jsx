import {
  Box,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Flex,
  Button,
  ButtonGroup,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillEdit } from "react-icons/ai";
import { BiX, BiCheck, BiShowAlt, BiHide } from "react-icons/bi";
import { userContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";

export default function Settings() {
  const { user, setUser } = useContext(userContext);
  const [isEditFName, setIsEditFName] = useState(false);
  const [isEditLName, setIsEditLName] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [userData, setUserData] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurretPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validateErrors, setErrors] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessAlert1, setShowSuccessAlert1] = useState(false);
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //URLs
  const updateUserUrl = "http://localhost:3000/api/v1/users/" + user.user.userId;
  const updatePasswordUrl = "http://localhost:3000/api/v1/users/updatePassword"

  // Get User Details
  const getUserDetails = async () => {
    try {
      const response = await fetch(
        updateUserUrl
      );
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
      errors = "First name cannot be empty"
    }
    if (lName === "") {
      errors = "Last name cannot be empty"
    }
    if (email === "") {
      errors = "Email cannot be empty"
    }
    if (/\d/.test(fName) || /\d/.test(lName)) {
      errors = "Name cannot contain digits or special characters"
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      errors = "Invalid email"
    }
    
    setErrors(errors);
    return errors === "";
  }

  //Valldate Password
  const validatePassword= () => {
    let errors = "";
    if(currentPassword === ""){
      errors = "Please enter current password"
    }
    if(newPassword === ""){
      errors = "Please enter new password"
    }
    if(confirmPassword === ""){
      errors = "Please confirm new password"
    }
    if(newPassword !== confirmPassword){
      errors = "Passwords do not match"
    }
    setPasswordErrors(errors);
    return errors === "";
  }

  // Update General Details
  const updateGeneralDetails = async (e) => {
    e.preventDefault();
    try {
      if(validateForm()){
        const response = await axios.patch(
          updateUserUrl,
          {
            firstName: fName,
            lastName: lName,
            email: email,
            password: newPassword,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setShowSuccessAlert1(true);
        console.log(response);
      }
      else {
        setShowSuccessAlert1(false);
      }
    } catch (error) {
      console.error(error);
      setError(error.response.data.msg);
    }
  };

  //Update Password
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if(validatePassword()){
        console.log(currentPassword);
        const response = await axios.patch(
          updatePasswordUrl,
          {
            oldPassword: currentPassword,
            newPassword: newPassword,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setShowSuccessAlert2(true);
        setPasswordError(false)
        setPasswordErrors(false)
        if(response.OK){
          setCurretPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      }

      else {
        setShowSuccessAlert2(false);
        setPasswordError(false);
        console.log("invalid")
      }
    } catch (error) {
      console.error(error);
      setPasswordError(error.response.data.msg);
      setShowSuccessAlert2(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      <Box p={10}>
        <Tabs>
          <TabList>
            <Tab>General Setting</Tab>
            <Tab>Change Password</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* General Setting */}
              {error && <Alert status="error"> <AlertIcon /> {error}</Alert>}
              {validateErrors && <Alert status="error"> <AlertIcon /> {validateErrors}</Alert>}
              {showSuccessAlert1 && (<Alert status="success" mt={4}><AlertIcon />Profile updated successfully!</Alert>)}
              <form onSubmit={updateGeneralDetails}>
                {/* First Name */}
                <FormControl>
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
                        isEditFName
                          ? setIsEditFName(false)
                          : setIsEditFName(true);
                      }}
                    >
                      {isEditFName ? (
                        <Icon as={BiCheck} />
                      ) : (
                        <Icon as={AiFillEdit} />
                      )}
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
                <FormControl>
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
                        isEditLName
                          ? setIsEditLName(false)
                          : setIsEditLName(true);
                      }}
                    >
                      {isEditLName ? (
                        <Icon as={BiCheck} />
                      ) : (
                        <Icon as={AiFillEdit} />
                      )}
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
                        isEditEmail
                          ? setIsEditEmail(false)
                          : setIsEditEmail(true);
                      }}
                    >
                      {isEditEmail ? (
                        <Icon as={BiCheck} />
                      ) : (
                        <Icon as={AiFillEdit} />
                      )}
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
                <Button colorScheme="blue" mt={5} type="submit">
                  Save Changes
                </Button>
              </form>
            </TabPanel>

            <TabPanel>
              {/* Change Password */}
              {passwordError && <Alert status="error"> <AlertIcon /> {passwordError}</Alert>}
              {passwordErrors && <Alert status="error"> <AlertIcon /> {passwordErrors}</Alert>}
              {showSuccessAlert2 && (<Alert status="success" mt={4}><AlertIcon />Password updated successfully!</Alert>)}
              <form onSubmit={updatePassword}>
              <FormControl>
                <FormLabel fontWeight={"semibold"}>Current Password</FormLabel>
                <Flex alignItems={"center"}>
                  <Input type={showCurrentPassword ? 'text' : 'password'} value={currentPassword} onChange={(e) => setCurretPassword(e.target.value)}/>
                {
                  !showCurrentPassword ? (
                    <Icon as={BiShowAlt} w={25} h={25} color="gray" margin={-50} cursor={"pointer"} zIndex={1} onClick={() =>{
                      setShowCurrentPassword(true)
                      console.log("cliked")
                    }} />
                  ) : (
                    
                    <Icon as={BiHide} w={25} h={25} color="gray" margin={-50} cursor={"pointer"} zIndex={1} onClick={() => {
                      setShowCurrentPassword(false)
                    }} />
                  )
                }
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"}>New Password</FormLabel>
                <Flex alignItems={"center"}>
                  <Input type={showNewPassword ? 'text' : 'password'} value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
                {
                  !showNewPassword ? (
                    <Icon as={BiShowAlt} w={25} h={25} color="gray" margin={-50} cursor={"pointer"} zIndex={1} onClick={() =>{
                      setShowNewPassword(true)
                      console.log("cliked")
                    }} />
                  ) : (
                    
                    <Icon as={BiHide} w={25} h={25} color="gray" margin={-50} cursor={"pointer"} zIndex={1} onClick={() => {
                      setShowNewPassword(false)
                    }} />
                  )
                }
                </Flex>
              </FormControl>
              <FormControl>
                <FormLabel fontWeight={"semibold"}>New Password</FormLabel>
                <Flex alignItems={"center"}>
                  <Input type={showConfirmPassword ? 'text' : 'password'} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                {
                  !showConfirmPassword ? (
                    <Icon as={BiShowAlt} w={25} h={25} color="gray" margin={-50} cursor={"pointer"} zIndex={1} onClick={() =>{
                      setShowConfirmPassword(true)
                      console.log("cliked")
                    }} />
                  ) : (
                    
                    <Icon as={BiHide} w={25} h={25} color="gray" margin={-50} cursor={"pointer"} zIndex={1} onClick={() => {
                      setShowConfirmPassword(false)
                    }} />
                  )
                }
                </Flex>
              </FormControl>
              <ButtonGroup mt={5}>
                <Button colorScheme="blue" mt={5} type="submit">
                  Update Password
                </Button>
                <Button variant={"outline"} colorScheme="red" mt={5} type="reset">
                  Cancel
                </Button>
              </ButtonGroup>
              </form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
}
