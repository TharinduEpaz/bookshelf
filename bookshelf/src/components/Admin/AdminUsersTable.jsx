import React, { useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Checkbox,
  Select,
  HStack,
  Button,
  Text,
  Icon,
  Spacer,
} from "@chakra-ui/react";

import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

export default function AdminUsersTable({ list, columnNames, deleteUser  }) {

  const [itemsPerPage, setItemsPerPage] = useState(5); // Set initial items per page to 2
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleItemsPerPageChange = (event) => {
    const selectedItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset to the first page when changing items per page
  };


  return (
    
    <TableContainer>
    <Table variant='simple' p={10} mt={50} borderWidth={1} borderColor="gray.200" fontSize="sm">

      <Thead fontWeight="semibold">
        <Tr bgColor="gray.100">
          <Td>
            <Checkbox></Checkbox>
          </Td>
            {columnNames.map((headerItem,index)=>(
              <Td key={index}>{headerItem}</Td>
            ))
            }
             <Td>Action</Td>
        </Tr>
      </Thead>

      <Tbody>
        {Object.values(
          currentItems.map((Obj, index) => (
            <Tr key={index}>
              <Td>
                <Checkbox />
              </Td>

              {Object.values(Obj).map((value, index2) => (
                <Td key={index2}>{value}</Td>
              ))}
              
               <Td>
               <Button 
                  colorScheme="red" size="sm" 
                  onClick={() => deleteUser(Obj.id)}
                >
                  Suspend
                </Button>
              </Td>
            </Tr>
          ))
        )}
      </Tbody>
     
    </Table>

    <HStack justifyContent={"flex-end"} mt={5}>
      <Select
        w="fit-content"
        size={"sm"}
        borderRadius={"md"}
        className="items-per-page"
        value={itemsPerPage}
        onChange={handleItemsPerPageChange}
      >
        <option value="5">5</option>
        <option value="10">10</option>
      </Select>
      <Text fontSize={"sm"} mr={5}>
        Items per page
      </Text>

      <Spacer />
      <Icon
        as={BiChevronLeft}
        boxSize={6}
        cursor={"pointer"}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />

      <Text fontSize={"sm"}>
        Page {currentPage} of {totalPages}
      </Text>
      
      <Icon
        as={BiChevronRight}
        boxSize={6}
        cursor={"pointer"}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </HStack>
  </TableContainer>


  )
}













