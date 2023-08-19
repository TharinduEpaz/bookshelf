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
import SearchPanel from "../../components/Moderator/SearchPanel";
import { useEffect, useState } from "react";

export default function Inventry() {
  const columns = [
    "Book ID",
    "Book Name",
    "Author",
    "Genre",
    "Unit Price",
    "In-Stock",
  ];


  const [list, setBookList] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/books")
      const jsonData = await response.json()

      const filteredData = jsonData.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        unitPrice: book.price,
        inStock: book.inventory,
      }));
      
      setBookList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getBooks();
  }, [])

  return (
    <>
      <Box
        height="100%"
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
                    <Text ml={2}>Add a New Book</Text>
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
                    <StatGroup gap={200}>
                      <StatCard
                        lable="All Books"
                        value="500"
                      />
                      <StatCard
                        lable="Active"
                        value="480"
                        type="increase"
                        percentage="80"
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
                    <Icon as={BiErrorCircle} boxSize={8} color={"#E53E3E"} />
                    <StatCard
                      lable="Low Stock Alert"
                      value="10"
                      type="decrease"
                      percentage="5.05"
                    />
                  </CardBody>
                </Card>
              </Flex>

              <Spacer mt={10} />

              <Box>
                <SearchPanel name="Inventory Items" filter="inventory" />

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
