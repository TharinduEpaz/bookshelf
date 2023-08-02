import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spacer,
  Text,
  StatGroup,
  InputGroup,
  Input,
  InputRightElement,
  HStack,
  Select,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  BiBookOpen,
  BiErrorCircle,
  BiFilterAlt,
  BiPlus,
  BiSearchAlt,
} from "react-icons/bi";
import SideMenu from "../../components/Moderator/SIdeMenu";
import StatCard from "../../components/Moderator/StatCard";
import DataTable from "../../components/Moderator/DataTable";
import { Link } from "react-router-dom";
import DateFilter from "../../components/Moderator/DateFilter";

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
                <Flex>
                  <Text fontSize="lg" fontWeight={"bold"}>
                    Customer Orders
                  </Text>

                  <Spacer />

                  <Flex gap={2}>
                    <InputGroup w={"100%"}>
                      <Input size={"sm"} placeholder="Search" />
                      <InputRightElement pointerEvents={"none"}>
                        <Icon as={BiSearchAlt} color={"gray.300"} />
                      </InputRightElement>
                    </InputGroup>

                    {/* ****************General Filter************************************ */}
                    <Menu>
                      <MenuButton
                        as={Button}
                        leftIcon={<BiFilterAlt />}
                        color={"gray.500"}
                        borderColor={"gray.300"}
                        variant="outline"
                        pl={5}
                        pr={5}
                        size={"sm"}
                      >
                        Filter
                      </MenuButton>
                      <MenuList p={5} w={"350px"}>
                        <Text fontSize={"lg"} fontWeight={"semibold"} pb={5}>
                          Filter
                        </Text>
                        <Stack>
                          <FormControl>
                            <FormLabel>Order type</FormLabel>
                            <HStack pl={5}>
                              <Checkbox>Home Delevery</Checkbox>
                              <Spacer />
                              <Checkbox>Pickup</Checkbox>
                            </HStack>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Status</FormLabel>
                            <Select pl={5}>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Customer</FormLabel>
                            <Select pl={5}>
                              <option value="option1">Option 1</option>
                              <option value="option2">Option 2</option>
                            </Select>
                          </FormControl>
                          <FormControl>
                            <FormLabel>Amount</FormLabel>
                            <HStack pl={5}>
                              <Stack>
                                <FormLabel>From</FormLabel>
                                <NumberInput>
                                  <NumberInputField placeholder="0.00" />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                              </Stack>
                              <Stack>
                                <FormLabel>To</FormLabel>
                                <NumberInput>
                                  <NumberInputField placeholder="0.00" />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                              </Stack>
                            </HStack>
                          </FormControl>
                          <Button colorScheme="blue" borderRadius={10}>
                            Filter
                          </Button>
                        </Stack>
                      </MenuList>
                    </Menu>

                    <DateFilter />
                    {/* Date Filter */}
                  </Flex>
                </Flex>

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
