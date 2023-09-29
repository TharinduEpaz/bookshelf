import { React, useState, useEffect } from "react";
import BlurWhiteBox from "../components/Home/BlurWhiteBox";
import { BlurWhiteBox as DonationBox } from "../components/Donation/BlurWhiteBox";
import { BlurWhiteBox as SubscriptionBox } from "../components/Subscription/BlureWhiteBox";
import { BlurWhiteBox as SharingBox } from "../components/Sharing/BlurWhiteBox";

import HomeItemBox from "../components/Home/HomeItemBox";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Spinner,
} from "@chakra-ui/react";
import axiosInstance from "../utils/axiosInstance";
import BookCard from "../components/Shop/BookCard";


function Fiction() {

  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {

  const fetchBooks = async () => {
    setIsLoading(true);
    try {

      const response = await axiosInstance.get("books/filter/Fiction");
      setBooks(response.data);
      console.log(response.data);
     
    } catch (error) {
      setError(error);
    }

    setIsLoading(false);
  }
    fetchBooks();
  }, []);



  if(isLoading){
    return (
    <Box
    m={"auto"}
    mt={2}
    w="80%"
    borderRadius="2xl"
    boxShadow="sm"
    bgGradient="linear(to left, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))"
    // filter="blur(8px)"
    backdropFilter="blur(8px)"
    p={10}
    zIndex={"-999"}
    display={"flex"}
    justifyContent={"center"}
    alignItems={"center"}

  >
    <Spinner
    
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.200"
    color="blue.500"

    ></Spinner>
  </Box>
    )
  }

  return (
    <>
      <Box
        m={"auto"}
        mt={2}
        w="80%"
        borderRadius="2xl"
        boxShadow="sm"
        bgGradient="linear(to left, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
        zIndex={"-999"}
      >
      <Heading fontSize={'6xl'}>
        Fiction
      </Heading>

        <Flex
          gap={10}
          alignItems={"center"}
          justifyContent={"left"}
          w={"100%"}
          mt={10}
          flexWrap={{ base: "wrap", md: "wrap", lg: "nowrap" }}
        >
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              name={book.title}
              author={book.author}
              price={book.price}
              stock={book.stock}
              description={book.description}
              ISBN={book.ISBN}
              typesAvailable={book.typesAvailable}
              genre={book.genre}
              language={book.language}
              featuredCategory={book.featuredCategory}
              imageURL={book.image}
              rating={book.averageRating}
              />
          ))}
        </Flex>



      </Box>
    </>
  );
}

export default Fiction;
