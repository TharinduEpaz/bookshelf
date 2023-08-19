import React from 'react'
import AdminSidebar from "../components/Admin/AdminSidebar";

import {
    Box, 
    Flex,
    Card,
    CardBody,
    Icon,
    Spacer,
    Text,
    StatGroup,
    Select
} from '@chakra-ui/react'

import {
  BiBookOpen,
} from "react-icons/bi";

//import { Link } from "react-router-dom";
//import DateFilter from "../../components/Moderator/DateFilter";
//import SearchPanel from "../../components/Moderator/SearchPanel";
import AdminStatCard from '../components/Admin/AdminStatCard';
import AdminDtataTable from '../components/Admin/AdminDtataTable';
import { useEffect, useState } from "react";

export default function AdminBookSharing() {


  const columns = [
    "Sharing ID",
    "Date",
    "Customer Id",
    "Book",
    "Status",
  ];

  const list = [
    {
      id: "s0001",
      date: "2023-05-10",
      cid: "c0001",
      book: "Anne",
      status: "Shared"
    },
    {
      id: "s0002",
      date: "2023-03-14",
      cid: "c0005",
      book: "Sherlock Holmes",
      status: "Shared"
    },
    {
      id: "s0003",
      date: "2022-11-10",
      cid: "c0003",
      book: "Marry",
      status: "Shared"
    },
    {
      id: "s0004",
      date: "2023-01-10",
      cid: "c0009",
      book: "Jane ",
      status: "Shared"
    },
    {
      id: "s0005",
      date: "2023-05-10",
      cid: "c0010",
      book: "Hali",
      status: "Shared"
    },
    {
      id: "s0006",
      date: "2023-07-24",
      cid: "c0081",
      book: "Oliver Twist",
      status: "Shared"
    },
  
  ];


  // const [list, setOrderList] = useState([]);

  // const getOrders = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/api/v1/orders")
  //     const jsonData = await response.json()

  //     const filteredData = jsonData.map((order) => ({
  //       id: order.id,
  //       orderDate: new Date(order.orderDate).toLocaleDateString(),
  //       totalPrice: order.totalPrice.toLocaleString(),
  //       orderStatus: order.orderStatus,
  //       buyer_id: order.buyer_id
  //     }));
      
  //     setOrderList(filteredData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // useEffect(() => {
  //   getOrders();
  // }, [])




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
      mb={40}
    >

  <Flex
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"} 
      flexWrap={"wrap"}
    >  

 </Flex>

    
 <Box p={10}>
              <Flex>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Book Sharing
                </Text>
              </Flex>

              <Flex gap={20}>
                <Card
                  mt={5}
                  p={5}
                  pl={10}
                  pr={10}
                  boxShadow="sm"
                  borderRadius="md"
                  bgColor={"#EDF2F7"}
                  w={"fit-content"}
                >
                  <CardBody>
                    <Flex
                      justifyContent={"space-between"}
                    >
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                      <Select width={"100px"}>
                        <option value="option1">All</option>
                        <option value="option2">This week</option>
                        <option value="option2">This Month</option>
                      </Select>
                    </Flex>
                    <StatGroup gap={100}>
                      <AdminStatCard lable="All Sharing Requests" value="100" />
                      <AdminStatCard
                        lable="Pending"
                        value="20"
                        type="increase"
                        percentage="80"
                      />
                      <AdminStatCard
                        lable="Accepted"
                        value="70"
                        type="increase"
                        percentage="80"
                      />
                      <AdminStatCard
                        color={"red"}
                        lable="Canceled"
                        value="0"
                        type="increase"
                        percentage="80"
                      />
                    </StatGroup>
                  </CardBody>
                </Card>
              </Flex>

              <Spacer mt={10} />

              <Box>
                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <Text fontSize="lg" fontWeight={"bold"} mb={2}>
                  Book Sharing Details
                </Text>
                <AdminDtataTable list={list} columnNames={columns} />



              </Box>
            </Box>


 </Box>
 </div>

  </Box>


  )
}

