import React, { useEffect, useState } from "react";
import {
    Box,
    Grid,
    GridItem,
    Heading,
    HStack,
    SimpleGrid,
    Image,
    Button,
    Badge,
    Stack,
    Input,
    useNumberInput,
    Divider,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    useDisclosure
} from "@chakra-ui/react";

import { useToast } from '@chakra-ui/react'
import Search from "../../components/Shop/Search";
import LinkTree from "../../components/Subscription/LinkTree";
import RadioCard from "../../components/Shop/RadioSet";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { BiSolidSelectMultiple} from "react-icons/bi";
import SimpleReview from "../../components/Shop/SimpleReview";
import AboutAuthor from "../../components/Shop/AboutAuthor";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

function SelectBookSubscription() {
    const [book,setBook] =useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [getBook, setGetBook] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const id = useParams();
    const toast = useToast()
    // console.log(id);

    useEffect(() => {
        const getBook = async (id) => {
            try {
              
                // console.log(id.id);
                const bookId = id.id;
                const response = await axios.get('http://localhost:3000/api/v1/subscriptions/' + bookId);
                setBook(response.data);
                // console.log(response.data);
              
            } catch (error) {
                console.log(error);
            }
        };
        getBook(id);
    }, []);

    const addBookSubscription = async(id)=>{
        try {
            const bookId = id.id;
            console.log(bookId);
            const response = await axios.post(
                "http://localhost:3000/api/v1/subscriptions/bookSubscription",
                {
                    id: bookId,
                    
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            return (
                toast({
                    title: 'Successfully Updated.',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            )


        } catch (error) {
            console.error(error.response.data.msg);
            return (
                toast({
                    title: error.response.data.msg,
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                    position: 'top'
                })
            )
        }
    }
    return (
        <>
            <Box
                height={"100%"}
                m={"auto"}
                mt={10}
                w="80%"
                borderRadius="md"
                boxShadow="sm"
                bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
                // filter="blur(8px)"
                backdropFilter="blur(8px)"
                p={10}
            >
                <Grid
                    templateRows="repeat(10, 1fr)"
                    templateColumns="repeat(5, 1fr)"
                    gap={2}
                >
                    <GridItem rowSpan={2} colSpan={5}>
                        <SimpleGrid columns={1}>
                            <Box h={"40px"} pl={3}>
                                {" "}
                                <LinkTree />
                            </Box>
                            <Box h={"60px"}>
                                {" "}
                                <Search />
                            </Box>
                        </SimpleGrid>
                    </GridItem>

                    <GridItem
                        rowSpan={7}
                        colSpan={2}
                        p={10}
                        h={"100%"}

                    >
                        <Box
                            boxSize="sm"
                            objectFit={"contain"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"start"}
                        >
                            <Image
                                src={book.image}
                                alt="Dan Abramov"
                                borderRadius={"md"}
                                maxH={400}
                            />
                        </Box>
                    </GridItem>
                    <GridItem rowSpan={7} colSpan={3} ml={10}>
                        <Stack direction="row" mb={5}>
                            <Badge>Fiction</Badge>
                            <Badge colorScheme="green">In Stock</Badge>
                            <Badge colorScheme="red">Out Of Stock</Badge>
                            <Badge colorScheme="purple">New</Badge>
                        </Stack>
                        <Heading>{book.title}</Heading>

                        <Box display="flex" alignItems={"center"} mt={4}>
                            {Array(5)
                                .fill("")
                                .map((_, i) => {
                                    const roundedRating =
                                        Math.round(book.averageRating* 2) / 2;
                                    if (roundedRating - i >= 1) {
                                        return (
                                            <BsStarFill
                                                color={"gold"}
                                                key={i}
                                                style={{ marginLeft: "1" }}
                                            />
                                        );
                                    }
                                    if (roundedRating - i === 0.5) {
                                        return (
                                            <BsStarHalf
                                                key={i}
                                                color={"gold"}
                                                style={{ marginLeft: "1" }}
                                            />
                                        );
                                    }
                                    return (
                                        <BsStar
                                            key={i}
                                            style={{ marginLeft: "1" }}
                                            color={"gold"}
                                        />
                                    );
                                })}
                            <Heading
                                size={"md"}
                                ml={10}
                                fontFamily={"montserrat"}
                                fontWeight={"light"}
                            >
                                By {book.author}
                            </Heading>
                        </Box>
                        {/* varients as two buttons */}
                        <Box mt={10} fontWeight={'bold'}>
                            {/* <RadioCard options={productDetails.variants}  /> */}
                        </Box>
                        <Box mt={10}>
                            <Heading
                                ml={2}
                                size={"lg"}
                                fontFamily={"montserrat"}
                                fontWeight={'bold'}
                                color={'#0A3BBA'}
                                as={'del'}

                            >
                                Rs. {book.price}
                            </Heading>
                            <Heading
                                ml={5}
                                size={"lg"}
                                fontFamily={"montserrat"}
                                fontWeight={'bold'}
                                color={'#0A3BBA'}
                                as={'b'}

                            >
                                Rs. {book.price -book.price*0.4}
                            </Heading>

                            <Box display={'flex'} alignItems={'center'} gap={10} mt={10}>
                                {/* <Button w={200} colorScheme="purple" borderRadius={15}>Add To Cart</Button> */}
                                {/* <Button leftIcon={<BiSolidSelectMultiple />} colorScheme='blue' variant='solid' borderRadius={10} w={200}>
                                    Select Book
                                </Button> */}
                                <RouterLink to={'/selectPackage/details'} onClick={() => addBookSubscription(id)}>
                                    <Button leftIcon={<BiSolidSelectMultiple />} colorScheme='blue' ml={3}>
                                        Select Book
                                    </Button>
                                </RouterLink>

                            </Box>

                            <Divider mt={5} mb={5} color={'black.600'} borderWidth={1} borderColor={'blue.200'} />

                            <Text>
                                {book.description}
                            </Text>
                        </Box>
                    </GridItem>
                </Grid>

                <Tabs isLazy>
                    <TabList>
                        {/* <Tab>Summaries</Tab> */}
                        <Tab>Reviews</Tab>
                        <Tab>About the author</Tab>
                    </TabList>
                    <TabPanels>
                        {/* initially mounted */}
                        {/* <TabPanel>
      <Summaries />
    </TabPanel> */}
                        {/* initially not mounted */}
                        <TabPanel>
                            <SimpleReview />
                        </TabPanel>
                        <TabPanel>
                            <AboutAuthor />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
}


function HookUsage() {
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
        useNumberInput({
            step: 1,
            defaultValue: 1,
            min: 1,
            max: 10,

        })

    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    return (
        <HStack maxW='150px'>
            <Button {...inc} bg={'blue.100'} borderRadius={100}>+</Button>
            <Input {...input} fontWeight={'bold'} textAlign={'center'} borderRadius={100} />
            <Button {...dec} bg={'blue.100'} borderRadius={100}>-</Button>
        </HStack>
    )
}

export default SelectBookSubscription;
