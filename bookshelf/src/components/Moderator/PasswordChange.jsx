import {
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
import { BiShowAlt, BiHide } from "react-icons/bi";
import { userContext } from "../../context/userContext";
import { useContext } from "react";
import axios from "axios";

export default function PasswordChange() {
  const { user, setUser } = useContext(userContext);
  const [currentPassword, setCurretPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showSuccessAlert2, setShowSuccessAlert2] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //URLs
  const updatePasswordUrl = "http://localhost:3000/api/v1/users/updatePassword";

  //Valldate Password
  const validatePassword = () => {
    let errors = "";
    if (newPassword !== confirmPassword) {
        errors = "Passwords do not match";
      }
    if (confirmPassword === "") {
      errors = "Please enter confirm password";
    }
    if (newPassword === "") {
      errors = "Please enter new password";
    }
    if (currentPassword === "") {
      errors = "Please add current password";
    }
    setPasswordErrors(errors);
    return errors === "";
  };

  //Update Password
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      if (validatePassword()) {
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
        setPasswordError(false);
        setPasswordErrors(false);
        if (response.OK) {
          setCurretPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } else {
        setShowSuccessAlert2(false);
        setPasswordError(false);
        console.log("invalid");
      }
    } catch (error) {
      console.error(error);
      setPasswordError(error.response.data.msg);
      setShowSuccessAlert2(false);
    }
  };

  return (
    <>
      {passwordError && (
        <Alert status="error">
          {" "}
          <AlertIcon /> {passwordError}
        </Alert>
      )}
      {passwordErrors && (
        <Alert status="error">
          {" "}
          <AlertIcon /> {passwordErrors}
        </Alert>
      )}
      {showSuccessAlert2 && (
        <Alert status="success" mt={4}>
          <AlertIcon />
          Password updated successfully!
        </Alert>
      )}
      <form onSubmit={updatePassword}>
        <FormControl>
          <FormLabel fontWeight={"semibold"}>Current Password</FormLabel>
          <Flex alignItems={"center"}>
            <Input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurretPassword(e.target.value)}
            />
            {!showCurrentPassword ? (
              <Icon
                as={BiShowAlt}
                w={25}
                h={25}
                color="gray"
                margin={-50}
                cursor={"pointer"}
                zIndex={1}
                onClick={() => {
                  setShowCurrentPassword(true);
                }}
              />
            ) : (
              <Icon
                as={BiHide}
                w={25}
                h={25}
                color="gray"
                margin={-50}
                cursor={"pointer"}
                zIndex={1}
                onClick={() => {
                  setShowCurrentPassword(false);
                }}
              />
            )}
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={"semibold"}>New Password</FormLabel>
          <Flex alignItems={"center"}>
            <Input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {!showNewPassword ? (
              <Icon
                as={BiShowAlt}
                w={25}
                h={25}
                color="gray"
                margin={-50}
                cursor={"pointer"}
                zIndex={1}
                onClick={() => {
                  setShowNewPassword(true);
                }}
              />
            ) : (
              <Icon
                as={BiHide}
                w={25}
                h={25}
                color="gray"
                margin={-50}
                cursor={"pointer"}
                zIndex={1}
                onClick={() => {
                  setShowNewPassword(false);
                }}
              />
            )}
          </Flex>
        </FormControl>
        <FormControl>
          <FormLabel fontWeight={"semibold"}>New Password</FormLabel>
          <Flex alignItems={"center"}>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!showConfirmPassword ? (
              <Icon
                as={BiShowAlt}
                w={25}
                h={25}
                color="gray"
                margin={-50}
                cursor={"pointer"}
                zIndex={1}
                onClick={() => {
                  setShowConfirmPassword(true);
                }}
              />
            ) : (
              <Icon
                as={BiHide}
                w={25}
                h={25}
                color="gray"
                margin={-50}
                cursor={"pointer"}
                zIndex={1}
                onClick={() => {
                  setShowConfirmPassword(false);
                }}
              />
            )}
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
    </>
  );
}
