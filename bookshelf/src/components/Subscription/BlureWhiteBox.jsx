import {
    Box,
    Heading,
    Image,
    Grid,
    GridItem,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "../Search";
import axios from "axios";

export function BlurWhiteBox({ title, image }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const navigate = useNavigate();


    const checkSubscription = async () => {
        try {
            console.log("ddd");
            const response = await axios.get("http://localhost:3000/api/v1/subscriptions/checkSubscription", { withCredentials: true, })
             console.log(response.data)
            if (response.data==null) {
                console.log("ddww");
                 navigate("/selectSubscription");
            }
            else {
            onOpen();
            }
        } catch (error) {

        }
    }

    return (
        <Box
            m={"auto"}
            mt={10}
            w="80%"
            h="40vh"
            borderRadius="2xl"
            boxShadow="sm"
            bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
            // filter="blur(8px)"
            backdropFilter="blur(8px)"
            p={4}

        >
            <Grid
                h="35vh"
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}

            // overflow={'hidden'}
            >
                <GridItem rowSpan={3} colSpan={3}>
                    <Heading
                        // fontWeight={"100"}
                        w={"100%"}
                        lineHeight={"50px"}
                        ml={5}
                        mt={5}
                        color={"blue.700"}
                        fontWeight={'600'}
                        fontSize={{ lg: '2.0rem', sm: '2xl' }}
                    >
                        {title}
                    </Heading>
                </GridItem>
                <GridItem rowSpan={5} colSpan={2}>
                    <Image
                        boxSize={"xsm"}
                        objectFit={"cover"}
                        src={image}
                        position={"relative"}
                        top={-2}
                    />
                </GridItem>
                <GridItem rowSpan={2} colSpan={3} alignItems={'top'} display={'flex'}>
                    {/* <RouterLink onClick={onOpen} > */}
                    <>
                        <Button mt={10} ml={5} mr={14} textAlign={'center'} colorScheme="purple" w={230} borderRadius={100} onClick={() => checkSubscription()}>Subscription Packages</Button>
                    
                    </>
                    {/* </RouterLink> */}
                    <>
                        <Search />
                    </>
                </GridItem>
                {isOpen && (
                    <AlertDialog size={'xl'} isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                        <AlertDialogOverlay />
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                Select Subscription
                            </AlertDialogHeader>
                            <AlertDialogCloseButton />
                            <AlertDialogBody>
                                You already selected a subscription package
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                                <RouterLink to="/selectPackage">
                                    <Button colorScheme='purple' ml={3}>
                                        manage subscription
                                    </Button>
                                </RouterLink>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
            </Grid>
        </Box>
    );
}

export default BlurWhiteBox;
