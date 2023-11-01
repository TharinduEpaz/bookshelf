import React from "react";
import {
  Button,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
} from "@chakra-ui/react";

import {FaSearch} from 'react-icons/fa'

function Search() {
  return (
    <>
      <InputGroup position={'fixed'}>
        <Input
          type="text"
          placeholder="Search to donate"
          colorScheme="blue"
          borderColor={'blue.600'}
          focusBorderColor="white.100"
          ml={2}    
          w={600}
          borderRadius={5}
          
        />
        <IconButton icon={<FaSearch />} color="blue.600" ml={2} borderRadius={5}  bg={'blue.100'} w={100}/>

        

      </InputGroup>
    </>
  );
}

export default Search;
