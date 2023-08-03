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
} from "@chakra-ui/react";

import AdminSidebar from "../components/Admin/AdminSidebar";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import AdminDonationsDT from "../components/Admin/AdminDonationsDT";
import AdminStatCard from "../components/Admin/AdminStatCard";


export default function AdminDonations() {

  const org_columns = [
    "ID",
    "Name",
    "Registered Date",
    "email",
    "Contact Number",
    "Status",
    "Action",
  ];
  const org_list = [
    {
      id: "n0001",
      name: "Lorem ipsum",
      Date: "01.02.2023",
      email: "aaa@gmail.com",
      contact_number: "0111111111",
      status: "Registered",
      action: "Registered",
    },
    {
      id: "n0001",
      name: "Lorem ipsum",
      Date: "01.02.2023",
      email: "aaa@gmail.com",
      contact_number: "0111111111",
      status: "Registered",
      action: "Registered",
    },
  ];

  const don_columns = [
    "ID",
    "Donor",
    "Donated Date",
    "No. of Units",
    "Organization",
    "Action"
  ];
  const don_list = [
    {
      id: "n0001",
      name: "Lorem ipsum",
      Date: "01.02.2023",
      units: "10",
      org: "lorem ipsum",
      action: "Action",
    },
    {
      id: "n0001",
      name: "Lorem ipsum",
      Date: "01.02.2023",
      units: "10",
      org: "lorem ipsum",
      action: "Action",
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
                  Donations Summory
                </Text>
                <Spacer />
                <Link to="/moderator/addNewBook">
                  <Button colorScheme="blue" size={"sm"}>
                    <Icon as={BiPlus} />
                    <Text ml={2}>Add a New Donation Pack</Text>
                  </Button>
                </Link>
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
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                    <StatGroup gap={50}>
                      <AdminStatCard lable="Organizations" value="100" />
                      <AdminStatCard lable="Pending Requests" value="10" />
                      <AdminStatCard
                        color={"red"}
                        lable="Rejected Requests"
                        value="0"
                      />
                    </StatGroup>
                  </CardBody>
                </Card>
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
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                    <StatGroup gap={50}>
                      <AdminStatCard lable="Donations" value="100" />
                      <AdminStatCard lable="Amount" value="100" />
                    </StatGroup>
                  </CardBody>
                </Card>
              </Flex>

              <Spacer mt={10} />

              <Box>
                <Tabs>
                  <TabList>
                    <Tab>Oraganizations</Tab>
                    <Tab>Donations</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>

                      {/* <SearchPanel name="Organizations" filter="organizations"/> */}

                      <Spacer mt={5} />

                      <AdminDonationsDT list={org_list} columnNames={org_columns} />
                    </TabPanel>
                    <TabPanel>

                    {/* <SearchPanel name="Donations" filter="donations"/> */}

                      <Spacer mt={5} />
                      <AdminDonationsDT list={don_list} columnNames={don_columns} />

                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>

 </Box>
 </div>

  </Box>


  )
}
