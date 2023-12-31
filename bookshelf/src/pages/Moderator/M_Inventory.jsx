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
import axios from "axios";

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
  const [results, setResults] = useState([]);

  //get books count
  const [booksCount, setBooksCount] = useState(0);

  const getBookCount = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/books/count");
      setBooksCount(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  //get In Stock books count
  const [inStockCount, setInStockCount] = useState(0);
  const getInStockCount = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/api/v1/books/inStockCount");
      setInStockCount(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error.message);
    }
  }

  const getBooks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/v1/books");
      const jsonData = await response.json();
      setResults(jsonData);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.error(err.message);
    }
  };

  const [searchData, setSerachData] = useState([]);
  const searchValue = (data) => {
    console.log(data);
    const filteredData = results.filter((book) => {
      return (
        book.id.toLowerCase().includes(data.toLowerCase()) ||
        book.title.toLowerCase().includes(data.toLowerCase()) ||
        book.author.toLowerCase().includes(data.toLowerCase())
      );
    });
    // setList(filteredData);
    setSerachData(filteredData);
  }

  //from filter
  const filterValue = (data) => {
    console.log(data);
    const filteredData = results.filter((order) => {
      return (
        order.orderStatus.toLowerCase().includes(data.toLowerCase())
      );
    });
  }

  //set Filtered list
  const setList = (data) => {
    const filterData = data.map((book) => ({
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.ISBN,
      unitPrice: book.price,
      inStock: book.stock,
    }));
    setBookList(filterData);
  }

  useEffect(() => {
    if (searchData.length > 0) {
      setList(searchData);
    } else {
      setList(results);
    }
  }, [searchData, results]);


  useEffect(() => {
    getBooks();
    getBookCount();
    getInStockCount();
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
              <StatGroup gap={70}>
                <StatCard lable="All Books" value={booksCount} />
                <StatCard lable="In Stock" value={inStockCount} color="green" />
                <StatCard lable="Out of Stock" value={booksCount - inStockCount} color="red" />
              </StatGroup>
            </CardBody>
          </Card>
        </Flex>

        <Spacer mt={10} />

        <Box>
          <SearchPanel name="Inventory Items" filter="inventory" setOrderSearchValue={searchValue} setChildValue={filterValue} />

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
