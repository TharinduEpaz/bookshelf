import React from "react";
import { IconButton, Input, Box } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);
 
  const navigate = useNavigate();
  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get(
        "books/getBookNames",
        {
          withCredentials: true,
        }
      );

      setResults(res.data);

      console.log(res.data);
      results && console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  const filterItems = Object.values(results).filter((item) => {
    return item.title.toLowerCase().includes(input.toLowerCase());
  });

  const handleChange = (value) => {
    setInput(value);
    fetchResults();
    setFilteredItems(filterItems);
    // console.log(results);
  };

  return (
    <>
      <Box
        
        
        w="80%"
        borderRadius="2xl"
    
       
        // bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2))"
        // filter="blur(8px)"
        
      
        display={"flex"}
        // justifyContent={'center'}
        alignItems={"center"}
        gap={5}
      >
        <Input
          type="text"
          w={"50%"}
          fontWeight={"extrabold"}
          placeholder="Search thousands of books"
          borderColor={"blue.400"}
          onChange={(e) => handleChange(e.target.value)}
        />
        <IconButton
          icon={<Search2Icon />}
          color="blue.300"
          ml={0}
          borderRadius={10}
          w={100}
          bg={"white"}
        />
      </Box>
      <Box
        
        mt={0}
        
        boxShadow="sm"
        background={"rgba(255, 255, 255,0.7)"}
        borderRadius={10}
        // bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={5}
        zIndex={10}
        position={"absolute"}
        
        // justifyContent={'center'}
        alignItems={"center"}
        gap={5}
        display={input.length > 0 ? "" : "none"}
      >
        {filteredItems.slice(0, 10).map((result) => (
          <Box
            fontSize={20}
            fontWeight={"medium"}
            onClick={() => navigate(`/shop/${result.id}`)}
            cursor={"pointer"}
          >
            {result.title}
          </Box>
        ))}
      </Box>
    </>
  );
}

export default Search;
