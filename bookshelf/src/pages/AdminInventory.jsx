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

import AdminSidebar from "../components/Admin/AdminSidebar";
import AdminStatCard from "../components/Admin/AdminStatCard";
import { Link } from "react-router-dom";
import AdminDtataTable from "../components/Admin/AdminDtataTable";
import { useEffect, useState } from "react";

//import SearchPanel from "../../components/Moderator/SearchPanel";



export default function AdminInventory() {

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
        inStock: book.stock,
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
    
    <Box
    m={"auto"}
    mt={10}
    w="80%"
    h="100%"
    minH={800}
    borderRadius="6px"
    bg='rgba(255, 255, 255, 0.90)'
    boxShadow="sm"
    bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
    // filter="blur(8px)"
    backdropFilter="blur(14.5px)"
    p={4}

  >


  <AdminSidebar />

  <div>
  <Box
      borderColor={'rgba(0, 0, 0, 0.20)'}
      borderWidth={'0.5px'}
      borderRadius={'10px'}
      h="100%"
      w="76%"
      ml={270}
      mt={1}
      mb={40}
    >

  <Flex
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"} 
      flexWrap={"wrap"}
    >  

 </Flex>

          <Box p={10}>
              <Flex>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Inventory Summary
                </Text>
                <Spacer />
                <Link to="adminaddnewbook">
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
                      <AdminStatCard
                        lable="All Books"
                        value="500"
                      />
                      <AdminStatCard
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
                    <AdminStatCard
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
                {/* <SearchPanel name="Inventory Items" filter="inventory" /> */}

                <Spacer mt={5} />

                <AdminDtataTable list={list} columnNames={columns} />
              </Box>
            </Box>

 </Box>


 </div>

  </Box>


  );
}
