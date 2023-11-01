import React, { useState } from "react";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Checkbox,
  Button
} from "@chakra-ui/react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


export default function AdminComplaintsTable({
  list,
  columnNames,
  search,
  //solve
}) {

    const filteredList = list.filter((item) => {
        return search && item.name && search.toLowerCase() === '' || item.name.toLowerCase().includes(search);
      });
  


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
      {filteredList.map((item) => {
            return (
              <Tr key={item.id}>
                <Td>
                  <Checkbox />
                </Td>
                {Object.values(item).map((value, index2) => (
                  <Td key={index2}>{value}</Td>
                ))}

                <Td>
                    <Button 
                        colorScheme="blue" 
                        size="sm" 
                        // onClick={() => solve(Obj.id)}
                    >
                        Solve
                    </Button>
                </Td>
              </Tr>
            );
          })}
      </Tbody>
     
    </Table>

   
  </TableContainer>


  )
}













