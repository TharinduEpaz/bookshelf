import React, { useEffect } from 'react';
import { useState } from 'react';
import { Flex, Box, Button, Text, Grid, GridItem, Checkbox, Skeleton } from '@chakra-ui/react';
import BookCard from '../Subscription/BookCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { Link as RouterLink } from "react-router-dom";
import axios from 'axios'


function bookDetails() {

    const [bookDetails, setBookDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:3000/api/v1/subscriptions/selectBooks", { withCredentials: true });
                setBookDetails(response.data);
                response.data.forEach((user) => {
                    user.books.forEach((book) => {
                        console.log("Book Title:", book.title);
                    });
                });
                setIsLoading(false);
            }
            catch (error) {
                console.log(error);
                console.log("ss")
            }
        }
        getBooks();
    }, []);

    const handleRemoveBook = (key) => {
        const updatedBookDetails = { ...bookDetails };
        delete updatedBookDetails[key];
        setBookDetails(updatedBookDetails);
    };

    return (
        <div>
            <Flex flexWrap="wrap" gap={20} p={15} flexDirection={'row'}>
                {Object.keys(bookDetails).length === 0 ? (
                    <>
                        {isLoading && <Skeleton> <BookCard /></Skeleton>}
                        {isLoading && <Skeleton> <BookCard /></Skeleton>}
                        {isLoading && <Skeleton> <BookCard /></Skeleton>}
                      

                        {/* <Text fontSize={18} as={'b'} marginTop={5} ml={2}>No books have been selected for subscription</Text>
                        <RouterLink to="/selectPackage/selectBook">
                            <Box marginLeft={43} color={'black'}>
                                <BsFillPlusCircleFill size={25} />
                            </Box>
                            <Button marginTop={2} colorScheme="red" variant={'outline'} borderRadius={15}>
                                Select Books
                            </Button>
                        </RouterLink> */}
                    </>
                ) : (
                    <>
                        <Flex flexWrap="wrap" gap={20} p={15} flexDirection={'column'}>
                            
                            {bookDetails.map((user, index) => (
                                <Flex key={index} gap={10}>
                                    {user.books.map((book, bookIndex) => (
                                        <div key={bookIndex}>
                                            <BookCard
                                                id={book.bookSubscription.bookId}
                                                name={book.title}
                                                author={book.author}
                                                price={book.price}
                                                rating={book.averageRating}
                                                imageURL={book.image}
                                                link={`/selectBook/${book.bookSubscription.bookId}`}
                                            />
                                        </div>
                                    ))}
                                </Flex>
                            ))}
                        </Flex>
                        <Box marginTop={160}>
                            <RouterLink to="/selectPackage/selectBook">
                                <Box marginLeft={45}>
                                    <BsFillPlusCircleFill size={25} />
                                </Box>
                                <Button marginTop={2} colorScheme="black" variant={'outline'} borderRadius={15}>
                                    Select Books
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
                    {/* {bookDetails[firstBookName]?.title || 'There are no books for subscription'} */}
                </GridItem>

                <GridItem justifyContent={'center'} rowSpan={1} colSpan={2} textColor={'#204974'} fontSize={20} as={'b'} ml={175}>
                    {/* Rs {bookDetails[firstBookName]?.price || '0.00'} */}
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

export default bookDetails;