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
  Heading,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import StatCard from "../../components/Moderator/StatCard";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import DataTable from "../../components/Moderator/DataTable";
import SearchPanel from "../../components/Moderator/SearchPanel";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Donations() {
  const org_columns = [
    "Org. Registered No.",
    "Org. Name",
    "Org. Type",
    "Org. Email",
    "Contact Person Name",
    "Contact Person Email",
    "Status"
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

  const [req_list, setReqList] = useState([]);

  //URLs**************************
  //get donations Request URL
  const getDonationRequestsURL = "http://localhost:3000/api/v1/donations";
  const allRequestsURL = "http://localhost:3000/api/v1/donations/request/countAll";
  const pendingRequestsURL = "http://localhost:3000/api/v1/donations/request/countPending";
  const rejectedRequestsURL = "http://localhost:3000/api/v1/donations/request/countRejected";
  const acceptedRequestsURL = "http://localhost:3000/api/v1/donations/request/countAccepted";

  //get donations Request
  const getDonationRequests = async () => {
    try {
      const response = await axios.get(getDonationRequestsURL);
      const jsonData = await response.data;

      const mapData = jsonData.map((request) => ({
        id: request.orgRegisteredNumber,
        name: request.orgName,
        type: request.orgType,
        orgEmail: request.orgEmail,
        cPerson: request.contactPersonName,
        cPersonEmail: request.contactPersonEmail,
        status: request.approval,
      }));
      setReqList(mapData);
      console.log(mapData);

    } catch (error) {
      console.error(error.message);
    }
  }

  //get all requests count
  const [allRequestsCount, setAllRequestsCount] = useState(0);
  const getAllRequestsCount = async () => {
    try {
      const response = await axios.get(allRequestsURL);
      setAllRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  //get pending requests count
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const getPendingRequestsCount = async () => {
    try {
      const response = await axios.get(pendingRequestsURL);
      setPendingRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  //get rejected requests count
  const [rejectedRequestsCount, setRejectedRequestsCount] = useState(0);
  const getRejectedRequestsCount = async () => {
    try {
      const response = await axios.get(rejectedRequestsURL);
      setRejectedRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  //get accepted requests count
  const [acceptedRequestsCount, setAcceptedRequestsCount] = useState(0);
  const getAcceptedRequestsCount = async () => {
    try {
      const response = await axios.get(acceptedRequestsURL);
      setAcceptedRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  }


  useEffect(() => {
    getDonationRequests();
    getAllRequestsCount();
    getPendingRequestsCount();
    getRejectedRequestsCount();
    getAcceptedRequestsCount();
  }, []);

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
              <HStack mb={3}>
              <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
              <Heading size="md">Registration Requests</Heading>
              </HStack>
              <StatGroup gap={50}>
                <StatCard lable="All" value={allRequestsCount} />
                <StatCard lable="Pending" value={pendingRequestsCount} />
                <StatCard color='green' lable="Accepted" value={acceptedRequestsCount} />
                <StatCard color={"red"} lable="Rejected" value={rejectedRequestsCount} />
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
              <Tab>Organaization Registration Requests</Tab>
              <Tab>Donations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchPanel name="Organaization Registration Requests" filter="organizations" />
                <Spacer mt={5} />
                <DataTable list={req_list} columnNames={org_columns} actions={"donReq"}/>
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
