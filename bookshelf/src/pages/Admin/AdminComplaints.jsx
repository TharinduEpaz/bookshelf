import React from 'react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminDtataTable from '../../components/Admin/AdminDtataTable';

import {
  Box,
  Button,
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

export default function AdminComplaints() {

  const columns = [
    "Complain ID",
    "Title",
    "Description",
    "Date",
    "Action"
  ];
  const list = [
    {
      id: "c0001",
      title: "Late delivering",
      description: "Poor communication",
      date: "31.07.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "c0002",
      title: "Order hold",
      description: "Undefined error",
      date: "21.05.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "c0003",
      title: "Not received",
      description: "Although payed order was not sent",
      date: "12.06.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "c0004",
      title: "Late delivering",
      description: "Poor communication",
      date: "31.07.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "c0005",
      title: "Damaged books",
      description: "My order was not packed correctly",
      date: "31.07.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "c0006",
      title: "Payment error",
      description: "Payment cannot be done realtime",
      date: "31.07.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "c0007",
      title: "Late delivering",
      description: "Poor communication",
      date: "31.07.2023",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
  ];


  return (

    <Box
      m={"auto"}
      mt={10}
      w="80%"
      h="100%"
      minH={800}
      borderRadius="6px"
      bg='rgba(255, 255, 255, 0.90)'
      boxShadow="sm"
      bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
      // filter="blur(8px)"
      backdropFilter="blur(14.5px)"
      p={4}

    >

      <AdminSidebar />

      <div>
        <Box
          borderColor={'rgba(0, 0, 0, 0.20)'}
          borderWidth={'0.5px'}
          borderRadius={'10px'}
          h="100%"
          w="76%"
          ml={270}
          mt={1}
          p={5}
        >

          <Flex
            gap={5}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            flexWrap={"wrap"}
          >

          </Flex>

          <Box p={5}>
            <Flex>
              <Text fontSize="lg" fontWeight={"bold"}>
                Complaints
              </Text>
            </Flex>

            <Box>
              {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

              <Spacer mt={5} />

              <AdminDtataTable list={list} columnNames={columns} />
            </Box>
          </Box>

        </Box>
      </div>

    </Box>


  )
}
