import React from "react";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
} from "@chakra-ui/react";

import {FaSearch} from 'react-icons/fa'

function Search() {
  return (
    <Stack spacing={4}>
      <InputGroup mt={{base:0,sm:10}}>
        <Input
          type="text"
          placeholder="Search thousands of books"
          colorScheme="blue"
          borderColor={'white'}
          focusBorderColor="white.100"
          ml={5}    
          
        />

        <InputRightAddon children={<IconButton icon={<FaSearch w='100%'/>}/>}/>

      </InputGroup>
    </Stack>
  );
}

export default Search;
