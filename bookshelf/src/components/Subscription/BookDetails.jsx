import React from 'react';
import { useState } from 'react';
import { Flex, Box, Button, Text, Grid, GridItem, Checkbox } from '@chakra-ui/react';
import BookCard from '../Subscription/BookCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';

import { Link as RouterLink } from "react-router-dom";



function Shop() {
    const initialBookDetails = {
        book1: {
            title: "The Midnight Library",
            author: "Matt Haig",
            image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
            price: "1499",
            rating: 4,
        },
        
    };

    const [bookDetails, setBookDetails] = useState(initialBookDetails);

    const firstBookName = Object.keys(bookDetails)[0];
    const firstBookPrice = firstBookName ? bookDetails[firstBookName].price : 0; // Default value if firstBookName is undefined




    const handleRemoveBook = (bookKey) => {
        const updatedBookDetails = { ...bookDetails };
        delete updatedBookDetails[bookKey];
        setBookDetails(updatedBookDetails);
    };

    return (
        <div>
            <Flex flexWrap="wrap" gap={20} p={15} flexDirection={'row'}>
                {Object.keys(bookDetails).length === 0 ? (
                    <>
                        <Text  fontSize={18} as={'b'} marginTop={5} ml={2}>No books have been selected for subscription</Text>

                        <RouterLink to="/selectBookLover/selectBook">
                            <Box marginLeft={43} color={'black'}>
                                <BsFillPlusCircleFill size={25} />
                            </Box>
                            <Button marginTop={2} colorScheme="red" variant={'outline'} borderRadius={15}>
                                Select Book
                            </Button>
                        </RouterLink>

                    </>
                ) : (
                    <>
                        <Flex flexWrap="wrap" gap={20} p={15} flexDirection={'row'}>
                            {Object.keys(bookDetails).map((item) => (
                                <BookCard
                                    key={item}
                                    bookKey={item}
                                    name={bookDetails[item].title}
                                    author={bookDetails[item].author}
                                    price={bookDetails[item].price}
                                    imageURL={bookDetails[item].image}
                                    rating={bookDetails[item].rating}
                                    onRemove={handleRemoveBook}
                                />
                            ))}
                        </Flex>
                        <Box marginTop={160}>
                            <RouterLink to="/selectBookLover/selectBook">
                                <Box marginLeft={45}>
                                    <BsFillPlusCircleFill size={25} />
                                </Box>
                                <Button marginTop={2} colorScheme="black" variant={'outline'} borderRadius={15}>
                                    Select Book
                                </Button>
                            </RouterLink>
                        </Box>
                    </>
                )}
            </Flex>
            <Text textColor={'#204974'} fontSize={17}>
                NOTE : Books will be delivered in selected order. You should pay the selected amount each month to receive the order
            </Text>

            <Grid templateRows={'repeat(2,1fr)'} templateColumns={'repeat(7,1fr)'} gap={'15px'} marginTop={10} marginLeft={18}>
                <GridItem rowSpan={1} colSpan={5} textColor={'#204974'} fontSize={20} as={'b'}>
                    {bookDetails[firstBookName]?.title || 'There are no books for subscription'}
                </GridItem>

                <GridItem justifyContent={'center'} rowSpan={1} colSpan={2} textColor={'#204974'} fontSize={20} as={'b'} ml={175}> 
                    Rs {bookDetails[firstBookName]?.price || '0.00'}
                </GridItem>

                <GridItem rowSpan={1} colSpan={6} textColor={'#204974'} >
                    <Checkbox>
                        <Text fontSize={17} >I agree the terms and conditions</Text>
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
