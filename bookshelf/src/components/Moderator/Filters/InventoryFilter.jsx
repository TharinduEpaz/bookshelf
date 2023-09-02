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

export default function InventoryFilter() {
  return (
    <>
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
              <HStack pl={5}>
                <Checkbox>Published</Checkbox>
                <Spacer />
                <Checkbox>Unpublished</Checkbox>
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Genre</FormLabel>
              <Select pl={5}>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <HStack pl={5}>
                <Stack>
                  <FormLabel>From</FormLabel>
                  <NumberInput>
                    <NumberInputField placeholder="0.00" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Stack>
                <Stack>
                  <FormLabel>To</FormLabel>
                  <NumberInput>
                    <NumberInputField placeholder="0.00" />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Stack>
              </HStack>
            </FormControl>
            <Button colorScheme="blue" borderRadius={10}>
              Filter
            </Button>
          </Stack>
        </MenuList>
      </Menu>
    </>
  );
}
