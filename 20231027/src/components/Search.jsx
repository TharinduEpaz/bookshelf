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
      <InputGroup>
        <Input
          type="text"
          placeholder="Search thousands of books"
          colorScheme="blue"
          borderColor={'white'}
          focusBorderColor="white.100"
          ml={5}    
          w={300}
          borderRadius={100}
          
        />
        <IconButton icon={<FaSearch />} color="blue.300" ml={2} borderRadius={100} variant={'ghost'} />

        

      </InputGroup>
    </>
  );
}

export default Search;
