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

import AdminSidebar from "../../components/Admin/AdminSidebar";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import AdminDtataTable from "../../components/Admin/AdminDtataTable";


export default function AdminDonationReport() {

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
      name: "Apeksha Hosital",
      Date: "01.02.2023",
      email: "apeksha@gmail.com",
      contact_number: "0112245321",
      status: "Registered",
      action: "Registered",
    },
    {
      id: "n0002",
      name: "Nanasa",
      Date: "11.03.2023",
      email: "nanasa@gmail.com",
      contact_number: "0112775321",
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
      id: "d0001",
      name: "Mahir Singh",
      Date: "01.02.2023",
      units: "10",
      org: "Diwasa Center",
      action: "Action",
    },
    {
      id: "d0002",
      name: "Gagani Hirusha",
      Date: "21.02.2023",
      units: "23",
      org: "Dikhena Central College",
      action: "Action",
    },
    {
      id: "d0003",
      name: "Miyu Sithara",
      Date: "01.06.2023",
      units: "34",
      org: "Arana ",
      action: "Action",
    },
    {
      id: "d0004",
      name: "Kimuth",
      Date: "01.04.2023",
      units: "67",
      org: "Apeksha Hospital",
      action: "Action",
    },
    {
      id: "d0005",
      name: "Sahan Ranwala",
      Date: "01.02.2023",
      units: "56",
      org: "Diyatha ",
      action: "Action",
    },
    {
      id: "d0006",
      name: "Shanu Silva",
      Date: "01.05.2023",
      units: "70",
      org: "Museum",
      action: "Action",
    },
  ];

  return (
    
    <Box
    m={"auto"}
    mt={10}
    w="100%"
    h="100%"
    minH={800}
    borderColor={'rgba(0, 0, 0, 0.20)'}
    borderWidth={'0.5px'}
    borderRadius="6px"
    bg='rgba(255, 255, 255, 0.90)'
    boxShadow="sm"
    bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
    // filter="blur(8px)"
    backdropFilter="blur(14.5px)"
    p={8}
    alignItems={"Center"}
    justifyContent={"Center"}
>



  <div>
  <Box
      borderColor={'rgba(0, 0, 0, 0.20)'}
      borderWidth={'0.5px'}
      borderRadius={'10px'}
      h="100%"
      w="95%"
      ml={35}
      mt={1}
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

          <Text fontSize="lg" fontWeight={"bold"} mb={10} mt={2} align={"center"}>
              Donation Reports
            </Text>

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

          
          <Flex gap={3} alignItems={'center'}>

          <Text width={200} mt={5} ml={10}>Select By</Text>

          <Select 
            placeholder='All' 
            w={'200px'} 
            size={'sm'} 
            borderRadius={5} 
            borderColor={'gray.200'} 
            focusBorderColor={'white.100'}
            pl={2}
            ml={2}
            mt={5}
            //onChange={(e) => setSelectedRole(e.target.value)} 
            //value={selectedRole}
           >
              <option value='buyer'>Name</option>
              <option value='moderator'>Registered Date</option>
              <option value='moderator'>Status</option>
        
          </Select>

          <Button 
        ml={450}
        mt={5}
        colorScheme="blue" 
        //onClick={generateTablePDF}
        >
          Generate Donation Organization Details
      </Button>

          </Flex>
                      <Spacer mt={5} />

                      <AdminDtataTable list={org_list} columnNames={org_columns} />
                    </TabPanel>

                    <TabPanel>

                    {/* <SearchPanel name="Donations" filter="donations"/> */}

                    <Flex gap={3} alignItems={'center'}>

          <Text width={200} mt={5} ml={10}>Select By</Text>

          <Select 
            placeholder='All' 
            w={'200px'} 
            size={'sm'} 
            borderRadius={5} 
            borderColor={'gray.200'} 
            focusBorderColor={'white.100'}
            pl={2}
            ml={2}
            mt={5}
            //onChange={(e) => setSelectedRole(e.target.value)} 
            //value={selectedRole}
           >
              <option value='buyer'>Donor</option>
              <option value='moderator'>Donated Date</option>
              <option value='moderator'>Organization</option>
              <option value='moderator'>Units</option>
              <option value='moderator'>Action</option>

          </Select>

          <Button 
        ml={600}
        mt={5}
        colorScheme="blue" 
        //onClick={generateTablePDF}
        >
          Generate Donation Details
      </Button>

          </Flex>

                      <Spacer mt={5} />
                      <AdminDtataTable list={don_list} columnNames={don_columns} />

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
