import React from 'react'

import {
    Text, Box, Button, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,

} from "@chakra-ui/react";

import { useState } from 'react';

function RevokeSubscription() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    return (
        <Box padding={5}>
            <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                Revoke Subscription
            </Text>
            <Text fontSize={'xl'} padding={4}>
                After revoking the subscription you should return the current book to our delivery partner.
            </Text>

            <Button
                color={'red'}
                variant={'outline'}
                border={'1px'}
                borderRadius={10}
                marginLeft={5}
                onClick={onOpen} >
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
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You want to remove your subscription.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Revoke
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You want to remove your subscription.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onClose} ml={3}>
                                Revoke
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Box>
    )
}

export default RevokeSubscription
