import React from "react";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Icon,
  Spacer,
  Text,
  StatGroup,
  Spinner,
} from "@chakra-ui/react";
import { BiBookOpen, BiErrorCircle } from "react-icons/bi";
import { IoAddCircle } from "react-icons/io5";
import StatCard from "../../components/Moderator/StatCard";
import DataTable from "../../components/Moderator/DataTable";
import { Link } from "react-router-dom";
import SearchPanel from "../../components/Moderator/SearchPanel";
import { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Inventry() {
  const columns = [
    "Book ID",
    "Book Name",
    "Author",
    "ISBN",
    "Unit Price",
    "In-Stock",
  ];

  const [list, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const componentRef = useRef();

  const getBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/books");
      const jsonData = await response.json();

      const filteredData = jsonData.map((book) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        genre: book.ISBN,
        unitPrice: book.price,
        inStock: book.stock,
      }));

      setBookList(filteredData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err.message);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentRef.current,
  });

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
            Inventry Summory
          </Text>
          <Spacer />
          <Link to="/moderator/addNewBook">
            <Button colorScheme="blue" size={"sm"}>
              <Icon as={IoAddCircle} />
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
                <StatCard lable="All Books" value="500" />
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
          <Button onClick={generatePDF}>Generate PDF</Button>
          <SearchPanel name="Inventory Items" filter="inventory" />

          <Spacer mt={5} />
          <Box ref={componentRef}>
            <DataTable
              list={list}
              columnNames={columns}
              actions={"inventory"}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
