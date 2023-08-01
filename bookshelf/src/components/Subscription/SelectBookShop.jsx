import React from 'react'
import { Box, Center, Flex, Grid, GridItem } from '@chakra-ui/react'
import Search from '../../components/Shop/Search'
import Filter from '../../components/Shop/Filter'
import CategoryFilter from '../../components/Shop/CategoryFilter'
import BookCard from '../../components/Shop/BookCard'
import BookCardSelecBooks from './BookCardSelectBooks'

function SelectBookShop() {
    const bookDetails = {
        book1: {
            title: "The Midnight Library",
            image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
            price: "1950.00",
        },
        book2: {
            title: "The Vanishing Half",
            image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
            price: "1950.00"
        },
        book3: {
            title: "The Four Winds",
            author: "Kristin Hannah",
            image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
            price: "1950.00",
            rating: 3.2,
        },
        book4: {
            title: "The Sanatorium",
            author: "Sarah Pearse",
            image: "https://m.media-amazon.com/images/I/51k-rWw95NL.jpg",
            price: "1950.00",
            rating: 4,
        },
        book5: {
            title: "The Push",
            author: "Ashley Audrain",
            image: "https://m.media-amazon.com/images/I/41ClAKnvFqL.jpg",
            price: "1950.00",
            rating: 4.9,
        }, book6: {
            title: "The Midnight Library",
            author: "Matt Haig",
            image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
            price: "1950.00",
            rating: 4,
        },
        book7: {
            title: "The Vanishing Half",
            author: "Brit Bennett",
            image: "https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg",
            price: "1950.00",
            rating: 4.5,
        },
        book8: {
            title: "The Four Winds",
            author: "Kristin Hannah",
            image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
            price: "1950.00",
            rating: 3.2,
        },
        book9: {
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
                <GridItem rowSpan={8} colSpan={1} border={'1px'}  borderColor={'blue.200'} rounded={'md'}>
                    <CategoryFilter />
                </GridItem>
                <GridItem rowSpan={8} colSpan={4} border={'1px'} borderColor={'blue.200'} rounded={'md'} >
                    <Flex justifyContent={'center'} flexWrap={'wrap'} gap={10} p={10}>
                        {Object.keys(bookDetails).map((item) => (
                            <BookCardSelecBooks
                                key={item}
                                name={bookDetails[item].title}
                                price={bookDetails[item].price}
                                imageURL={bookDetails[item].image}
                            />
                        ))}
                    </Flex>
                </GridItem>
            </Grid>
        </>
    )
}

export default SelectBookShop