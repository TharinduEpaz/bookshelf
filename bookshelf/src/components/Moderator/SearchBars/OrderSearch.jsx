import React from "react";
import { InputGroup, Input, InputRightElement, Icon } from "@chakra-ui/react";
import { BiSearchAlt } from "react-icons/bi";

export default function OrderSearch() {
    return (
        <>
          <InputGroup w={"100%"}>
            <Input size="sm" placeholder="Search" />
            <InputRightElement pointerEvents={"none"}>
              <Icon as={BiSearchAlt} color={"gray.300"} />
            </InputRightElement>
          </InputGroup>
        </>
      );
}
