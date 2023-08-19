import React from "react";

import {
    Button,
    Text,
    Checkbox,
    Menu,
    MenuButton,
    MenuList,
    Stack,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";

import { BiFilterAlt } from "react-icons/bi";


export default function OrganizationsFilter() {
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
            <FormLabel>Status</FormLabel>
            <Stack pl={5}>
              <Checkbox>Registered</Checkbox>
              <Checkbox>Pending</Checkbox>
              <Checkbox>Rejected</Checkbox>
            </Stack>
          </FormControl>
          <Button colorScheme="blue" borderRadius={10}>
            Filter
          </Button>
        </Stack>
      </MenuList>
    </Menu>
  );
}
