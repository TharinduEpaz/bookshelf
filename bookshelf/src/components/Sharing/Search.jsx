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

function Search(props) {

  const requestDetails = props.requestDetails;
  const setFilteredRequestDetails = props.setFilteredRequestDetails;
  const [query, setQuery] = React.useState("");
 
  const isLoading = props.isLoading;


  
  const names = Object.keys(requestDetails).map((item) => {
      return requestDetails[item].bookName;
  });
    console.log(names);
  
   console.log(query);

   const handleSearch = (e) => {
    const newRequestDetails = {};
    for (const key in requestDetails) {
      if (requestDetails[key].bookName.includes(query)) {
        newRequestDetails[key] = requestDetails[key];
      }
    }
    setFilteredRequestDetails(newRequestDetails);

  };
  
  
  // console.log(filteredRequestDetails);

  



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
          onChange={(e) => setQuery(e.target.value)}
          
        />
        <IconButton icon={<FaSearch />} color="blue.300" ml={2} borderRadius={100} variant={'ghost'} 
        onClick={handleSearch}
        />

        

      </InputGroup>
    </>
  );
}

export default Search;