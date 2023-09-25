import { Checkbox, Flex, Select, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FaStar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

function Filter(props) {

  const { setPrice, setRating, setStock, setSort } = props;




  return (
    <Flex gap={10} alignItems={"center"}>
      <Text fontWeight={"bold"}>Filter by </Text>
      <Select
        placeholder="price"
        w={"100"}
        size={"sm"}
        borderRadius={5}
        borderColor={"blue.200"}
        onChange={(e) => setPrice(e.target.value)}
      >
        <option value="ASC">Low to High</option>
        <option value="DESC">High to Low</option>
      </Select>
      <Select
        placeholder="Rating"
        w={"100"}
        size={"sm"}
        borderRadius={5}
        borderColor={"blue.200"}
        onChange={(e) => setRating(e.target.value)}
      >
        <option value="5">5 </option>
        <option value="4">4 </option>
        <option value="3">3 </option>
        <option value="2">2 </option>
        <option value="1">1 </option>
      </Select>
      <Select
        placeholder="Stock"
        w={"100"}
        size={"sm"}
        borderRadius={5}
        borderColor={"blue.200"}
        onChange={(e) => setStock(e.target.value)}
      >
        <option value="1">In Stock</option>
        <option value="-1">Out of Stock</option>
      </Select>

      <Spacer></Spacer>
      <Text fontWeight={"bold"}>Sort by </Text>
      <Select
        placeholder="Best Match"
        w={"100"}
        size={"sm"}
        borderRadius={5}
        borderColor={"blue.200"}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="ASC">A-Z</option>
        <option value="DESC">Z-A</option>
      </Select>
    </Flex>
  );
}

export default Filter;
