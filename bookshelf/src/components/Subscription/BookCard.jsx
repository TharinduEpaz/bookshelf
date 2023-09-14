import React, { useEffect, useState } from "react";
import {
    Flex,
    Circle,
    Box,
    Image,
    useColorModeValue,
    Heading,
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link as RouterLink } from "react-router-dom";
import { AiTwotoneEye } from 'react-icons/ai';
import { MdRemoveCircleOutline } from 'react-icons/md';
import axios from "axios";
import { useToast } from '@chakra-ui/react'

const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};



function Rating({ rating }) {
    return (
        <Box display="flex" alignItems="center" justifyContent={'center'}>
            {Array(5)
                .fill('')
                .map((_, i) => {
                    const roundedRating = Math.round(rating * 2) / 2;
                    if (roundedRating - i >= 1) {
                        return (
                            <BsStarFill
                                color={'gold'}
                                key={i}
                                style={{ marginLeft: '1' }}

                            />
                        );
                    }
                    if (roundedRating - i === 0.5) {
                        return <BsStarHalf key={i} color={'gold'} style={{ marginLeft: '1' }} />;
                    }
                    return <BsStar key={i} style={{ marginLeft: '1' }} color={'gold'} />;
                })}
        </Box>

    );
}



function BookCard({ id,bookKey, name, author, price, imageURL, rating, onRemove, link }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast()

    const removeBookSubscription = async(id)=>{
        try {
            const bookId =id;
            console.log(bookId);
            const response = await axios.delete(
                'http://localhost:3000/api/v1/subscriptions/removeBook',
                {
                    id: bookId
                },
                {
                    withCredentials:true,
                    headers: {
                        'Authorization': 'Bearer '
                    }
                }
            );
            
            return (
                toast({
                    title: 'Successfully Removed',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            )
        } catch (error) {
            console.log(error.response.data)
            return (
                toast({
                    title: "cant",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            )
        }
    }

    const handleDelete = () => {
        onRemove(bookKey);
        onClose();
    };

    return (
        <Flex alignItems="center" justifyContent="center" flexDirection={'column'}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW={'200px'}
                h={'380px'}
                borderWidth="1px"
                rounded="lg"

                position="relative">
                {data.isNew && (
                    <Circle
                        size="10px"
                        position="absolute"
                        top={2}
                        right={2}
                        bg="red.200"
                    />
                )}

                <Image
                    src={imageURL}
                    alt={`Picture of ${name}`}
                    roundedTop="lg"
                    boxSize={'200px'}
                    objectFit='cover'

                />

                <Box p="6">

                    <Flex mt="1" justifyContent="center" alignContent="center">
                        <Box
                            fontSize="sm"
                            fontWeight="light"
                            lineHeight="tight"
                        >
                            <Heading size={'sm'}>{name}</Heading>
                            by {author}
                        </Box>

                    </Flex>

                    <Flex alignContent="center" direction={'column'} mt={2}>
                        <Rating rating={rating} />
                        <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="lg" justifyContent={'center'} display={'flex'} mt={'2'}>
                                Rs. {price}
                            </Box>

                        </Box>
                    </Flex>
                </Box>
            </Box>

            {/* popup message */}

            <Flex mt={5} gap={9}>
                <RouterLink to={link}>
                    <Button
                        colorScheme="blue"
                        // variant={'outline'}
                        borderRadius={15} onClick={onOpen}>
                        view
                    </Button>
                </RouterLink>

                <RouterLink >

                    <Button
                        colorScheme="red"
                        variant={'outline'}
                        borderRadius={15} 
                        onClick={onOpen}>
                        Remove
                    </Button>
                </RouterLink>
            </Flex>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Remove Subscription
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure want to remove this subscription?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red'
                                onClick={() => removeBookSubscription(id)} ml={3}>
                                Remove
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </Flex>
    );
}

export default BookCard;