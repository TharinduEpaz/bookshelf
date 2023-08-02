import React from 'react';
import { Flex, Box, Button, Text, Grid, GridItem, Checkbox } from '@chakra-ui/react';
import BookCard from '../Subscription/BookCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { Link as RouterLink } from "react-router-dom";



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
        // book3: {
        //     title: "The Four Winds",
        //     author: "Kristin Hannah",
        //     image: "https://m.media-amazon.com/images/I/6132R6AHGjL.jpg",
        //     price: "14.99",
        //     rating: 3.2,
        // },
    };
    const firstBookName = Object.keys(bookDetails)[0];
    const firstBookPrice = bookDetails[firstBookName].price;

    return (
        <div>
            <Flex flexWrap="wrap" gap={20} p={15} flexDirection={'row'}>
                {Object.keys(bookDetails).map((item, index) => (
                    <BookCard
                        key={item}
                        name={bookDetails[item].title}
                        author={bookDetails[item].author}
                        price={bookDetails[item].price}
                        imageURL={bookDetails[item].image}
                        rating={bookDetails[item].rating}
                        // Add a condition to show only the first card
                        display={index === 0 ? 'block' : 'none'}
                    />
                ))
                }

                <Box marginTop={160}>
                    <RouterLink to="/selectBook">
                        <Box marginLeft={45}>
                            <BsFillPlusCircleFill size={25} />
                        </Box>
                        <Button marginTop={2} colorScheme="black" variant={'outline'} borderRadius={15}>
                            Select Book
                        </Button>
                    </RouterLink>
                </Box>
            </Flex>
            <Text textColor={'#204974'}>
                NOTE : Books will be delivered in selected order. You should pay the selected amount each month to receive the order
            </Text>

            <Grid templateRows={'repeat(2,1fr)'} templateColumns={'repeat(7,1fr)'} gap={'15px'} marginTop={10} marginLeft={18}>
                <GridItem rowSpan={1} colSpan={6} textColor={'#204974'} fontSize={20} as={'b'}>
                    {bookDetails[firstBookName].title}(subscription)
                </GridItem>

                <GridItem justifyContent={'center'} rowSpan={1} colSpan={1} textColor={'#204974'} fontSize={20} as={'b'} >
                    Rs {firstBookPrice}
                </GridItem>

                <GridItem rowSpan={1} colSpan={6} textColor={'#204974'} fontSize={25}>
                    <Checkbox>
                        I agree the terms and conditions
                    </Checkbox>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1} >
                    <RouterLink to="#">
                        <Button
                            colorScheme="purple"
                            w={130}
                            borderRadius={15}

                        >
                            Go to Checkout
                        </Button>
                    </RouterLink>
                </GridItem>
            </Grid>
        </div>
    );
}

export default Shop;
