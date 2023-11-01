// Your component code
import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
} from "@chakra-ui/react";

function ManageRequest() {
  return (
    <TableContainer
      bg={"white"}
      border={"1px"}
      borderColor={"blue.200"}
      borderRadius={10}
      padding={10}
    >
      <Table size="lg">
        <Thead>
          <Tr>
            <Th align="center">Book</Th>
            <Th align="center">Details</Th>
            <Th> </Th>
            <Th> </Th>
            <Th align="center">Email</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Segun Adebayo</Td>
            <Td>Founder of Chakra UI</Td>

            <Td colSpan={2} align="center">
              <Button
                colorScheme="purple"
                variant={"outline"}
                borderRadius={15}
              >
                Edit
              </Button>
              <Button
                marginLeft={"5"}
                colorScheme="red"
                variant={"outline"}
                borderRadius={15}
              >
                Delete
              </Button>
            </Td>
            <Td >sage@chakra-ui.com</Td>
          </Tr>
          <Tr>
            <Td>Mark Chandler</Td>
            <Td>Developer</Td>
            <Td colSpan={2} align="center">
              <Button colorScheme="purple" variant={"outline"} borderRadius={15}>
                Edit
              </Button>
              <Button
                marginLeft={"5"}
                colorScheme="red"
                variant={"outline"}
                borderRadius={15}
              >
                Delete
              </Button>
            </Td>
            <Td >mark@chakra-ui.com</Td>
          </Tr>
          <Tr>
            <Td>Lazar Nikolov</Td>
            <Td>DevRel</Td>
            <Td colSpan={2} align="center">
              <Button colorScheme="purple" variant={"outline"} borderRadius={15}>
                Edit
              </Button>
              <Button
                marginLeft={"5"}
                colorScheme="red"
                variant={"outline"}
                borderRadius={15}
              >
                Delete
              </Button>
            </Td>

            <Td>lazar@chakra-ui.com</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ManageRequest;
