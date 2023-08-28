import React, { useState, useEffect } from 'react';
import {
    Box, SimpleGrid, Button, Text, AlertDialog,
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
import { useLocation } from 'react-router-dom';
import SelectLoverIcon from './SelectLoverIcon';
import SelectReaderIcon from './SelectReaderIcon';
import SelectWormIcon from './SelectWormIcon';
import { Link as RouterLink } from 'react-router-dom';
import axios from "axios";

export default function ChangeSubscription() {
    const [subscriptionType, setSubscriptionType] = useState([]);
    const [selectedSubscriptionIndex, setSelectedSubscriptionIndex] = useState(null);
    const [showOtherSubscriptionPopup, setShowOtherSubscriptionPopup] = useState(false);
    const [subscriptionDetails, setSubscriptionDetails] = useState(null);
    // useEffect(() => {
    //     const getSubscription = async () => {
    //         try {
    //             const response = await axios.get(
    //                 "http://localhost:3000/api/v1/subscriptions"
    //             );
    //             setSubscriptionType(response.data);
               
                
    //         } catch (error) {
    //             console.error("Error fetching subscription:", error);
    //         }
    //     };
    //     getSubscription();
    // }, []);

    useEffect(() => {
        const getCurrentSubscription = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/v1/subscriptions/getMySubscription",
                    { 
                        userId: "d384f58e-ee9a-48eb-8c96-141e66f6af60" 
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                console.log("hello");
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

    const location = useLocation();
    const pathname = location.pathname;

    let currentSubscription = null;

    if (pathname.includes('Reader')) {
        currentSubscription = <SelectReaderIcon />;
    } else if (pathname.includes('Worm')) {
        currentSubscription = <SelectWormIcon />;
    } else {
        currentSubscription = <SelectLoverIcon />;
    }

    let otherSubscription1 = null;
    let otherSubscription2 = null;

    let otherSubscriptionManage1 = null;
    let otherSubscriptionManage2 = null;

    let otherSubscriptionDetail1 = null;
    let otherSubscriptionDetail2 = null;

    if (pathname.includes('Reader')) {
        otherSubscription1 = <SelectWormIcon />;
        otherSubscription2 = <SelectLoverIcon />;
        otherSubscriptionManage1 = '/selectBookWorm/manageSubscription';
        otherSubscriptionDetail1 = '/selectBookWorm/details';
        otherSubscriptionManage2 = '/selectBookLover/manageSubscription';
        otherSubscriptionDetail2 = '/selectBookLover/details';
    } else if (pathname.includes('Worm')) {
        otherSubscription1 = <SelectReaderIcon />;
        otherSubscription2 = <SelectLoverIcon />;
        otherSubscriptionManage1 = '/selectBookReader/manageSubscription';
        otherSubscriptionDetail1 = '/selectBookReader/details';
        otherSubscriptionManage2 = '/selectBookLover/manageSubscription';
        otherSubscriptionDetail2 = '/selectBookLover/details';
    } else {
        otherSubscription1 = <SelectReaderIcon />;
        otherSubscription2 = <SelectWormIcon />;
        otherSubscriptionManage1 = '/selectBookReader/manageSubscription';
        otherSubscriptionDetail1 = '/selectBookReader/details';
        otherSubscriptionManage2 = '/selectBookWorm/manageSubscription';
        otherSubscriptionDetail2 = '/selectBookWorm/details';
    }

    return (
        <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                <Box>
                    <Text fontSize={'21'} color={'#204974'} as={'b'}>
                        Current Subscription
                    </Text>
                    {/* {currentSubscription} */}
                    {subscriptionDetails}
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
                                                    {otherSubscription1}
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>Terms for the
                                                        {subscriptionType.length > 0 && selectedSubscriptionIndex !== null ? (
                                                            <Text as={'b'}>
                                                                {" "}
                                                                {subscriptionType[selectedSubscriptionIndex].firstName}
                                                                {" "}
                                                                {subscriptionType[selectedSubscriptionIndex].LastName}
                                                            </Text>
                                                        ) : (
                                                            <Text> </Text>
                                                        )}  subscription Package</Text>
                                                    <UnorderedList pl={5}>
                                                        <ListItem>
                                                            {subscriptionType.length > 0 && selectedSubscriptionIndex !== null ? (
                                                                <>
                                                                    {subscriptionType[selectedSubscriptionIndex].book_count} book
                                                                    for{" "} {subscriptionType[selectedSubscriptionIndex].time_period}
                                                                </>
                                                            ) : (
                                                                <Text> </Text>
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            {subscriptionType.length > 0 && selectedSubscriptionIndex !== null ? (
                                                                <>
                                                                    {subscriptionType[selectedSubscriptionIndex].discount} book
                                                                    every for{" "}
                                                                </>
                                                            ) : (
                                                                <Text> </Text>
                                                            )} of the original price of the book</ListItem>
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
                                                        {otherSubscription2}
                                                    </Box>
                                                </CardHeader>
                                                <CardBody>
                                                    <Text>Terms for the
                                                        {subscriptionType.length > 0 && selectedSubscriptionIndex !== null ? (
                                                            <Text as={'b'}>
                                                                {" "}
                                                                {subscriptionType[selectedSubscriptionIndex].firstName}
                                                                {" "}
                                                                {subscriptionType[selectedSubscriptionIndex].lastName}
                                                            </Text>
                                                        ) : (
                                                            <Text> </Text>
                                                        )}  subscription Package</Text>
                                                    <UnorderedList pl={5}>
                                                        <ListItem>
                                                            {subscriptionType.length > 0 && selectedSubscriptionIndex !== null ? (
                                                                <>
                                                                    {subscriptionType[selectedSubscriptionIndex].book_count} book
                                                                    for{" "} {subscriptionType[selectedSubscriptionIndex].time_period}
                                                                </>
                                                            ) : (
                                                                <Text> </Text>
                                                            )}
                                                        </ListItem>
                                                        <ListItem>
                                                            {subscriptionType.length > 0 && selectedSubscriptionIndex !== null ? (
                                                                <>
                                                                    {subscriptionType[selectedSubscriptionIndex].discount} book
                                                                    every for{" "}
                                                                </>
                                                            ) : (
                                                                <Text> </Text>
                                                            )} of the original price of the book</ListItem>
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
