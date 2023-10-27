import React from 'react'
import {FaSearch} from 'react-icons/fa'

import {
    Button,
    IconButton,
    Input,
    InputGroup,
    InputRightAddon,
    Stack,
  } from "@chakra-ui/react";
  

export default function SearchBar() {
  return (
    
    <InputGroup>
    <Input
      type="text"
      placeholder="Search User"
      colorScheme="blue"
      borderColor={'gray.200'}
      focusBorderColor={'white.100'}
      mt={5}
      ml={1}    
      w={500}
      borderRadius={5}
      
    />
    <IconButton icon={<FaSearch />} color="blue.300" mt={5} ml={2} borderRadius={100} variant={'ghost'} />

    

  </InputGroup>

  )
}



