import React from 'react'
import { Box, Flex, Grid, GridItem, Heading } from '@chakra-ui/react'
import Search from '../components/Shop/Search'
import Filter from '../components/Shop/Filter'
import CategoryFilter from '../components/Shop/CategoryFilter'
import BookCard from '../components/Shop/BookCard'

function Shop() {
  const bookDetails = {
    book1: {
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      price: "14.99",
      rating: 4,
    },
    book2: {
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
      price: "14.99",
      rating: 4.5,
    },
    book3: {
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
      price: "14.99",
      rating: 3.2,
    },
    book4: {
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
      price: "14.99",
      rating: 4,
    },
    book5: {
      title: "The Push",
      author: "Ashley Audrain",
      image: "https://m.media-amazon.com/images/I/41ClAKnvFqL.jpg",
      price: "14.99",
      rating: 4.9,
    }, book6: {
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      price: "14.99",
      rating: 4,
    },
    book7: {
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
      price: "14.99",
      rating: 4.5,
    },
    book8: {
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
      price: "14.99",
      rating: 3.2,
    },
    book9: {
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
      price: "14.99",
      rating: 4,
    },
    book10: {
      title: "The Push",
      author: "Ashley Audrain",
      image: "https://m.media-amazon.com/images/I/41ClAKnvFqL.jpg",
      price: "14.99",
      rating: 4.9,
    },
  
  };
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
      {Object.keys(bookDetails).map((item) => (
            <BookCard
              key={item}
              name={bookDetails[item].title}
              author={bookDetails[item].author}
              price={bookDetails[item].price}
              imageURL={bookDetails[item].image}
              rating={bookDetails[item].rating}
            />
          ))}
          </Flex>
      </GridItem>
      </Grid>
    </Box>
    </>
  )
}

export default Shop