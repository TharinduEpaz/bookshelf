import {
    Flex,
    Circle,
    Box,
    Image,
    useColorModeValue,
    Heading,
    Button,
    Text
} from '@chakra-ui/react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { Link } from "react-router-dom";

const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};



function Rating({ rating, numReviews }) {
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

function BookCard({ name,  price, imageURL, id }) {
    return (
        <Flex alignItems="center" justifyContent="center" flexDirection={'column'}>
            <Box
                bg={useColorModeValue('white', 'gray.800')}
                maxW={'240px'}
                maxH={'500px'}
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
                    boxSize={'240px'}
                    objectFit='cover'

                />

                <Box p="6" >

                    <Flex  justifyContent="center" alignContent="center">
                        <Box
                            fontSize="sm"
                            fontWeight="light"
                            lineHeight="tight"
                            
                        >
                            <Heading fontSize={20}>{name}</Heading>
                        </Box>
                    </Flex>

                    <Flex alignContent="center" direction={'column'} mt={2}>
                        <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                            <Box as="span" color={'gray.600'} fontSize="lg" justifyContent={'center'} display={'flex'} mt={'2'} >
                                <Text  as={'del'} fontWeight={'bold'} color={'#0A3BBA'}>
                                    Rs. {price}
                                </Text>
                                <Text as={'b'} color={'#0A3BBA'} marginLeft={3}>
                                    Rs. {price-price*0.8}.00
                                </Text>

                            </Box>
                            <Box justifyContent={'center'} display={'flex'} marginTop={2}>
                                <Link to={`/selectBook/${id}`} >
                                    <Button color="white" colorScheme='blue' borderRadius={15}>
                                        View Details
                                    </Button>
                                </Link>
                            </Box>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Flex>
    );
}

export default BookCard;