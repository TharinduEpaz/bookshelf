import React from "react";
import { InputGroup, Input, InputRightElement, Icon } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

export default function InventorySearch(props) {

  const handleChange = (value) => {
    props.setPassValue(value);
  }

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
    </>
  );
}
