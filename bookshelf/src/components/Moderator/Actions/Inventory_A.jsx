import React, { useEffect, useState } from "react";

import {
  Td,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Icon,
  Container,
  Stack,
  HStack,
  Image,
  Box,
} from "@chakra-ui/react";
import { BiBasket, BiDetail, BiEditAlt, BiSolidDetail } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

export default function Inventory_A(id) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookDetails, setBookDetails] = useState("");
  const bookID = id.id;

  //get book details
  const getBookDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/books/" + bookID
      );
      const jsonData = await response.json();

      setBookDetails(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  //delete book
  const deleteBook = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/books/" + bookID,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Book deleted successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getBookDetails();
    }
  }, [isOpen]);
  return (
    <>
      <Td>
        <HStack>
          <Box bgColor={"green.500"} pt={1} px={1} borderRadius={4}>
            <Icon as={BiSolidDetail} onClick={onOpen} fontSize={"md"} color={"white"}/>
          </Box>
          <Box bgColor={"blue.600"} pt={1} px={1} borderRadius={4}>
            <Icon as={AiFillEdit} fontSize={"md"} color={"white"} />
          </Box>
          <Box bgColor={"red.500"} pt={1} px={1} borderRadius={4}>
            <Icon as={AiFillDelete} onClick={deleteBook} fontSize={"md"} color={"white"}/>
          </Box>
        </HStack>
      </Td>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={"fit-content"}>
          <ModalHeader>Book Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container>
              <Stack>
                <HStack spacing={10} mb={5}>
                  <Image
                    src="https://m.media-amazon.com/images/I/81ICvbFe2+L.jpg"
                    h={"230"}
                  />
                  <HStack spacing={5}>
                    <Stack>
                      <b>Book ID :</b>
                      <b>Book Name :</b>
                      <b>Author :</b>
                      <b>Price :</b>
                      <b>Stock :</b>
                      <b>ISBN :</b>
                      <b>Rating :</b>
                    </Stack>
                    <Stack>
                      <p>{bookDetails.id}</p>
                      <p>{bookDetails.title}</p>
                      <p>{bookDetails.author}</p>
                      <p>{bookDetails.price}</p>
                      <p>{bookDetails.stock}</p>
                      <p>{bookDetails.ISBN}</p>
                      <p>{bookDetails.averageRating}</p>
                    </Stack>
                  </HStack>
                </HStack>
                <HStack spacing={5}>
                  <Stack>
                    <b>Genre :</b>
                    <b>Language :</b>
                    <b>Description :</b>
                    <b>FeaturedCategory :</b>
                    <b>TypesAvailable :</b>
                    <b>CreatedAt :</b>
                    <b>UpdatedAt :</b>
                  </Stack>
                  <Stack>
                    <p>{bookDetails.genre}</p>
                    <p>
                      {bookDetails.language
                        ? bookDetails.language
                        : "No record"}
                    </p>
                    <p>{bookDetails.description}</p>
                    <p>
                      {bookDetails.featuredCategory
                        ? bookDetails.featuredCategory
                        : "No Record"}
                    </p>
                    <p>{bookDetails.typesAvailable}</p>
                    <p>{bookDetails.createdAt}</p>
                    <p>{bookDetails.updatedAt}</p>
                  </Stack>
                </HStack>
              </Stack>
            </Container>
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
