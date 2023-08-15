import React from 'react'
import { useState } from "react";
import axios from "axios";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Select,
  Box,
  Button, 
  ButtonGroup,
  Heading,
  Text,
  Alert,
  AlertIcon
} from '@chakra-ui/react'

export default function AdminAddModerator() {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const addModeratorUrl = "http://localhost:3000/api/v1/users";

  const addUser = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(addModeratorUrl, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        role: "Moderator",
        emailverified: true,
      });
      console.log(response.data);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setRole("");

      window.location.href = "/adminusermgt";
      
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error.response);
    }
  };



  return (
    
    <>

    <Box
       m={"auto"}
       mt={10}
       w="85%"
       h="100%"
       borderColor={'rgba(0, 0, 0, 0.20)'}
       borderWidth={'0.5px'}
       borderRadius="6px"
       bg='rgba(255, 255, 255, 0.90)'
       boxShadow="sm"
       bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
       // filter="blur(8px)"
       backdropFilter="blur(14.5px)"
       p={4}
    >

    <Heading
      fontSize={'32px'} 
      color={'#000'} 
      fontFamily={'Montserrat'} 
      fontStyle={'normal'} 
      fontWeight={'500'} 
      //lineHeight={'normal'}
      //textAlign={'center'}
      mt={'10px'}
      mb={'10px'}
      pl={10}
      pr={10}
    >
      Add Moderator
    </Heading>

    <Text
      fontSize={'14px'} 
      color={'#575F6E'} 
      fontFamily={'Montserrat'} 
      fontStyle={'normal'} 
      fontWeight={'100'} 
      //lineHeight={'normal'}
      //textAlign={'center'}
      mb={'40px'}
      pl={10}
      pr={10}
    >
      Fill in the data for profile. It will take a couple of minutes. You only need a passport
    </Text>

    {error && (
              <Alert status="error">
                {" "}
                <AlertIcon /> {error}
              </Alert>
            )}

    <form onSubmit={addUser}>

      {/*
    <FormControl pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>User Type</FormLabel>
      
        <Select placeholder='Moderator' fontSize={14} h={8}>
          <option>Buyer</option>
  </Select>
          <Input
          fontSize={14} 
          h={8}
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </FormControl>
      */}

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>First Name</FormLabel>
        <Input
          fontSize={14} 
          h={8}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>Last Name</FormLabel>
      <Input
          fontSize={14} 
          h={8}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>Email</FormLabel>
      <Input
          fontSize={14} 
          h={8}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>Password</FormLabel>
      <Input
          fontSize={14} 
          h={8}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <Button 
        type="submit"
        colorScheme='blue' 
        variant='solid' 
        mt={10} 
        mr={5} 
        ml={10} 
        mb={10}>
      Add User
    </Button>

    <Button 

      type="submit"
      colorScheme='red' 
      variant='outline' 
      mt={10} 
      mb={10}>
        Cancel
    </Button>
</form>
    </Box>
    
      </>

  )
}
