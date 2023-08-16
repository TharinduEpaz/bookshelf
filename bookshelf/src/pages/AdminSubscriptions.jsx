import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Icon,
  StatGroup,
  Text,
  Spacer,
  Link,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Select
} from "@chakra-ui/react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import AdminStatCard from "../components/Admin/AdminStatCard";
import AdminDtataTable from "../components/Admin/AdminDtataTable";
import AdminSubscriptionPlans from "../components/Admin/AdminSubscriptionPlans";


export default function AdminSubscriptions() {




  

  //Subscription plans
  const planColumnNames = [
    "Subscription Plans"  
  ];
  const planList = [
    {
      plan: "Book Reader"
    },
    {
      plan: "Book Lover"
    },
    {
      plan: "Book Worm"
    },
  
  ];


  
  //Subscriptions
  const columns = [
    "Customer Id",
    "Subscription plan",
    "Book",
    "Tracking ID",
    "Actions",
  ];
  const list = [
    {
      id: "c0001",
      plan: "Book Reader",
      book: "Anne",
      tracking_id: "10",
      actions: "In-Progess",
    },
    {
      id: "c0002",
      plan: "Book Lover",
      book: "Village By The Sea",
      tracking_id: "15",
      actions: "In-Progess",
    },
    {
      id: "c0003",
      plan: "Book Worm",
      book: "Mary",
      tracking_id: "30",
      actions: "In-Progess",
    },
    {
      id: "c0004",
      plan: "Book Lover",
      book: "Anne",
      tracking_id: "20",
      actions: "In-Progess",
    },
    {
      id: "c0005",
      plan: "Book Lover",
      book: "Sheli",
      tracking_id: "17",
      actions: "In-Progess",
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
                  Subscriptions Summary
                </Text>
                <Spacer />
              
              </Flex>

              <Flex gap={5}>
                <Card
                  mt={10}
                  p={2}
                  pl={5}
                  pr={5}
                  boxShadow="sm"
                  borderRadius="md"
                  bgColor={"#EDF2F7"}
                  w={"fit-content"}
                >
                  <CardBody>
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                    <StatGroup gap={50}>
                      <AdminStatCard 
                        lable="All Subscriptions" 
                        value="200" 
                        type="increase"
                        percentage="23.36"
                      />
                    </StatGroup>
                  </CardBody>
                </Card>

                <Card
                  mt={10}
                  p={2}
                  pl={2}
                  pr={2}
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
                      <Select width={"100px"} ml={10}>
                        <option value="option1">All</option>
                        <option value="option2">This week</option>
                        <option value="option2">This Month</option>
                      </Select>
                    </Flex>
                    <StatGroup gap={50}>
                      <AdminStatCard 
                        lable="New Subscriptions" 
                        value="40" 
                        type="increase"
                        percentage="23.36"
                      />
                    </StatGroup>
                  </CardBody>
                </Card>

                <Box
                  mt={10}
                  p={2}
                  pl={5}
                  pr={5}
                  boxShadow="sm"
                  borderRadius="md"
                  bgColor={"#EDF2F7"}
                  w={"fit-content"}
                >

                    <AdminSubscriptionPlans planList={planList} planColumnNames={planColumnNames}/>

                </Box>


              

              </Flex>

              <Spacer mt={10} />

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
