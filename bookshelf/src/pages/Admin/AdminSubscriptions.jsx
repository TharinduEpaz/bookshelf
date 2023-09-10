import React, { useRef } from "react";
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
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { BiBookOpen } from "react-icons/bi";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import AdminDtataTable from "../../components/Admin/AdminDtataTable";
import AdminSubscriptionPlans from "../../components/Admin/AdminSubscriptionPlans";

export default function AdminSubscriptions() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Subscription plans
  const planColumnNames = [
    "Subscription",
    " Plans ",
    "Book Count",
    "Time Period",
    "Discount",
  ];

  const [planList, setPlanList] = useState([]);
  const initialRef = useRef();


  //Get subscription plans
  const getPlans = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/subscriptions");
      const jsonData = await response.json();

      const filteredData = jsonData.map((plan) => ({
        firstName: plan.firstName,
        LastName: plan.LastName,
        book_count: plan.book_count,
        time_period: plan.time_period,
        discount: plan.discount,
      }));

      setPlanList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);








  // Subscriptions
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
      actions: "In-Progress",
    },
    {
      id: "c0002",
      plan: "Book Lover",
      book: "Village By The Sea",
      tracking_id: "15",
      actions: "In-Progress",
    },
    {
      id: "c0003",
      plan: "Book Worm",
      book: "Mary",
      tracking_id: "30",
      actions: "In-Progress",
    },
    {
      id: "c0004",
      plan: "Book Lover",
      book: "Anne",
      tracking_id: "20",
      actions: "In-Progress",
    },
    {
      id: "c0005",
      plan: "Book Lover",
      book: "Sheli",
      tracking_id: "17",
      actions: "In-Progress",
    },
  ];

  return (
    <Box
      m={"auto"}
      mt={10}
      w="80%"
      h="100%"
      minH={800}
      borderRadius="6px"
      bg="rgba(255, 255, 255, 0.90)"
      boxShadow="sm"
      bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
      backdropFilter="blur(14.5px)"
      p={4}
    >
      <AdminSidebar />

      <div>
        <Box
          borderColor={"rgba(0, 0, 0, 0.20)"}
          borderWidth={"0.5px"}
          borderRadius={"10px"}
          h="100%"
          w="76%"
          ml={270}
          mt={1}
          p={5}
          mb={40}
        >
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
                      <option value="option3">This Month</option>
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
            </Flex>

            {/* Table1: Subscription Plans Details Table */}
            <Text fontSize="lg" fontWeight={"bold"} mb={2} mt={10}>
              Subscription Plans Details
            </Text>

            <Button onClick={onOpen} ml={380} mt={2} mb={5} colorScheme="blue">
              + Add New Subscription Plan
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add New Subscription Plan Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                  <FormControl>
                    <FormLabel>Plan First name</FormLabel>
                    <Input ref={initialRef} placeholder="First name" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Plan Last name</FormLabel>
                    <Input placeholder="Last name" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Book Count</FormLabel>
                    <Input placeholder="Book Count" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Time Period</FormLabel>
                    <Input placeholder="Time Period" />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Discount</FormLabel>
                    <Input placeholder="Discount" />
                  </FormControl>

                </ModalBody>

                <ModalFooter>
                  <Button colorScheme="blue" mr={3}>
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>




                        <Box
              mt={0}
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

            <Spacer mt={10} />

            {/* Table2: Subscription Details Table */}
            <Text fontSize="lg" fontWeight={"bold"} mb={2} mt={10}>
              Subscription Details
            </Text>

            <Box>
              {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}
              <Spacer mt={5} />
              <AdminDtataTable list={list} columnNames={columns} />
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
