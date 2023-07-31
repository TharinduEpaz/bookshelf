import React from 'react'

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
    ButtonGroup
  } from '@chakra-ui/react'

export default function AdminBuyersTable() {
  return (
    
    <TableContainer>
    <Table variant='simple' p={10} mt={50} borderWidth={1} borderColor="gray.200">

      <Thead >
        <Tr>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={13}>Name</Th>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={13}>Title</Th>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={13}> Action</Th>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={13}> Email</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td fontSize={13}> K.P.Gamage</Td>
          <Td fontSize={13}> Developer </Td>
          <Td> <Button colorScheme='red' variant='solid' size={'sm'}>Suspend</Button></Td>
          <Td fontSize={13}> gamage@gmail.com</Td>
        </Tr>
        <Tr>
          <Td fontSize={13}>S.H.Shenaya Fernando</Td>
          <Td fontSize={13}> Fashion Designer </Td>
          <Td> <Button colorScheme='red' variant='solid' size={'sm'}>Suspend</Button></Td>
          <Td fontSize={13}> shenaya@gmail.com</Td>
        </Tr>
        <Tr>
          <Td fontSize={13}>D.K.Ishara Silva</Td>
          <Td fontSize={13}> Marketing Manager </Td>
          <Td> <Button colorScheme='red' variant='solid' size={'sm'}>Suspend</Button></Td>
          <Td fontSize={13}> ishara@gmail.com</Td>
        </Tr>
        <Tr>
          <Td fontSize={13}>S.M.Rash Herath</Td>
          <Td fontSize={13}> Software Engineer </Td>
          <Td> <Button colorScheme='red' variant='solid' size={'sm'}>Suspend</Button></Td>
          <Td fontSize={13}> rash@gmail.com</Td>
        </Tr>
      </Tbody>

{/*
      <Tfoot>
        <Tr>
          <Th>To convert</Th>
          <Th>into</Th>
          <Th isNumeric>multiply by</Th>
        </Tr>
      </Tfoot>
  */}
    </Table>
  </TableContainer>


  )
}
