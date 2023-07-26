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
    TableContainer
  } from '@chakra-ui/react'

export default function AdminNotificationsTable() {
  return (

    <TableContainer>
    <Table variant='simple'>
      {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
      <Thead >
        <Tr>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={14}>Name</Th>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={14}>Price (Rs)</Th>
          <Th fontFamily={'Montserrat'} fontWeight={1000} fontSize={14}> Orders</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>K.P.Gamage</Td>
          <Td> 3500 </Td>
          <Td> 23</Td>
        </Tr>
        <Tr>
          <Td>D.S.Ashi Perera</Td>
          <Td>4650</Td>
          <Td>34</Td>
        </Tr>
        <Tr>
          <Td>N.G.Fernando</Td>
          <Td>6800</Td>
          <Td>56</Td>
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
