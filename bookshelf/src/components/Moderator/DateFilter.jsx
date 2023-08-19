import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Checkbox,
  HStack,
  Input,
} from "@chakra-ui/react";
import { BiCalendarAlt } from "react-icons/bi";

function DateFilter() {
  const [isChecked, setIsChecked] = React.useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={Button}
          leftIcon={<BiCalendarAlt />}
          color={"gray.500"}
          borderColor={"gray.300"}
          variant="outline"
          pl={5}
          pr={5}
          size={"sm"}
        >
          Filter
        </MenuButton>
        <MenuList p={5} w={"fit-content"}>
          <Stack>
            <FormControl>
              <FormLabel fontSize="lg" fontWeight="semibold" mb={5}>
                Filter By Date
              </FormLabel>
              <HStack gap={10}>
                <Stack>
                  <Checkbox>This Week</Checkbox>
                  <Checkbox>This Month</Checkbox>
                  <Checkbox>This Year</Checkbox>
                </Stack>
                <Stack>
                  <Checkbox>Last Week</Checkbox>
                  <Checkbox>Last Month</Checkbox>
                  <Checkbox>last Year</Checkbox>
                </Stack>
              </HStack>
              <Checkbox
                mt={5}
                checked={isChecked}
                onChange={handleCheckboxChange}
              >
                Date Range
              </Checkbox>
            </FormControl>
            {isChecked ? (
              <HStack>
                <FormControl>
                  <FormLabel>From</FormLabel>
                  <Input type="date" />
                </FormControl>
                <FormControl>
                  <FormLabel>To</FormLabel>
                  <Input type="date" />
                </FormControl>
              </HStack>
            ) : null}

            <Button colorScheme="blue" borderRadius={10}>
              Filter
            </Button>
          </Stack>
        </MenuList>
      </Menu>
    </>
  );
}

export default DateFilter;
