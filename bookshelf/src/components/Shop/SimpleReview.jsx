import React, { useEffect, useState } from "react";

import {
  Container,
  Heading,
  Box,
  Flex,
  Text,
  Stack,
  HStack,
  Avatar,
  useColorModeValue,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Textarea,
  Alert,
  AlertIcon,
  ButtonGroup,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import StarRating from "./StarRating";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const reviewData = [
  {
    avatarSrc:
      "https://s.gravatar.com/avatar/4f9135f54df98fe894a9f9979d600a87?s=80",
    review: `What a wonderful little cottage! More spacious and adorable than the What a wonderful little cottage! More spacious and adorable than the
      pictures show. We never met our hosts and...`,
    stars: 3,
    userName: "Ahmad",
    dateTime: "2 months ago",
  },
  {
    avatarSrc: "",
    review: `What a wonderful little cottage! More spacious and adorable than the
      pictures show. We never met our hosts, but we felt welcomed and...`,
    stars: 4,
    userName: "Ali",
    dateTime: "1 months ago",
  },
  {
    avatarSrc: "",
    review: `What a wonderful little cottage! More spacious and adorable than the
      pictures show. We never met our hosts, but we felt welcomed and...`,
    stars: 2,
    userName: "Zac",
    dateTime: "4 months ago",
  },
];

const ratingSummary = [
  { id: 1, rating: 5, percentage: "80%" },
  { id: 2, rating: 4, percentage: "65%" },
  { id: 3, rating: 3, percentage: "35%" },
  { id: 4, rating: 2, percentage: "75%" },
  { id: 5, rating: 1, percentage: "55%" },
];


const SimpleReview = ({ bookId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviews,setReviews] = useState(null)
  const [averageRating,setAverageRating] = useState(0);

  const toast = useToast();

  useEffect(() => {
    async function getReviews() {
      try {
        const response = await axiosInstance.get(`reviews/${bookId}`);
        console.log(response);
        setReviews(response.data)
        console.log(reviews);
      } catch (error) {
        console.log(error);
      }
    }

    getReviews();
  }, []);

  const rate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const reviewUrl = "http://localhost:3000/api/v1/reviews";
    try {
      const response = await axiosInstance.post(
        "reviews",
        {
          rating: rating,
          review: review,
          bookId: bookId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

    
 

  
      setRating(0);
      setReview("");
      setIsLoading(false);

      onClose();

      return toast({
        title: "Review added successfully",
        position: "top",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      // console.error(error.response.data.message);
      setError(error.response.data.message);
      setIsLoading(false);

      return toast({
        title: "Sorry something went wrong please try again later",
        position: "top",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }

    onClose();
  };

  function getPercentageForRating(data, targetRating) {
    if (data.length === 0) {
      return 0; // If there are no ratings, the percentage is 0.
    }
  
    const matchingRatings = data.filter(item => item.rating === targetRating);
    const percentage = (matchingRatings.length / data.length) * 100;
    return percentage;
  }


  return (
    <Container maxW="5xl" p={{ base: 5, md: 10 }}>
      <Box mb={8}>
        <Flex justify={"space-between"}>
          <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={3}>
            Audience rating summary
          </Heading>
          <Button
            colorScheme="blue"
            variant={"outline"}
            borderRadius={100}
            onClick={onOpen}
          >
            {" "}
            Write Review{" "}
          </Button>
        </Flex>
        <Stack spacing={3}>
          <Box>
            <HStack spacing={3}>
              <Flex alignItems="center" justify="start">
                {Array.from(Array(4).keys()).map((id) => {
                  return <Star key={id} fillColor="#EACA4E" />;
                })}
                {Array.from(Array(5 - 4).keys()).map((id) => {
                  return <Star key={id} fillColor="#e2e8f0" />;
                })}
              </Flex>
              <Text fontWeight="bold" fontSize="lg">
                4.0
              </Text>
            </HStack>
            <Text fontWeight="bold" fontSize="md">
              { reviews && reviews.length} Ratings
            </Text>
          </Box>

          <Stack direction="column" spacing={1}>
            {ratingSummary.map((data) => {
              return (
                <HStack key={data.id} spacing={5}>
                  <Text fontWeight="bold" fontSize="md">
                    {data.rating}
                  </Text>
                  <Box w={{ base: "100%", md: "70%" }}>
                    <Box
                      w="100%"
                      bg={useColorModeValue("gray.300", "gray.600")}
                      rounded="md"
                    >
                      <Box
                        w={reviews && getPercentageForRating(reviews,data.rating).toString() }
                        h={3}
                        bg="yellow.400"
                        rounded="md"
                      ></Box>
                    </Box>
                  </Box>
                  <Text fontWeight="bold" fontSize="md">
                    {reviews && getPercentageForRating(reviews,data.rating)} %
                  </Text>
                </HStack>
              );
            })}
          </Stack>
        </Stack>
      </Box>

      <Box>






        <Heading as="h3" size="lg" fontWeight="bold" textAlign="left" mb={4}>
          Audience reviews
        </Heading>
        <Stack direction="column" spacing={5}>
        
          {reviews && reviews.map((review, index) => {
            return (
              <Box key={index} maxW="2xl">
                <HStack spacing={3} mb={2}>
                  <Avatar
                    size="md"
                    // name={review.userName}
                    name="rer"
                    // src={review.avatarSrc}
                  />
                  <Stack direction="column" spacing={2}>
                    <Text fontWeight="bold" fontSize="md">
                      {review.User.firstName}
                    </Text>
                    <Flex alignItems="center" justify="start">
                      {Array.from(Array(review.rating).keys()).map((id) => {
                        return <Star key={id} fillColor="#EACA4E" />;
                      })}
                      {Array.from(Array(5 - review.rating).keys()).map((id) => {
                        return <Star key={id} fillColor="#e2e8f0" />;
                      })}
                    </Flex>
                  </Stack>
                </HStack>
                <Text
                  color={useColorModeValue("gray.700", "gray.400")}
                  fontSize="0.87rem"
                  textAlign="left"
                  lineHeight="1.375"
                  fontWeight="300"
                >
                  {review.review}
                </Text>
              </Box>
            );
          })}
        </Stack>
      </Box>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>
            {/* <Alert status='error' fontSize={15} w={'90%'}>
    <AlertIcon />
    You Have to buy this book before writing a review
  </Alert> */}
            {error && (
              <Alert status="error" fontSize={15} w={"90%"}>
                <AlertIcon />
                {error}
              </Alert>
            )}
          </ModalHeader>
          <ModalHeader>Write a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text mb={2}>Rate this book</Text>
            <form onSubmit={rate}>
              <StarRating rating={rating} setRating={setRating} />

              <FormControl mt={4}>
                <FormLabel>Your Review</FormLabel>
                <Textarea
                  placeholder="write review here"
                  onChange={(e) => setReview(e.target.value)}
                />
              </FormControl>
              <ButtonGroup mt={5}>
                <Button colorScheme="blue" mr={3} type="submit">
                  Submit
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ButtonGroup>
            </form>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const Star = ({ fillColor }) => {
  return (
    <svg
      style={{
        width: "1rem",
        height: "1rem",
        fill: fillColor,
        marginRight: "0.25rem",
      }}
      viewBox="0 0 1000 1000"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M972 380c9 28 2 50-20 67L725 619l87 280c11 39-18 75-54 75-12 0-23-4-33-12L499 790 273 962a58 58 0 0 1-78-12 50 50 0 0 1-8-51l86-278L46 447c-21-17-28-39-19-67 8-24 29-40 52-40h280l87-279c7-23 28-39 52-39 25 0 47 17 54 41l87 277h280c24 0 45 16 53 40z" />
    </svg>
  );
};

export default SimpleReview;
