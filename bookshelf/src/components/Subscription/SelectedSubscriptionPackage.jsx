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

import { BsFillCalendar2DateFill } from "react-icons/bs";
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
                console.log(response.data.orderDate);
                response && setExtendDate(response.data.orderDate);
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
                    Next Delivery
                </Text>
                <Button onClick={onOpen} bg={'white'} variant={'outline'} borderRadius={15} marginLeft={10} w={'auto'}>
                    <strong>Extended Date</strong>
                </Button>

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
                                    <W2Button totalPrice={250} extension={2} />
                                </RouterLink>
                                <RouterLink to="#">
                                    <W4Button totalPrice={300} extension={4} />
                                </RouterLink>
                            
                           
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(10,1fr)'} marginTop={10} >
                    <GridItem marginTop={'3px'}>
                        <BsFillCalendar2DateFill size={'25px'} />
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Text as={'b'} fontSize={'22'}>
                            {isLoading && <Spinner />}
                            {extendDate.slice(0,10)}
                        </Text>
                    </GridItem>
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