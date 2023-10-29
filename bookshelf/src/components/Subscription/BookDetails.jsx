import React, { useEffect } from "react";
import { useState } from "react";
import {
    Flex,
    Box,
    Button,
    Text,
    Grid,
    GridItem,
    Checkbox,
    Spinner,
    Heading,
    Icon
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import BookCard from "../Subscription/BookCard";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useContext } from "react";
import { userContext } from "../../context/userContext";

function bookDetails() {

    const [subscriptionType, setSubscriptionType] = useState([]);
    const [bookDetails, setBookDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);

    let count = 0;
    useEffect(() => {
        const getSubscription = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions",
                    {
                        withCredentials: true
                    }
                )

                setSubscriptionType(response.data);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
        };
        getSubscription();
    }, []);

    useEffect(() => {
        const getCurrentSubscription = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions/getMySubscription",
                    {
                        withCredentials: true
                    }
                );
                setSubscriptionDetails(response);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
        };
        getCurrentSubscription();
    }, []);

    const getBooks = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(
                "http://localhost:3000/api/v1/subscriptions/selectBooks",
                { withCredentials: true }
            );
            console.log(response);
            setBookDetails(response.data[0].books)
            setIsLoading(false);
            

        } catch (error) {
            console.log(error);
            console.log("ss");
        }
    };

    useEffect(() => {
    
        getBooks();
    
    }, []);

    const handleRemoveBook = (key) => {
        const updatedBookDetails = { ...bookDetails };
        delete updatedBookDetails[key];
        setBookDetails(updatedBookDetails);
    };

    if (isLoading) {
        return <Spinner size="xl" colorScheme="blue" />;
    }

    let currentSubscription = subscriptionDetails && subscriptionDetails.data[0].subscriptionType;

    let subscriptionAmount = ""
    
    if (currentSubscription === "Book Reader") {
        subscriptionAmount = bookDetails?.[0]?.price - bookDetails?.[0]?.price * 0.7;
    } 
    else if (currentSubscription === "Book Worm") {
        subscriptionAmount = bookDetails?.[0]?.price - bookDetails?.[0]?.price * 0.6;
    } 
    else if (currentSubscription === "Book Lover") {
        subscriptionAmount = bookDetails?.[0]?.price - bookDetails?.[0]?.price * 0.4;
    }

    return (
        <div>
            <Flex flexWrap="wrap" gap={20} p={15} flexDirection={"row"}>
                {bookDetails.length > 0 && (
                    bookDetails.map((book, index) => (
                        <>
                            <Text display={"none"} mt={-100} key={index}> {count++}</Text>

                            <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <BookCard
                                    id={book.bookSubscription.bookId}
                                    name={book.title}
                                    author={book.author}
                                    price={book.price}
                                    rating={book.averageRating}
                                    imageURL={book.image}
                                    link={`/selectBook/${book.bookSubscription.bookId}`}
                                    handleRemoveBook={handleRemoveBook}
                                />
                            </div>
                        </>
                    )
                    )
                )}

                {count > 0 && count < 3 &&
                    (
                        <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: 300, marginTop: 50 }}>
                            <CardHeader>
                                <Heading size='md' fontSize={20} color={"blue.400"}> Add Books </Heading>
                            </CardHeader>
                            <CardBody>
                            </CardBody>
                            <CardFooter>
                                <RouterLink to="/selectPackage/selectBook">
                                    <Button
                                        marginTop={2}
                                        colorScheme="black"
                                        variant={"outline"}
                                        borderRadius={15}
                                        // getBooks = {getBooks}
                                        
                                    >
                                        Select Books
                                    </Button>
                                </RouterLink>
                            </CardFooter>
                        </Card>
                    )
                }
                
                {bookDetails.length === 0 && (
                    <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxHeight: 300, marginTop: 50 }}>
                        <CardHeader>
                            <Heading size='md' fontSize={20} color={"red.400"}> No Books Selected</Heading>
                        </CardHeader>
                        <CardBody>
                        </CardBody>
                        <CardFooter>
                            <RouterLink to="/selectPackage/selectBook">
                                <Button
                                    marginTop={2}
                                    colorScheme="black"
                                    variant={"outline"}
                                    borderRadius={15}
                                >
                                    Select Books
                                </Button>
                            </RouterLink>
                        </CardFooter>
                    </Card>
                )}

            </Flex>


            <Text textColor={"#204974"} fontSize={17} mt={6}>
                NOTE: Books will be delivered in the selected order. You should pay the
                selected amount each month to receive the order.
            </Text>


            

            <Grid templateRows={"repeat(2,1fr)"} templateColumns={"repeat(8,1fr)"} gap={"15px"} marginTop={10} marginLeft={18} >
                
                <GridItem rowSpan={1} colSpan={2} textColor={"#204974"} fontSize={20} as={"b"}>
                    <Icon viewBox='0 0 200 200' mt={-1}>
                        <path
                            fill='currentColor'
                            d='M 100, 100 m -85, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
                        />
                    </Icon>
                    <span >
                        {bookDetails?.[0]?.title || 'No selected book for subscription'}
                    </span>
                </GridItem>

                <GridItem justifyContent={"center"} rowSpan={1} colSpan={6} textColor={"#204974"} fontSize={20} as={"b"} ml={500}>
                    <span>
                        Rs { subscriptionAmount||'0'}.00
                    </span>
                   
                </GridItem>

                <GridItem rowSpan={1} colSpan={6} textColor={"#204974"}>
                    <Checkbox>
                        <Text  fontSize={17}>I agree to the terms and conditions</Text>
                    </Checkbox>
                </GridItem>
                <GridItem rowSpan={1} colSpan={1}>
                    <RouterLink to="#">
                        <Paybutton items={bookDetails[0]} totalPrice={subscriptionAmount}/>
                    </RouterLink>
                </GridItem>
            </Grid>
        </div>
    );
}



const Paybutton = (props) => {
    const { user } = useContext(userContext);
    const cartItems = Array(props.items)
    console.log(cartItems);
    const totalPrice = props.totalPrice
    const [isLoading,setIsLoading] = useState(false)

    console.log(totalPrice);
  
    const handleSubmit = async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.post('/orders/create-payment-intent',{
          cart : cartItems,
          user : user.user.userId,
          total: totalPrice,
          subscription:1,
        });
        console.log(response);
        window.location.href=response.data.url;
        setIsLoading(false)
  
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    };

  
    return (
      <Button onClick={handleSubmit} colorScheme="purple">
      {isLoading && <Spinner/>}
        Pay Now
      </Button>
    )
  };

export default bookDetails;