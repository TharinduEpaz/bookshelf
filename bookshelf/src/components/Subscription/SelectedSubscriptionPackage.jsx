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
    useDisclosure

} from "@chakra-ui/react";

import { BsFillCalendar2DateFill } from "react-icons/bs";
import { Outlet } from 'react-router-dom';
import axios from "axios";

function SelectedSubscriptionPackage() {
    const [subscriptionType, setSubscriptionType] = useState([]);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()


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

    let currentSubscription = subscriptionDetails?.data[0]?.subscriptionType;
    let currentSubscriptionIcon = "";

    if (currentSubscription === "Book Reader") {
        currentSubscriptionIcon = <SelectReaderIcon />;
    } else if (currentSubscription === "Book Worm") {
        currentSubscriptionIcon = <SelectWormIcon />;
    } else if (currentSubscription === "Book Lover") {
        currentSubscriptionIcon = <SelectLoverIcon />;
    }
    // else {
    //     currentSubscriptionIcon = <Text color={'red'} fontSize={20} marginTop={5} ml={5}>No subscriptions</Text>
    // }

    return (
        <Grid>
            <GridItem rowSpan={1} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} py={7} px={12}>
                <Box>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Current Subscription
                    </Text>
                    {currentSubscriptionIcon}
                </Box>

            </GridItem>

            <GridItem rowSpan={4} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} py={7} px={12} marginTop={5}>
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
                            {/* <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button> */}
                            <Button colorScheme='red' ml={3}>
                                1 week
                            </Button><Button colorScheme='red' ml={3}>
                                2 week
                            </Button>
                            <Button colorScheme='red' ml={3}>
                                1 month
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(10,1fr)'} marginTop={10} >
                    <GridItem marginTop={'3px'}>
                        <BsFillCalendar2DateFill size={'25px'} />
                    </GridItem>
                    <GridItem colSpan={3}>
                        <Text as={'b'} fontSize={'22'}>
                            2023-08-25
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

export default SelectedSubscriptionPackage