import React from "react";

import {
    Button,
    Spacer,
    Text,
    HStack,
    Select,
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    Stack,
    FormControl,
    FormLabel,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from "@chakra-ui/react";

import { BiFilterAlt } from "react-icons/bi";


export default function DonationsFilter() {
  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={<BiFilterAlt />}
        color={"gray.500"}
        borderColor={"gray.300"}
        variant="outline"
        pl={5}
        pr={5}
        size={"sm"}
      >
        Filter
      </MenuButton>
      <MenuList p={5} w={"350px"}>
        <Text fontSize={"lg"} fontWeight={"semibold"} pb={5}>
          Filter
        </Text>
        <Stack>
          <FormControl>
            <FormLabel>Organatation</FormLabel>
            <Select pl={5}>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </Select>
          </FormControl>
          <Button colorScheme="blue" borderRadius={10}>
            Filter
          </Button>
        </Stack>
      </MenuList>
    </Menu>
  );
}
