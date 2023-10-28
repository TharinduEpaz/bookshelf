import {
  Box,
  Card,
  CardBody,
  Flex,
  Icon,
  StatGroup,
  Text,
  Spacer,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React from "react";
import StatCard from "../../components/Moderator/StatCard";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import DataTable from "../../components/Moderator/DataTable";
import SearchPanel from "../../components/Moderator/SearchPanel";
import { Link } from "react-router-dom";

export default function Donations() {
  const org_columns = [
    "ID",
    "Name",
    "Registered Date",
    "email",
    "Contact Number",
  ];
  const org_list = [
    {
      id: "n00001",
      name: "ke/kehelwaththa M.V",
      Date: "01.08.2023",
      email: "kehelwaththamv@gmail.com",
      contact_number: "0355689562",
    },
    {
      id: "n00002",
      name: "St. Joseph's College",
      Date: "01.08.2023",
      email: "josephscollege@gmail.com",
      contact_number: "0111111111",
    },
  ];

  const don_columns = [
    "ID",
    "Donor",
    "Donated Date",
    "No. of Units",
    "Organization",
  ];
  const don_list = [
    {
      id: "d0001",
      name: "Heshan Amarasinghe",
      Date: "01.02.2023",
      units: "10",
      org: "kehelwaththamv@gmail.com",
    },
    {
      id: "d0002",
      name: "Pasindu Handagama",
      Date: "01.02.2023",
      units: "10",
      org: "josephscollege@gmail.com",
    },
  ];

  return (
    <>
      <Box p={10}>
        <Flex>
          <Text fontSize="lg" fontWeight={"bold"}>
            Donations
          </Text>
          <Spacer />
          <Link to="/moderator/addDonationPack">
            <Button colorScheme="blue" size={"sm"} >
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
                <StatCard color={"red"} lable="Rejected Requests" value="0" />
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
                <SearchPanel name="Organizations" filter="organizations" />
                <Spacer mt={5} />
                <DataTable list={org_list} columnNames={org_columns} />
              </TabPanel>
              <TabPanel>
                <SearchPanel name="Donations" filter="donations" />
                <Spacer mt={5} />
                <DataTable list={don_list} columnNames={don_columns} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
