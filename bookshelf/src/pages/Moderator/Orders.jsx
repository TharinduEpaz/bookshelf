import React from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spacer,
  Text,
  StatGroup,
  Select,
} from "@chakra-ui/react";
import {
  BiBookOpen,
} from "react-icons/bi";
import SideMenu from "../../components/Moderator/SIdeMenu";
import StatCard from "../../components/Moderator/StatCard";
import DataTable from "../../components/Moderator/DataTable";
import { Link } from "react-router-dom";
import DateFilter from "../../components/Moderator/DateFilter";
import SearchPanel from "../../components/Moderator/SearchPanel";

export default function Orders() {
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
                      <StatCard lable="All Orders" value="100" />
                      <StatCard
                        lable="Pending"
                        value="20"
                        type="increase"
                        percentage="80"
                      />
                      <StatCard
                        lable="Completed"
                        value="70"
                        type="increase"
                        percentage="80"
                      />
                      <StatCard
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
                <SearchPanel name={"Customer Orders"} filter={"orders"} />

                <Spacer mt={5} />

                <DataTable list={list} columnNames={columns} />
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}
