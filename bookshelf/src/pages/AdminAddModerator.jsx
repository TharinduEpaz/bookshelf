import React from 'react'
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
  Text
} from '@chakra-ui/react'

export default function AdminAddModerator() {
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

    <FormControl pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>User Type</FormLabel>
        <Select placeholder='Moderator' fontSize={14} h={8}>
          <option>Buyer</option>
          <option>Subscriber</option>
          <option>Donator</option>
        </Select>
      </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>First Name</FormLabel>
      <Input type='name' fontSize={14} h={8}/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>Second Name</FormLabel>
      <Input type='name' fontSize={14} h={8}/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>Email</FormLabel>
      <Input type='email' fontSize={14} h={8}/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <FormControl isRequired pb={5} pl={10} pr={10}>
      <FormLabel fontSize={14}>Password</FormLabel>
      <Input type='password' fontSize={14} h={8}/>
      {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
    </FormControl>

    <Button colorScheme='blue' variant='solid' mt={10} mr={5} ml={10} mb={10}>
      Add User
    </Button>

    <Button colorScheme='red' variant='outline' mt={10} mb={10}>
      Cancel
    </Button>

    </Box>
    
      </>

  )
}
