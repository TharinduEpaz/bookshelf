import React from "react";
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
  Spinner


} from "@chakra-ui/react";
import Search from "../components/Shop/Search";
import LinkTree from "../components/LinkTree";
import RadioCard from "../components/Shop/RadioSet";
import { BsCart, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import Summaries from "../components/Shop/Summaries";
import SimpleReview from "../components/Shop/SimpleReview";
import AboutAuthor from "../components/Shop/AboutAuthor";

function ProductPage() {
  const id = useParams();
  const {
    isLoading,
    fetchSingleBook,
    currentBook
  } = useBooksContext();

  useEffect(() => {
    const getBook = async () => {
      fetchSingleBook(id.id);
    }
    getBook();
  }, []);

  console.log(currentBook);

  if (!currentBook) {
    return (
      <>
        <Spinner />
      </>
    );

  }

  else return (
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
                src={currentBook.image}
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
              <RadioCard options={currentBook.typesAvailable} />
            </Box>
            <Box mt={10}>
              <Heading
                ml={2}
                size={"lg"}
                fontFamily={"montserrat"}
                fontWeight={'thin'}
               
              >
                Rs. {currentBook.price}
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

              <Text>
                {currentBook.description}
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
