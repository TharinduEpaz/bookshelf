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
  Select,
} from "@chakra-ui/react";
import { BiBookOpen, BiPlus } from "react-icons/bi";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import AdminDtataTable from "../../components/Admin/AdminDtataTable";
import AdminSubscriptionPlans from "../../components/Admin/AdminSubscriptionPlans";

export default function Subscriptions() {
  //Subscription plans
  const planColumnNames = ["Subscription Plans"];
  const planList = [
    {
      plan: "Book Reader",
    },
    {
      plan: "Book Lover",
    },
    {
      plan: "Book Worm",
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
    <div>
      <Box>
        <Flex
          gap={5}
          alignItems={"center"}
          justifyContent={"center"}
          w={"100%"}
          flexWrap={"wrap"}
        ></Flex>

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
                <Flex justifyContent={"space-between"}>
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
              <AdminSubscriptionPlans
                planList={planList}
                planColumnNames={planColumnNames}
              />
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
  );
}
