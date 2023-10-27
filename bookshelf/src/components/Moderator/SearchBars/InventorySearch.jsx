import React from "react";
import { InputGroup, Input, InputRightElement, Icon, Box, IconButton } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";
import axiosInstance from "../../../utils/axiosInstance";

export default function InventorySearch(props) {
  const [input, setInput] = React.useState("");
  const [results, setResults] = React.useState([]);
  const [filteredItems, setFilteredItems] = React.useState([]);

  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get("books", {
        withCredentials: true,
      });

      setResults(res.data);

    //   console.log(res.data);
    //   results && console.log(results);
    } catch (err) {
      console.log(err);
    }
  };

  const filterItems = Object.values(results).filter((item) => {
    return (
        item.title.toLowerCase().includes(input.toLowerCase()) ||
        item.author.toLowerCase().includes(input.toLowerCase())
    )
  });

  const handleChange = (value) => {
    setInput(value);
    fetchResults();
    setFilteredItems(filterItems);
    props.setPassValue(filteredItems);
    console.log(value);
  };
  
  return (
    <>
      <InputGroup w={"100%"}>
        <Input
          size="sm"
          placeholder="Search"
          onChange={(e) => handleChange(e.target.value)}
        />
        <InputRightElement pointerEvents={"none"}>
          <Icon as={BiSearchAlt} color={"gray.300"} />
        </InputRightElement>
      </InputGroup>

      {/* <Box
        // m={"auto"}
        mt={0}
        w="30%"
        boxShadow="sm"
        background={"rgba(255, 255, 255, 0.7)"}
        borderRadius={10}
        // bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={5}
        // position={"absolute"}
        left={"6%"}
        // justifyContent={'center'}
        zIndex={"9999"}
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
            zIndex={"9999"}
          >
            {result.id}
          </Box>
        ))}
      </Box> */}
    </>
  );
}
