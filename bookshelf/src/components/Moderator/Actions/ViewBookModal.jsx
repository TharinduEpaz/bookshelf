import {
  Box,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  HStack,
  Image,
  Heading,
  Spinner,
  Flex,
} from "@chakra-ui/react";
import { BiSolidDetail } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useBooksContext } from "../../../context/booksContext";
import { userContext } from "../../../context/userContext";
import { useContext, useEffect } from "react";

export default function ViewBookModal(id) {
  const { isLoading, fetchSingleBook, currentBook } = useBooksContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(userContext);

  const getBook = async () => {
    fetchSingleBook(id.id);
  };

  useEffect(() => {
    getBook();
  }, []);

  if (!currentBook || isLoading) {
    return (
      <>
        <Box mb={"100vh"}>
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
  }
  return (
    <>
      <Box bgColor={"green.500"} pt={1} px={1} borderRadius={4}>
        <Icon
          as={BiSolidDetail}
          onClick={() => {
            onOpen();
            getBook();
          }}
          fontSize={"md"}
          color={"white"}
        />
      </Box>

      {/* Modal View Full Details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={"fit-content"}>
          <ModalHeader>Full Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <HStack gap={100}>
                <Image
                  src={currentBook.image ? (currentBook.image) : ("http://localhost:3000/uploads/default.jpeg")}
                  alt={currentBook.title}
                  maxH={"50vh"}
                  borderRadius={10}
                />
                <VStack alignItems={"flex-start"} w={"50vh"} gap={5}>
                  <p>
                    <strong>ID</strong> : {"Book_" + currentBook.id.slice(0, 5).toUpperCase()}
                  </p>
                  <Heading size="xl">{currentBook.title}</Heading>
                  <p>by</p>
                  <Heading size="md">Rs. {currentBook.author}</Heading>
                  <Flex>
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
                  </Flex>
                  <p>{currentBook.description}</p>
                  <HStack gap={50}>
                    <VStack alignItems={"flex-start"} gap={3}>
                      <strong>ISBN</strong>
                      <strong>Language</strong>
                      <strong>Genre</strong>
                      <strong>Price</strong>
                      <strong>Stock</strong>
                    </VStack>
                    <VStack alignItems={"flex-start"} gap={3}>
                      <p>: {currentBook.ISBN}</p>
                      <p>: {currentBook.language}</p>
                      <p>: {currentBook.genre}</p>
                      <p>: {currentBook.price}</p>
                      <p>: {currentBook.stock}</p>
                    </VStack>
                  </HStack>
                </VStack>
              </HStack>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
