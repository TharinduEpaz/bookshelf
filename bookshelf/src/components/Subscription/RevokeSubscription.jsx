import React, { useState, useEffect } from 'react';
import {
    Text, Box, Button, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from "axios";
import { useToast } from '@chakra-ui/react'
import { color } from 'framer-motion';

function RevokeSubscription() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = React.useRef();
    const [reloadPage, setReloadPage] = useState(false);
    const toast = useToast();
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to delete the user's subscription
    const deleteSubscription = async () => {
        try {
            const response = await axios.delete(
                "http://localhost:3000/api/v1/subscriptions/deleteMySubscription",
                {
                    withCredentials: true
                }
            );

            // Check the response and handle success or error here
            if (response.status === 200) {
                // Subscription deleted successfully
                console.log("Subscription deleted successfully");
            } else {
                // Handle other response statuses if necessary
                console.error("Error deleting subscription:", response.statusText);
            }
            toast({
                title: 'Successfully Revoked.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            
            });
            setReloadPage(true);
        } catch (error) {
            // Handle errors that occur during the request
            console.error("Error deleting subscription:", error);
        }
    };

    useEffect(() => {
        if (reloadPage) {
            window.location.reload(); // Reload the page
        }
    }, [reloadPage]);

    return (
        <Box padding={5}>
            <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                Revoke Subscription
            </Text>
            <Text fontSize={'xl'} padding={4}>
                After revoking the subscription, you should return the current book to our delivery partner.
            </Text>

            {/* Use the navigate function to navigate to the selectSubscription page */}
            <Button
                color={'red'}
                variant={'outline'}
                border={'1px'}
                borderRadius={10}
                marginLeft={5}
                onClick={() => {
                    onOpen();
                    // Navigate to the selectSubscription page
                }}
            >
                Revoke
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Revoke Subscription
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to revoke your subscription?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => {
                                deleteSubscription();
                                onClose();
                                navigate('/selectSubscription');
                            }} ml={3}>
                                Revoke
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    );
}

export default RevokeSubscription;
