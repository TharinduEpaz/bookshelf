import React from 'react'
import { Flex, Grid, GridItem } from '@chakra-ui/react'
import Search from '../../components/Shop/Search'
import Filter from '../../components/Shop/Filter'
import CategoryFilter from '../../components/Shop/CategoryFilter'
import BookCardSelecBooks from '../../components/Subscription/BookCardSelectBooks'
import { Link } from 'react-router-dom'


function SelectBook() {
  const bookDetails = {
    book1: {
      id: '1',
      title: "The Midnight Library",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      price: "1950.00",
    },
    book2: {
      id: '2',
      title: "The Vanishing Half",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
      price: "1950.00"
    },
    book3: {
      id: '3',
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
      price: "1950.00",
      rating: 3.2,
    },
    book4: {
      id: '4',
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
      price: "1950.00",
      rating: 4,
    },
    book5: {
      id: '5',
      title: "The Push",
      author: "Ashley Audrain",
      image: "https://m.media-amazon.com/images/I/41ClAKnvFqL.jpg",
      price: "1950.00",
      rating: 4.9,
    }, book6: {
      id: '6',
      title: "The Midnight Library",
      author: "Matt Haig",
      image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
      price: "1950.00",
      rating: 4,
    },
    book7: {
      id: '7',
      title: "The Vanishing Half",
      author: "Brit Bennett",
      image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
      price: "1950.00",
      rating: 4.5,
    },
    book8: {
      id: '8',
      title: "The Four Winds",
      author: "Kristin Hannah",
      image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
      price: "1950.00",
      rating: 3.2,
    },
    book9: {
      id: '9',
      title: "The Sanatorium",
      author: "Sarah Pearse",
      image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
      price: "1950.00",
      rating: 4,
    },

  };
  return (
    <>
      <Grid

        templateRows="50px 50px repeat(8, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
        h={'100%'}
      >
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
          <Flex justifyContent={'center'} flexWrap={'wrap'} gap={10} p={10}>
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
