<<<<<<< HEAD
=======
import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  VStack,
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
  Spinner,
  Radio,
} from "@chakra-ui/react";
import Search from "../components/Shop/Search";
import LinkTree from "../components/LinkTree";
import RadioCard from "../components/Shop/RadioSet";
import { BsCart, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Summaries from "../components/Shop/Summaries";
import SimpleReview from "../components/Shop/SimpleReview";
import AboutAuthor from "../components/Shop/AboutAuthor";
import axios from "axios";
import { useBooksContext } from "../context/booksContext";
import { useParams } from "react-router-dom";
import AddToCart from "../components/Shop/AddToCart";
import { userContext } from "../context/userContext";
import { useContext } from "react";


function ProductPage() {
  const id = useParams();
  const { isLoading, fetchSingleBook, currentBook } = useBooksContext();
  const [amount, setAmount] = useState(1);
  const { user } = useContext(userContext);

  console.log(currentBook);
  // console.log(currentBook.createdAt);

  console.log(amount);

  useEffect(() => {
    const getBook = async () => {
      fetchSingleBook(id.id);
    };
    getBook();
  }, []);

  // console.log(currentBook);

  if (!currentBook || isLoading) {
    return (
      <>
      <Box mb={'100vh'}>
        <Spinner
          position={"absolute"}
          top={"30%"}
          left={"50%"}
          size={"xl"}
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500" 
        />
        </Box>
      </>
    );
  } else
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
                  <LinkTree productName={currentBook.title}/>
                </Box>
                <Box h={"60px"}>
                  {" "}
                  <Search />
                </Box>
              </SimpleGrid>
            </GridItem>

            <GridItem rowSpan={7} colSpan={2} p={10} h={"100%"}>
              <Box
                boxSize="sm"
                objectFit={"contain"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"start"}
              >
                <Image
                  src={currentBook.image}
                  alt="Dan Abramov"
                  borderRadius={"md"}
                  maxH={400}
                />
              </Box>
            </GridItem>
            <GridItem rowSpan={7} colSpan={3} ml={10}>
              <Stack direction="row" mb={5}>
                <Badge>{currentBook.genre}</Badge>

                {currentBook.stock > 0 ? <Badge colorScheme="green">In Stock</Badge> :
                <Badge colorScheme="red">Out Of Stock</Badge> }

                {new Date(currentBook.createdAt) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) ? <Badge colorScheme="purple">New</Badge> : null}
              </Stack>
              <Heading>{currentBook.title}</Heading>

              <Box display="flex" alignItems={"center"} mt={4}>
                {Array(5)
                  .fill("")
                  .map((_, i) => {
                    const roundedRating =
                      Math.round(currentBook.averageRating * 2) / 2;
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
                  By {currentBook.author}
                </Heading>
              </Box>
              {/* varients as two buttons */}
              <Box mt={10}>
                {/* <RadioCard options={currentBook.typesAvailable} bookType={bookType} setBookType={setBookType}  /> */}
              
              </Box>
              <Box mt={10}>
                <Heading
                  ml={2}
                  size={"lg"}
                  fontFamily={"montserrat"}
                  fontWeight={"thin"}
                >
                  Rs.{currentBook.price}
                </Heading>

                <Box display={"flex"} alignItems={"center"} gap={10} mt={10}>
               <HookUsage stock={currentBook.stock} setAmount={setAmount} /> 
                  {/* <Button w={200} colorScheme="purple" borderRadius={15}>Add To Cart</Button> */}

                  {currentBook.stock > 0 ? (
                    <AddToCart
                      amount={amount}
                    
                      bookId={currentBook.id}
                      title={currentBook.title}
                      price={currentBook.price}
                      image={currentBook.image}
                      stock={currentBook.stock}

                    />
                  ) : (
                    <Button
                      w={200}
                      colorScheme="red"
                      borderRadius={15}
                      disabled
                    >
                      Out Of Stock
                    </Button>
                  )}
                </Box>

                <Divider
                  mt={5}
                  mb={5}
                  color={"black.600"}
                  borderWidth={1}
                  borderColor={"blue.200"}
                />

                <Text>{currentBook.description}</Text>
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
                <SimpleReview bookId={currentBook.id}/>
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

function HookUsage(props) {
  const { stock } = props;
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 1,
      max: stock,
      onChange: (value) => props.setAmount(value),
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  return (
    <HStack maxW="150px">
      <Button {...inc} bg={"blue.100"} borderRadius={100}>
        +
      </Button>
      <Input
        {...input}
    
        fontWeight={"bold"}
        textAlign={"center"}
        borderRadius={100}
      />
      <Button {...dec} bg={"blue.100"} borderRadius={100}>
        -
      </Button>
    </HStack>
  );
}

export default ProductPage;
>>>>>>> 1d7fb02ac1782bbd8f69374ec69eea28b237b13d
