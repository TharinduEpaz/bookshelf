import React, { useEffect, useState } from 'react'
import { Flex, Grid, GridItem, Skeleton } from '@chakra-ui/react'
import Search from '../../components/Shop/Search'
import Filter from '../../components/Shop/Filter'
import CategoryFilter from '../../components/Shop/CategoryFilter'
import BookCardSelecBooks from '../../components/Subscription/BookCardSelectBooks'
import { Link } from 'react-router-dom'
import axios from 'axios'

function SelectBook() {
 

  const [bookDetails, setBookDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`http://localhost:3000/api/v1/books`);
        console.log(response.data);
        setBookDetails(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getBooks();
  }, []);

  return (
    <>
      <Grid

        templateRows="50px 50px repeat(8, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
        h={'100%'}
      >
        mmm 
        <GridItem rowSpan={1} colSpan={5} >
          <Search />
        </GridItem>

        <GridItem rowSpan={1} colSpan={5} p={2}>
          <Filter />
        </GridItem>

        <GridItem rowSpan={8} colSpan={1} border={'1px'} borderColor={'blue.200'} rounded={'md'}>
          <CategoryFilter />
        </GridItem>
        
        <GridItem rowSpan={8} colSpan={4} border={'1px'} borderColor={'blue.200'} rounded={'md'} >
          <Flex flexWrap={'wrap'} gap={10} p={10}>

            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {isLoading && <Skeleton> <BookCardSelecBooks /></Skeleton>}
            {Object.keys(bookDetails).map((item) => (
              <Link to={`/selectBook/${bookDetails[item].id}`}
                key={bookDetails[item].id}>
                <BookCardSelecBooks
                  id={bookDetails[item].id}
                  name={bookDetails[item].title}
                  author={bookDetails[item].author}
                  price={bookDetails[item].price}
                  imageURL={bookDetails[item].image}
                  rating={bookDetails[item].rating}
                />
              </Link>
            ))}
          </Flex>
        </GridItem>
      </Grid>
    </>
  )
}

export default SelectBook
