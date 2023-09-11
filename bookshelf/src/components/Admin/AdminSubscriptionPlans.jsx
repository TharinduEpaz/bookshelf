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

export default function AdminSubscriptionPlans({ planList, planColumnNames }) {


  const [itemsPerPage, setItemsPerPage] = useState(3); // Set initial items per page to 2
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = planList.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(planList.length / itemsPerPage);

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
    <Table variant="simple" fontSize="sm">
      <Thead fontWeight="semibold">
        <Tr bgColor="gray.100">
          {planColumnNames.map((headerItem, index) => (
            <Td key={index}>{headerItem}</Td>
          ))}
        </Tr>
      </Thead>

      <Tbody>
        {Object.values(
          currentItems.map((Obj, index) => (
            <Tr key={index}>
              {Object.values(Obj).map((value, index2) => (
                <Td 
                    bg={"#ffffff"}
                    borderRadius={5}
                    m={5}
                    key={index2}
                >
                    {value}
                </Td>
              ))}
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
        <option value="3">3</option>
        <option value="5">5</option>
      </Select>
      
      <Spacer />
      <Icon
        as={BiChevronLeft}
        boxSize={6}
        cursor={"pointer"}
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      />

     
      
      <Icon
        as={BiChevronRight}
        boxSize={6}
        cursor={"pointer"}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      />
    </HStack>
  </TableContainer>
   


  );
}













