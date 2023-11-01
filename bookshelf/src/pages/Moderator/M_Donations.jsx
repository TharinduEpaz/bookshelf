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
    "Org. Telephone",
    "Org. Address",
  ];

  const req_columns = [
    "Org. Registered No.",
    "Org. Name",
    "Org. Type",
    "Org. Email",
    "Contact Person Name",
    "Contact Person Email",
    "Status",
  ];

  const donreq_columns = [
    "ID",
    "Organization",
    "Organization Registered No.",
    // "Requested Items",
    "Approval Status",
  ];

  const don_columns = [
    "Organization",
    "Registered No.",
    "Donor ID",
    "Donor Name",
    "Donation Items",
    "Price",
  ];

  const don_list = [
    {
      "orgName": "MVC",
      "orgRegisteredNumber": "HJ0825-2015",
      "Donor ID": "User_00004",
      "Donor Name": "Sathsara Prabath",
      "Donation Items": "Madol Doowa",
      "Price": "2900",
    },
    {
      "orgName": "MVC",
      "orgRegisteredNumber": "HJ0825-2015",
      "Donor ID": "User_00004",
      "Donor Name": "Sathsara Prabath",
      "Donation Items": "Greenlights",
      "Price": "4100",
    },
  ];

  const [req_list, setReqList] = useState([]);
  const [donreq_list, setDonReqList] = useState([]);
  const [org_list, setOrgList] = useState([]);

  //URLs**************************
  //get donations Request URL
  const getOrgRegRequestsURL = "http://localhost:3000/api/v1/donations";
  const allRequestsURL =
    "http://localhost:3000/api/v1/donations/request/countAll";
  const pendingRequestsURL =
    "http://localhost:3000/api/v1/donations/request/countPending";
  const rejectedRequestsURL =
    "http://localhost:3000/api/v1/donations/request/countRejected";
  const acceptedRequestsURL =
    "http://localhost:3000/api/v1/donations/request/countAccepted";

  const getDonationRequestsURL =
    "http://localhost:3000/api/v1/donationRequests";

  //get donations Request
  const getOrgRegRequests = async () => {
    try {
      const response = await axios.get(getOrgRegRequestsURL);
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
      getRegisteredOrganizations(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get registered organizations
  const getRegisteredOrganizations = (jsonData) => {
    console.log(jsonData);
    try {
      const filteredData = jsonData.filter((org) => {
        return org.approval.includes("Accepted");
      });
      console.log(filteredData);
      const mapData = jsonData.map((request) => ({
        id: request.orgRegisteredNumber,
        name: request.orgName,
        type: request.orgType,
        orgEmail: request.orgEmail,
        cPerson: request.orgTelephone,
        cPersonEmail: request.orgAddress,
      }));
      setOrgList(mapData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get all requests count
  const [allRequestsCount, setAllRequestsCount] = useState(0);
  const getAllRequestsCount = async () => {
    try {
      const response = await axios.get(allRequestsURL);
      setAllRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get pending requests count
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);
  const getPendingRequestsCount = async () => {
    try {
      const response = await axios.get(pendingRequestsURL);
      setPendingRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get rejected requests count
  const [rejectedRequestsCount, setRejectedRequestsCount] = useState(0);
  const getRejectedRequestsCount = async () => {
    try {
      const response = await axios.get(rejectedRequestsURL);
      setRejectedRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get accepted requests count
  const [acceptedRequestsCount, setAcceptedRequestsCount] = useState(0);
  const getAcceptedRequestsCount = async () => {
    try {
      const response = await axios.get(acceptedRequestsURL);
      setAcceptedRequestsCount(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  //get donations Requests
  const getDonationRequests = async () => {
    try {
      const response = await axios.get(getDonationRequestsURL);
      const jsonData = await response.data;

      console.log(jsonData);

      const mapData = jsonData.map((request) => ({
        id: request.id,
        org: request.orgName,
        orgRegisteredNo: request.orgRegisteredNumber,
        // items: request.requestedItems,
        // items: request.requestedItems.map((item) => ({
        //   id: item.id,
        //   name: item.title,
        //   price: item.price,
        //   ISBN: item.ISBN,
        // })),
        status: request.approval,
      }));
      setDonReqList(mapData);
      console.log(mapData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getOrgRegRequests();
    getAllRequestsCount();
    getPendingRequestsCount();
    getRejectedRequestsCount();
    getAcceptedRequestsCount();

    getDonationRequests();
  }, []);

  return (
    <>
      <Box p={10}>
        <Flex>
          <Text fontSize="lg" fontWeight={"bold"}>
            Donations
          </Text>
          <Spacer />
          {/* <Link to="/moderator/addDonationPack">
            <Button colorScheme="blue" size={"sm"} >
              <Icon as={BiPlus} />
              <Text ml={2}>Add a New Donation Pack</Text>
            </Button>
          </Link> */}
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
                <StatCard
                  color="green"
                  lable="Accepted"
                  value={acceptedRequestsCount}
                />
                <StatCard
                  color={"red"}
                  lable="Rejected"
                  value={rejectedRequestsCount}
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
                <StatCard lable="Registered Organization" value={acceptedRequestsCount} />
              </StatGroup>
            </CardBody>
          </Card>
        </Flex>

        <Spacer mt={10} />

        <Box>
          <Tabs>
            <TabList>
              <Tab>Organaization Registration Requests</Tab>
              <Tab>Registered Organizations</Tab>
              <Tab>Donation Requests</Tab>
              <Tab>Received Donations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SearchPanel
                  name="Organaization Registration Requests"
                  filter="organizations"
                />
                <Spacer mt={5} />
                <DataTable
                  list={req_list}
                  columnNames={req_columns}
                  actions={"donReq"}
                />
              </TabPanel>
              <TabPanel>
                <SearchPanel name="Registered Organizations" />
                <Spacer mt={5} />
                <DataTable
                  list={org_list}
                  columnNames={org_columns}
                  actions={"org"}
                />
              </TabPanel>
              <TabPanel>
                <SearchPanel name="Donation Requests" filter="donations" />
                <Spacer mt={5} />
                <DataTable
                  list={donreq_list}
                  columnNames={donreq_columns}
                  actions={"donationReq"}
                />
              </TabPanel>
              <TabPanel>
                <SearchPanel name="Received Donations" filter="donations" />
                <Spacer mt={5} />
                <DataTable
                  list={don_list}
                  columnNames={don_columns}
                  actions={"donations"}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
