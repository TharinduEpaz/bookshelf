import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, GridItem, Heading, Skeleton, Spinner } from '@chakra-ui/react'
import Search from '../components/Shop/Search'
import Filter from '../components/Shop/Filter'
import CategoryFilter from '../components/Shop/CategoryFilter'
import BookCard from '../components/Shop/BookCard'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useBooksContext } from '../context/booksContext'

function Shop() {
  
  // const [bookDetails, setBookDetails] = useState({});
  // const [isLoading, setIsLoading] = useState(false);

  const { books,isLoading } = useBooksContext();

  // useEffect(() => {
  //   const getBooks = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await axios.get(`http://localhost:3000/api/v1/books`);
  //       console.log(response.data);
  //       setBookDetails(response.data);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getBooks();
  // }, []);


  
  return (
    <>
    <Box
    height={'100%'}
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
      h={'100%'}
      >
      <GridItem rowSpan={1} colSpan={5} >
        <Search/>
      </GridItem>
      <GridItem rowSpan={1} colSpan={5} p={2}>
        <Filter />
      </GridItem>
      <GridItem rowSpan={8} colSpan={1} border={'1px'} borderColor={'blue.200'} rounded={'md'}>
        <CategoryFilter />
      </GridItem>
      <GridItem rowSpan={8} colSpan={4} border={'1px'} borderColor={'blue.200'} rounded={'md'}>
      <Flex flexWrap={'wrap'} gap={10} p={10}>
      
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}
      {isLoading && <Skeleton> <BookCard /></Skeleton>}

      {Object.keys(books).map((item) => (
        <Link to={`/shop/${books[item].id}`} 
              key={books[item].id}>
            
            <BookCard
              name={books[item].title}
              author={books[item].author}
              price={books[item].price}
              imageURL={books[item].image}
              rating={books[item].rating}
              id={books[item].id}
            />
            </Link>
          ))}
          </Flex>
      </GridItem>
      </Grid>
    </Box>
    </>
  )
}

export default Shop