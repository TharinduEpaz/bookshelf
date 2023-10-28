import {
  Button,
  ButtonGroup,
  useDisclosure,
  Box,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Checkbox,
  CheckboxGroup,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { useBooksContext } from "../../../context/booksContext";
import { userContext } from "../../../context/userContext";
import { useContext, useEffect, useState } from "react";
import { Image } from "@chakra-ui/image";

export default function EditBookModal(id) {
  const { isLoading, fetchSingleBook, currentBook } = useBooksContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(userContext);

  const getBook = async () => {
    fetchSingleBook(id.id);
    setBookName(currentBook.title);
    setAuthor(currentBook.author);
    setIsbn(currentBook.ISBN);
    setLanguage(currentBook.language);
    setGenre(currentBook.genre);
    setFeaturedCategory(currentBook.featuredCategory);
    setSellingPrice(currentBook.price);
    setQuantityInStock(currentBook.stock);
    setDescription(currentBook.description);
  };

  useEffect(() => {
    getBook();
  }, []);

  const [bookName, setBookName] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [language, setLanguage] = useState("");
  const [genre, setGenre] = useState("");
  const [featuredCategory, setFeaturedCategory] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [quantityInStock, setQuantityInStock] = useState("");
  const [description, setDescription] = useState("");

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
      <Box bgColor={"blue.500"} pt={1} px={1} borderRadius={4}>
        <Icon
          as={BiEditAlt}
          onClick={() => {
            onOpen();
            getBook();
          }}
          fontSize={"md"}
          color={"white"}
        />
      </Box>

      {/* Open BookModal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxWidth={"fit-content"}>
          <form>
            <ModalHeader>Edit Book Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Container>
                <Stack spacing={5} mt={10}>
                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>
                      Name of the Book *
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="Name of the Book"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>Author *</FormLabel>
                    <Input
                      type="text"
                      placeholder="Author of the Book"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>ISBN *</FormLabel>
                    <Input
                      type="text"
                      placeholder="ISBN of the Book"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>Language</FormLabel>
                    <Select
                      placeholder="Select the language of the book"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="English">English</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="Sinhala">Tamil</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>Genre *</FormLabel>
                    <Select
                      placeholder={genre}
                      value={genre}
                      onChange={(e) => setGenre(e.target.value)}
                    >
                      <option value="Literary Fiction">Literary Fiction</option>
                      <option value="Mystery">Mystery</option>
                      <option value="Fantasy">Fantasy</option>
                      <option value="Science">Science</option>
                      <option value="History">Historical</option>
                      <option value="Romance">Romance</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Thriller">Thriller</option>
                      <option value="Biography">Biography</option>
                      <option value="Autobiography">Autobiography</option>
                      <option value="Travel">Travel</option>
                      <option value="Romance">Romance</option>
                      <option value="Children's">Children's</option>
                      <option value="Poetry">Poetry</option>
                      <option value="Horror">Horror</option>
                      <option value="Western">Western</option>
                      <option value="Humor">Humor</option>
                      <option value="Religious/Spiritual">
                        Religious/Spiritual
                      </option>
                      <option value="Graphic Novels/Comics">
                        Graphic Novels/Comics
                      </option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>
                      Featured Category
                    </FormLabel>
                    <Select
                      placeholder={featuredCategory}
                      value={featuredCategory}
                      onChange={(e) => setFeaturedCategory(e.target.value)}
                    >
                      <option value="Recommended">Recommended</option>
                      <option value="New Releases">New Releases</option>
                      <option value="Best Sellers">Best Sellers</option>
                      <option value="Culinary">Culinary</option>
                      <option value="Featured">Featured</option>
                      <option value="Other">Other</option>
                    </Select>
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>
                      Selling Price (Rs)
                    </FormLabel>
                    <Input
                      type="number"
                      placeholder="Price of the Book"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>
                      Quantity in Stock
                    </FormLabel>
                    <Input
                      type="number"
                      placeholder="Quantity in Stock"
                      value={quantityInStock}
                      onChange={(e) => setQuantityInStock(e.target.value)}
                    />
                  </FormControl>

                  <FormControl>
                    <FormLabel fontWeight={"semibold"}>Description</FormLabel>
                    <Textarea
                      placeholder="Add a Description about Book"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                </Stack>
              </Container>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Save
              </Button>
              <Button
                colorScheme="gray"
                color={"black"}
                mr={3}
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
