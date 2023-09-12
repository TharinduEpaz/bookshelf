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


const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};



function Rating({ rating}) {
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


    
function BookCard({ bookKey, name, author, price, imageURL, rating, onRemove }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const handleDelete = () => {
        onRemove(bookKey);
        onClose();
    };

    return (
        <Flex alignItems="center" justifyContent="center" flexDirection={'column'}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW={'200px'}
                maxH={'380px'}
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

            <Button marginTop={8}
                colorScheme="red"
                variant={'outline'}
                borderRadius={15} onClick={onOpen}>
                    Remove
                </Button>

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
                                onClick={() => onRemove(bookKey)} ml={3}>
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