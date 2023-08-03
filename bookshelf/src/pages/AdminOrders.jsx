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
    Select,
} from '@chakra-ui/react'

import {
  BiBookOpen,
} from "react-icons/bi";

//import { Link } from "react-router-dom";
//import DateFilter from "../../components/Moderator/DateFilter";
//import SearchPanel from "../../components/Moderator/SearchPanel";
import AdminStatCard from '../components/Admin/AdminStatCard';
import AdminOrdersDT from '../components/Admin/AdminOrdersDT';

export default function AdminOrders() {

  const columns = [
    "Customer ID",
    "Customer Name",
    "Order date",
    "Order type",
    "Tracking ID",
    "Total price",
    "Status",
  ];
  const list = [
    {
      id: "c0001",
      name: "Lorem ipsum",
      date: "31.07.2023",
      type: "Home delivery",
      tracking_id: "10",
      price: "Rs.2990.00",
      status: "In-Progess",
    },
    {
      id: "c0002",
      name: "Lorem ipsum",
      date: "31.07.2023",
      type: "Home delivery",
      tracking_id: "10",
      price: "Rs.2990.00",
      status: "In-Progess",
    },
    {
      id: "c0003",
      name: "Lorem ipsum",
      date: "31.07.2023",
      type: "Home delivery",
      tracking_id: "10",
      price: "Rs.2990.00",
      status: "In-Progess",
    },
    {
      id: "c0004",
      name: "Lorem ipsum",
      date: "31.07.2023",
      type: "Home delivery",
      tracking_id: "10",
      price: "Rs.2990.00",
      status: "In-Progess",
    },
    {
      id: "c0005",
      name: "Lorem ipsum",
      date: "31.07.2023",
      type: "Home delivery",
      tracking_id: "10",
      price: "Rs.2990.00",
      status: "In-Progess",
    },
  ];


  return (
   
    <Box
    m={"auto"}
    mt={10}
    w="80%"
    h="100vh"
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

    
 <Box p={10}>
              <Flex>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Order Summory
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
                      <AdminStatCard lable="All Orders" value="100" />
                      <AdminStatCard
                        lable="Pending"
                        value="20"
                        type="increase"
                        percentage="80"
                      />
                      <AdminStatCard
                        lable="Completed"
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

                <AdminOrdersDT list={list} columnNames={columns} />
              </Box>
            </Box>


 </Box>
 </div>

  </Box>


  )
}
