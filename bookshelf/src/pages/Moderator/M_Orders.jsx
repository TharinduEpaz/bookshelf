import { React, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Icon,
  Spacer,
  Text,
  StatGroup,
  Select,
  Spinner,
  filter,
} from "@chakra-ui/react";
import { BiBookOpen } from "react-icons/bi";
import StatCard from "../../components/Moderator/StatCard";
import DataTable from "../../components/Moderator/DataTable";
import SearchPanel from "../../components/Moderator/SearchPanel";

export default function Orders() {
  const columns = [
    "Order ID",
    "Order date",
    "Buyer ID",
    "Total price",
    "Is paid",
    "Status",
  ];

  const [list, setOrderList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/orders");
      const jsonData = await response.json();
      setResults(jsonData);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  //search bar data
  const [searchData, setSerachData] = useState([]);
  const searchValue = (data) => {
    const filteredData = results.filter((order) => {
      return (
        order.id.toLowerCase().includes(data.toLowerCase())
      );
    });
    setSerachData(filteredData);
  }

  //filter data
  
  const filterValue = (data) => {
    const filteredData = results.filter((order) => {
      return (
        order.orderStatus.toLowerCase().includes(data.toLowerCase())
      );
    });
  }

  //set Filtered list
  const setList = (data) => {
    const filterData = data.map((order) => ({
      id: order.id,
      orderDate: new Date(order.orderDate).toLocaleDateString(),
      buyerId: order.user_id,
      // items: order.orderItems,
      totalPrice: order.totalPrice,
      isPaid: order.isPaid ? "Yes" : "No",
      status: order.orderStatus,
    }));
    setOrderList(filterData);
  }

  useEffect(() => {
    if (searchData.length > 0) {
      setList(searchData);
    } else {
      setList(results);
    }
  }, [searchData, results]);
  

  //get orders count
  const [count, setCount] = useState(0);
  const getCount = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/orders/count");
      const jsonData = await response.json();
      setCount(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // get pending orders count
  const [pendingCount, setPendingCount] = useState(0);
  const getPendingCount = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/orders/countPending");
      const jsonData = await response.json();
      setPendingCount(jsonData);
      console.log(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  }


  useEffect(() => {
    getOrders();
    getCount();
    getPendingCount();
  }, []);

  if (isLoading) {
    return (
      <>
        <Box mb={"100vh"}>
          <Spinner
            position={"absolute"}
            top={"30%"}
            left={"50%"}
            size={"xl"}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
          />
        </Box>
      </>
    );
  }

  return (
    <>
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
              <Flex justifyContent={"space-between"}>
                <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                <Select width={"100px"}>
                  <option value="option1">All</option>
                  <option value="option2">This week</option>
                  <option value="option2">This Month</option>
                </Select>
              </Flex>
              <StatGroup gap={100}>
                <StatCard lable="All Orders" value={count} />
                <StatCard
                  lable="Pending"
                  value={pendingCount}
                  // type="increase"
                  // percentage="80"
                />
                <StatCard
                  lable="Shipped"
                  value={count - pendingCount}
                  // type="increase"
                  // percentage="80"
                />
              </StatGroup>
            </CardBody>
          </Card>
        </Flex>

        <Spacer mt={10} />

        <Box>
          <SearchPanel name={"Customer Orders"} filter={"orders"} setOrderSearchValue={searchValue}  setChildValue={filterValue}/>

          <Spacer mt={5} />

          <DataTable list={list} columnNames={columns} actions={"order"}/>
        </Box>
      </Box>
    </>
  );
}
