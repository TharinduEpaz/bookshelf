import React, { useState, useEffect } from 'react';
import {
    Box, 
    SimpleGrid, 
    Button, 
    Text, 
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure,
    GridItem,
    Grid,
    Card, CardHeader, CardBody, CardFooter,
    Flex,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react'
import SelectLoverIcon from './SelectLoverIcon';
import SelectReaderIcon from './SelectReaderIcon';
import SelectWormIcon from './SelectWormIcon';
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";

export default function ChangeSubscription() {
    const [subscriptionType, setSubscriptionType] = useState([]);
    const [showOtherSubscriptionPopup, setShowOtherSubscriptionPopup] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState(null);
    const [reloadPage, setReloadPage] = useState(false);
    const toast = useToast()

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

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();

    const handleYesClick = (index) => {
        setSelectedSubscriptionIndex(index);
        setShowOtherSubscriptionPopup(true);
        onClose();
    };

    const handleSelectSubscription = async (subscription) => {
        
        try {
            const selectedSubscription = "Book" + " "+ subscription
            console.log(subscription);
            const response = await axios.patch(
                "http://localhost:3000/api/v1/subscriptions/updateMySubscription",
                {
                    subscriptionType: selectedSubscription
                },
                {
                    withCredentials: true
                }
            );
            // console.log(subscriptionType)
            // console.log("Subscription updated:", response.data);

            // Perform any necessary actions after the subscription is updated

            setShowOtherSubscriptionPopup(false);
            
            return(
                toast({
                    title: 'Successfully Updated.',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position:'top'
                })
            )
            setReloadPage(true);

        } catch (error) {
            console.error("Error updating subscription:", error);
        }
    };

    
    useEffect(() => {
        if (reloadPage) {
            window.location.reload(); // Reload the page
        }
    }, [reloadPage]);

    let currentSubscription = subscriptionDetails && subscriptionDetails.data[0].subscriptionType;
    let currentSubscriptionIcon = null;

    if (currentSubscription === "Book Reader") {
        currentSubscriptionIcon = <SelectReaderIcon />;
    } else if (currentSubscription === "Book Worm") {
        currentSubscriptionIcon = <SelectWormIcon />;
    } else if (currentSubscription === "Book Lover"){
        currentSubscriptionIcon = <SelectLoverIcon />;
    }

    let otherSubscriptionIcon1 = null;
    let otherSubscriptionIcon2 = null;
    let otherSubscription1 = null;
    let otherSubscription2 = null;
    let otherSubscription1Id = null;
    let otherSubscription2Id = null;
    let otherSubscription1BookCount = null;
    let otherSubscription2BookCount = null;
    let otherSubscription1TimePeriod = null;
    let otherSubscription2TimePeriod = null;
    let otherSubscription1Discount = null;
    let otherSubscription2Discount = null;
    let otherSubscriptionManage1 = null;
    let otherSubscriptionManage2 = null;

    if (currentSubscription === "Book Lover" && subscriptionType.length >= 2) {
        otherSubscriptionIcon1 = <SelectWormIcon />;
        otherSubscription1 = subscriptionType[0].LastName;
        otherSubscription1BookCount = subscriptionType[0].book_count;
        otherSubscription1TimePeriod = subscriptionType[0].time_period;
        otherSubscription1Discount = subscriptionType[0].discount;
        otherSubscription1Id = subscriptionType[0].id;
        otherSubscriptionManage1 = '/selectBookWorm/manageSubscription';

        otherSubscriptionIcon2 = <SelectReaderIcon />;
        otherSubscription2 = subscriptionType[2].LastName;
        otherSubscription2BookCount = subscriptionType[2].book_count;
        otherSubscription2TimePeriod = subscriptionType[2].time_period;
        otherSubscription2Discount = subscriptionType[2].discount;
        otherSubscription2Id = subscriptionType[2].id;
        otherSubscriptionManage2 = '/selectBookReader/manageSubscription';
    }
    else if (currentSubscription === "Book Worm" && subscriptionType.length >= 2) {
        otherSubscriptionIcon1 = <SelectReaderIcon />;
        otherSubscription1 = subscriptionType[2].LastName;
        otherSubscription1BookCount = subscriptionType[2].book_count;
        otherSubscription1TimePeriod = subscriptionType[2].time_period;
        otherSubscription1Discount = subscriptionType[2].discount;
        otherSubscription1Id = subscriptionType[2].id;
        otherSubscriptionManage1 = '/selectBookReader/manageSubscription';


        otherSubscriptionIcon2 = <SelectLoverIcon />;
        otherSubscription2 = subscriptionType[1].LastName;
        otherSubscription2BookCount = subscriptionType[1].book_count;
        otherSubscription2TimePeriod = subscriptionType[1].time_period;
        otherSubscription2Discount = subscriptionType[1].discount;
        otherSubscription2Id = subscriptionType[1].id;
        otherSubscriptionManage2 = '/selectBookLover/manageSubscription';
    } 
    else if (currentSubscription === "Book Reader" && subscriptionType.length >= 2) {
        otherSubscriptionIcon1 = <SelectLoverIcon />;
        otherSubscription1 = subscriptionType[1].LastName;
        otherSubscription1BookCount = subscriptionType[1].book_count;
        otherSubscription1TimePeriod = subscriptionType[1].time_period;
        otherSubscription1Discount = subscriptionType[1].discount;
        otherSubscription1Id = subscriptionType[1].id;
        otherSubscriptionManage1 = '/selectBookLover/manageSubscription';

        otherSubscriptionIcon2 = <SelectWormIcon />;
        otherSubscription2 = subscriptionType[0].LastName;
        otherSubscription2BookCount = subscriptionType[0].book_count;
        otherSubscription2TimePeriod = subscriptionType[0].time_period;
        otherSubscription2Discount = subscriptionType[0].discount;
        otherSubscription2Id = subscriptionType[0].id;
        otherSubscriptionManage2 = '/selectBookWorm/manageSubscription';
    }

    return (
        <Box p={4}>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                
                <Box>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Current Subscription
                    </Text>
                    {currentSubscriptionIcon}
                </Box>
                <Button onClick={onOpen}>Change Subscription</Button>
                <AlertDialog
                    motionPreset='slideInBottom'
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    isOpen={isOpen}
                    isCentered
                >
                    <AlertDialogOverlay />
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize={20}>Change Subscription??</AlertDialogHeader>
                        <AlertDialogCloseButton />
                        <AlertDialogBody>
                            <Text fontSize={18}>
                                Are you sure you want to change this subscription plan?
                            </Text>
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme='purple' ml={3} onClick={() => handleYesClick(0)}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {showOtherSubscriptionPopup && (
                    <AlertDialog
                        motionPreset='slideInBottom'
                        isOpen={showOtherSubscriptionPopup}
                        isCentered
                        size={'6xl'}
                    >
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                            <AlertDialogHeader>Other Subscription Plans</AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(4,1fr)'} gap={'15px'} paddingTop={5}>
                                    <GridItem rowSpan={1} colSpan={2}>
                                        <Card align='center' borderRadius={'10px'} border={'2px solid '} borderColor={'blue.200'}>
                                            <Flex flexDirection='column' width='100%'>
                                                <CardHeader bg={'blue.100'}>
                                                    {otherSubscriptionIcon1}
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>Terms for the <strong> Book {otherSubscription1}</strong> subscription package
                                                    </Text>

                                                    <UnorderedList pl={5}>
                                                        <ListItem>
                                                            {otherSubscription1BookCount} book for {" "} {otherSubscription1TimePeriod}
                                                        </ListItem>
                                                        <ListItem>
                                                            {otherSubscription1Discount} {" "}
                                                            of the original price of the book
                                                        </ListItem>
                                                        <ListItem>Doorstep delivery</ListItem>
                                                        <ListItem>Please make sure the book has the optimal quality when returned to avoid extra quality check charges</ListItem>
                                                    </UnorderedList>
                                                </CardBody>
                                                <CardFooter align={'center'}>
                                                    <RouterLink to={otherSubscriptionManage1}>
                                                        <Button
                                                            bg={'blue.200'}
                                                            borderRadius={10}
                                                            pl={10}
                                                            pr={10}
                                                            onClick={() => handleSelectSubscription(otherSubscription1)}
                                                        >
                                                            Select
                                                        </Button>
                                                    </RouterLink>
                                                </CardFooter>
                                            </Flex>
                                        </Card>
                                    </GridItem>
                                   
                                    <GridItem rowSpan={1} colSpan={2}>
                                        <Card align='center' borderRadius={'10px'} border={'2px solid '} borderColor={'#FFED01'}>
                                            <Flex flexDirection='column' width='100%'>
                                                <CardHeader bg={'orange.100'} >
                                                    <Box>
                                                        {otherSubscriptionIcon2}
                                                    </Box>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>Terms for the <strong> Book {otherSubscription2}</strong> subscription package
                                                    </Text>
                                                    <UnorderedList pl={5}>
                                                        <ListItem>
                                                            {otherSubscription2BookCount} book for {" "} {otherSubscription2TimePeriod}
                                                        </ListItem>
                                                        <ListItem>
                                                            {otherSubscription2Discount} {" "}
                                                            of the original price of the book
                                                        </ListItem>
                                                        <ListItem>Doorstep delivery</ListItem>
                                                        <ListItem>Please make sure the book has the optimal quality when returned to avoid extra quality check charges</ListItem>
                                                    </UnorderedList>
                                                </CardBody>
                                                <CardFooter>
                                                    <RouterLink to={otherSubscriptionManage2}>
                                                        <Button
                                                            bg={'orange.200'}
                                                            borderRadius={10}
                                                            pl={10}
                                                            pr={10}
                                                            onClick={() => handleSelectSubscription(otherSubscription2)}
                                                        >
                                                            Select
                                                        </Button>
                                                    </RouterLink>
                                                </CardFooter>
                                            </Flex>
                                        </Card>
                                    </GridItem>
                                </Grid>
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button color='purple' ml={3} onClick={() => setShowOtherSubscriptionPopup(false)}>
                                    Close
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </SimpleGrid>
        </Box>
    );
}
