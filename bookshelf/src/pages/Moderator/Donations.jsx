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
import React from "react";
import SideMenu from "../../components/Moderator/SIdeMenu";
import StatCard from "../../components/Moderator/StatCard";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import DataTable from "../../components/Moderator/DataTable";
import SearchPanel from "../../components/Moderator/SearchPanel";

export default function Donations() {
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
    <>
      <Box
        height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgColor={"white"}
        // bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={2} h={"100%"}>
          <GridItem
            colSpan={1}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <SideMenu />
          </GridItem>
          <GridItem
            colSpan={4}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <Box p={10}>
              <Flex>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Inventry Summory
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
                      <StatCard lable="Organizations" value="100" />
                      <StatCard lable="Pending Requests" value="10" />
                      <StatCard
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
                      <StatCard lable="Donations" value="100" />
                      <StatCard lable="Amount" value="100" />
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
                      <SearchPanel name="Organizations" filter="organizations"/>
                      <Spacer mt={5} />
                      <DataTable list={org_list} columnNames={org_columns} />
                    </TabPanel>
                    <TabPanel>
                    <SearchPanel name="Donations" filter="donations"/>
                      <Spacer mt={5} />
                      <DataTable list={don_list} columnNames={don_columns} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
