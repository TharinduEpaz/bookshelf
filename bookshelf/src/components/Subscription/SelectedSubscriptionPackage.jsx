import React, { useState, useEffect } from 'react';
import BookDetails from "../../components/Subscription/BookDetails";
import SelectLoverIcon from '../../components/Subscription/SelectLoverIcon';
import SelectReaderIcon from './SelectReaderIcon';
import SelectWormIcon from './SelectWormIcon';
import {
    Box,
    Button,
    Grid,
    GridItem,
    Text,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    Spinner

} from "@chakra-ui/react";

import { BsCalendar2DayFill } from "react-icons/bs";
import { Outlet } from 'react-router-dom';
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { Link as RouterLink } from "react-router-dom";


function SelectedSubscriptionPackage() {
    const [subscriptionType, setSubscriptionType] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    const [extendDate, setExtendDate] = useState("");
    const [orderDate, setOrderDate] = useState(null)
    const [expireDate, setExpireDate] = useState("") 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isLoading, setIsLoading] = useState(false);
    const cancelRef = React.useRef()

   

    useEffect(() => {
        const getCurrentSubscription = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions/getMySubscription",
                    {
                        withCredentials: true
                    }
                );
                setSubscriptionDetails(response);
                //console.log("hel");
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
        };
        getCurrentSubscription();

        const getOrderDate = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions/getOrderDate",
                    {
                        withCredentials: true
                    }
                );
                
                setOrderDate(response);
                // console.log(response.data.orderDate);
                response && setExtendDate(response.data.orderDate);
                response && setExpireDate(response.data.expireDate);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching subscription:", error);
            }
        };
        getOrderDate();
    }, []);


    let currentSubscription = subscriptionDetails?.data[0]?.subscriptionType;
    let currentSubscriptionIcon = "";

    if (currentSubscription === "Book Reader") {
        currentSubscriptionIcon = <SelectReaderIcon />;
    } else if (currentSubscription === "Book Worm") {
        currentSubscriptionIcon = <SelectWormIcon />;
    } else if (currentSubscription === "Book Lover") {
        currentSubscriptionIcon = <SelectLoverIcon />;
    }

    function extendDeliveryDate(data) {
        const originalDate = new Date(data);

        if (currentSubscription === "Book Reader") {
            const oneWeekLater = new Date(originalDate.getTime() + 44 * 24 * 60 * 60 * 1000); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            return (oneWeekLater.toISOString().slice(0, 10));
        } else if (currentSubscription === "Book Worm") {
            const oneWeekLater = new Date(originalDate.getTime() + 14 * 24 * 60 * 60 * 1000); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            return (oneWeekLater.toISOString().slice(0, 10));
        } else if (currentSubscription === "Book Lover") {
            const oneWeekLater = new Date(originalDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
            return (oneWeekLater.toISOString().slice(0, 10));
        }
        // Extend the date by one week (7 days)
        

    } 
    extendDate &&extendDeliveryDate(extendDate)
    return (
        <Grid>
            <GridItem rowSpan={1} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} bg={'white'} py={7} px={12}>
                <Box>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Current Subscription
                    </Text>
                    {isLoading && <Spinner />}
                    {currentSubscriptionIcon}
                </Box>

            </GridItem>

            <GridItem rowSpan={4} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} bg={'white'} py={7} px={12} marginTop={5}>
                <Text fontSize={'21'} color={'#204974'} as={'b'}>
                    Delivery Information
                </Text>
                

                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                        <AlertDialogHeader>Exchange Dates?</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            Are you sure you want to exchange your delivery date?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                                <RouterLink to="#">
                                    <W1Button totalPrice={200} extension={1} />
                                </RouterLink>
                                <RouterLink to="#">
                                    <W2Button totalPrice={300} extension={2} />
                                </RouterLink>
                                <RouterLink to="#">
                                    <W4Button totalPrice={400} extension={4} />
                                </RouterLink>
                            
                           
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(9,1fr)'} marginTop={10} >
                    
                    <GridItem marginTop={'3px'} ml={10} colSpan={3} >
                        <Text fontSize={'21'} color={'#204974'} as={'b'}>
                            Book Delivery Date
                        </Text>
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Text as={'b'} fontSize={'22'} textColor={"#204974"}>
                            {isLoading && <Spinner />}
                            {extendDate.slice(0,10) }
                        </Text>
                    </GridItem>
                </Grid>

                <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(9,1fr)'} marginTop={10} >

                    <GridItem marginTop={'3px'} ml={10} colSpan={3} display={'flex'} flexDirection={'column'}>
                        <Text fontSize={'21'} color={'red'} as={'b'} >
                            Subscription Expires on 
                        </Text>
                        <Text fontSize={'15'} color={'#204974'} as={'b'}>
                            ( You should order next book on/before this date )
                        </Text>
                    </GridItem>
                    <GridItem colSpan={2} ml={2}>
                        <Text as={'b'} fontSize={'22'} textColor={"red"}>
                            {isLoading && <Spinner /> }
                            {expireDate && expireDate.slice(0,10)}
                        </Text>
                    </GridItem>
                    <Button onClick={onOpen} variant={'outline'} colorScheme='red' borderRadius={15} marginLeft={0}  w={150}>
                        <strong>Extended Date</strong>
                    </Button>
                </Grid>
                <Box marginTop={10}>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Book Details
                    </Text>
                </Box>
                <BookDetails />
            </GridItem>
        </Grid>

    )
}


const W1Button = (props) => {

    const totalPrice = props.totalPrice
    const extension = props.extension
    const [isLoading, setIsLoading] = useState(false)

    console.log(totalPrice);
    console.log(extension)

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/orders/extenddate', {
               amount: totalPrice,
               extension: extension
            });
            //console.log(response);
            window.location.href = response.data.url;
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };

    return (
        <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
            {isLoading && <Spinner />}
            1 week
        </Button>
    )
};

const W2Button = (props) => {
    const totalPrice = props.totalPrice;
    const extension = props.extension;
    const [isLoading, setIsLoading] = useState(false)

    console.log(totalPrice);

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/orders/extenddate', {
               amount: totalPrice,
               extension: extension
            });
            console.log(response);
            window.location.href = response.data.url;
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };

    return (
        <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
            {isLoading && <Spinner />}
            2 week
        </Button>
    )
};


const W4Button = (props) => {
    const totalPrice = props.totalPrice;
    const extension = props.extension;
    const [isLoading, setIsLoading] = useState(false)

    console.log(totalPrice);

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const response = await axiosInstance.post('/orders/extenddate', {
                amount: totalPrice,
                extension: extension
            });
            console.log(response);
            window.location.href = response.data.url;
            setIsLoading(false)

        } catch (error) {
            console.log(error);
            setIsLoading(false)
        }
    };

    return (
        <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
            {isLoading && <Spinner />}
            4 week
        </Button>
    )
};
export default SelectedSubscriptionPackage