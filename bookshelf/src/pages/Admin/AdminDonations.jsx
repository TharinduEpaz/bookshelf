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

import AdminSidebar from "../../components/Admin/AdminSidebar";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import AdminDtataTable from "../../components/Admin/AdminDtataTable";
import { useEffect, useState } from "react";

export default function AdminDonations() {

  const columns = [
    "ID",
    "Organization Name",
    "Organization Type",
    "Registration No",
    "Contact Number",
    "Address",
    "Email",
    "Account",
    "Contact Person",
    "Contact Person No",
    "Contact Person Email",
    "Contact Person NIC",
    "Description",
    "Approval"
  ];

  const [list, setDonations] = useState([]);

  const getDonations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/donations")
      const jsonData = await response.json()

      const filteredData = jsonData.map((donations) => ({
        id: donations.id,
        orgName: donations.orgName,
        orgType: donations.orgType,
        orgRegisteredNumber: donations.orgRegisteredNumber,
        orgTelephone: donations.orgTelephone,
        orgAddress: donations.orgAddress,
        orgEmail: donations.orgEmail,
        orgConfirmationDocument: donations.orgConfirmationDocument,
        contactPersonName: donations.contactPersonName,
        contactPersonPhone: donations.contactPersonPhone,
        contactPersonEmail: donations.contactPersonEmail,
        contactPersonNIC: donations.contactPersonNIC,
        description: donations.description,
        approval: donations.approval
      }));
      
      setDonations(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getDonations();
  }, [])


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

 <Box p={10}>
              <Flex>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Donations Summory
                </Text>
                <Spacer />
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
                
                      <Spacer mt={5} />

                      <AdminDtataTable 
                        list={list} 
                        columnNames={columns} 
                        
                        />
                   
              </Box>
            </Box>

 </Box>
 </div>

  </Box>


  )
}
