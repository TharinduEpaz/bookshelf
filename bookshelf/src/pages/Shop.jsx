import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Skeleton,
  Spinner,
  Text,
  Button,
} from "@chakra-ui/react";
import Search from "../components/Shop/Search";
import Filter from "../components/Shop/Filter";
import CategoryFilter from "../components/Shop/CategoryFilter";
import BookCard from "../components/Shop/BookCard";
import { Link } from "react-router-dom";
import axios from "axios";
import { useBooksContext } from "../context/booksContext";

function Shop() {
  // const [bookDetails, setBookDetails] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const {
    books,
    isLoading,
    fetchBooksCount,
    fetchBooks,
    setPrice,
    setRating,
    setStock,
    setSort,
  } = useBooksContext();

  const [noOfPages, setNoOfPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  //filters

  console.log(currentPage);

  const loadCount = async () => {
    const count = await fetchBooksCount();
    setNoOfPages(Math.ceil(count / 12));
  };

  useEffect(() => {
    loadCount();
  }, [books]);

  return (
    <>
      <Box
        height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid
          templateRows="50px 50px repeat(8, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={2}
          h={"100%"}
        >
          <GridItem rowSpan={1} colSpan={5}>
            <Search />
          </GridItem>
          <GridItem rowSpan={1} colSpan={5} p={2}>
            <Filter
              setPrice={setPrice}
              setRating={setRating}
              setStock={setStock}
              setSort={setSort}
            />
          </GridItem>
          <GridItem
            rowSpan={8}
            colSpan={1}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <CategoryFilter />
          </GridItem>
          <GridItem
            rowSpan={8}
            colSpan={4}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <Flex flexWrap={"wrap"} gap={5} p={5} justify={"flex-start"}>
              {isLoading &&
                Array.from({ length: 12 }).map((_, index) => (
                  <Skeleton key={index} borderRadius={10} speed={1.5}>
                    <BookCard />
                  </Skeleton>
                ))}

              {Object.keys(books).map((item) => (
                <Link to={`/shop/${books[item].id}`} key={books[item].id}>
                  <BookCard
                    name={books[item].title}
                    author={books[item].author}
                    price={books[item].price}
                    imageURL={books[item].image}
                    rating={books[item].averageRating}
                    id={books[item].id}
                  />
                </Link>
              ))}

              {books.length === 0 && (
                <Text fontSize={"2xl"} mb={'80vh'}>Sorry, No books found for your search</Text>
              )}
              
            </Flex>
            <HStack
              justifyContent={"center"}
              spacing={2}
              mt={10}
              mb={10}
              p={2}
              ml={"auto"}
            >
              {/* pagination */}
              {/* <Box
                bg={"blue.400"}
                color={"white"}
                borderRadius={"md"}
                p={2}
                px={4}
              
              >1</Box>
              <Box>2</Box>
              <Box>3</Box>
              <Box>4</Box>
              <Box>5</Box>
              <Text>...</Text>
              <Box>10</Box> */}

              {currentPage >= 4 && <Button>...</Button>}

              {noOfPages &&
                Array.from({ length: noOfPages }).map((_, index) =>
                  index <= currentPage + 3 && index >= currentPage - 3 ? (
                    <Button
                      key={index}
                      colorScheme="purple"
                      borderRadius={"md"}
                      p={2}
                      px={4}
                      onClick={() => {
                        window.scrollTo(0, 0);
                        fetchBooks(index + 1);
                        setCurrentPage(index + 1);
                      }}
                    >
                      {index + 1}
                    </Button>
                  ) : null
                )}

              {currentPage <= noOfPages - 4 && <Button>...</Button>}
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Shop;
