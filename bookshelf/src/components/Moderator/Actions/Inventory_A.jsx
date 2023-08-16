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
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Checkbox,
  CheckboxGroup,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { BiBasket, BiDetail, BiEditAlt, BiSolidDetail } from "react-icons/bi";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";

export default function Inventory_A(id) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [bookDetails, setBookDetails] = useState("");
  const bookID = id.id;
  const updateBookURL = "http://localhost:3000/api/v1/books/" + bookID;

  //
  const [bookName, setBookName] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [isbn, setIsbn] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [featuredCategory, setFeaturedCategory] = React.useState("");
  const [availableTypes, setAvailableTypes] = React.useState([]);
  const [sellingPrice, setSellingPrice] = React.useState("");
  const [quantityInStock, setQuantityInStock] = React.useState("1");
  const [description, setDescription] = React.useState("");

  const [content, SetContent] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  //get book details
  const getBookDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/books/" + bookID
      );
      const jsonData = await response.json();

      setBookDetails(jsonData);
      setBookName(jsonData.title);
      setAuthor(jsonData.author);
      setIsbn(jsonData.ISBN);
      setLanguage(jsonData.language);
      setGenre(jsonData.genre);
      setFeaturedCategory(jsonData.featuredCategory);
      setAvailableTypes(jsonData.availableTypes);
      setSellingPrice(jsonData.price);
      setQuantityInStock(jsonData.stock);
      setDescription(jsonData.description);
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

  //update book
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {
        title: bookName,
        author: author,
        ISBN: isbn,
        language: language,
        genre: genre,
        featuredCategory: featuredCategory,
        typesAvailable: availableTypes,
        price: sellingPrice,
        stock: quantityInStock,
        description: description,
      };
      //const response = await axios.patch(updateBookURL, body);

      const response = await fetch(updateBookURL, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(body);
      if (response.ok) {
        console.log("Book updated successfully");
        //setShowSuccessAlert(true);
        onClose();
        window.location.reload('/inventory');
        alert("Book updated successfully")
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

  //view content
  const viewContent = (
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
                  {bookDetails.language ? bookDetails.language : "No record"}
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
  );

  //edit content
  const editContent = (
    <ModalContent maxWidth={"xl"}>
      <form onSubmit={onSubmitForm}>
        <ModalHeader>Edit Book Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {showSuccessAlert && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              Book updated successfully!
            </Alert>
          )}
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
                <FormLabel fontWeight={"semibold"}>Featured Category</FormLabel>
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
                <FormLabel fontWeight={"semibold"}>Available Types</FormLabel>
                <CheckboxGroup value={availableTypes}>
                  <Stack direction="row" spacing={10}>
                    <Checkbox
                      value="Hardcover"
                      onChange={(e) => handleCheckboxChange("Hardcover")}
                    >
                      Hardcover
                    </Checkbox>
                    <Checkbox
                      value="Paperback"
                      onChange={(e) => handleCheckboxChange("Paperback")}
                    >
                      Paperback
                    </Checkbox>
                  </Stack>
                </CheckboxGroup>
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
                <FormLabel fontWeight={"semibold"}>Quantity in Stock</FormLabel>
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
          <Button colorScheme="gray" color={"black"} mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </ModalContent>
  );

  return (
    <>
      <Td>
        <HStack>
          <Box bgColor={"green.500"} pt={1} px={1} borderRadius={4}>
            <Icon
              as={BiSolidDetail}
              onClick={() => {
                SetContent("viewContent");
                onOpen();
              }}
              fontSize={"md"}
              color={"white"}
            />
          </Box>
          <Box bgColor={"blue.600"} pt={1} px={1} borderRadius={4}>
            <Icon
              as={AiFillEdit}
              onClick={() => {
                SetContent("editContent");
                onOpen();
              }}
              fontSize={"md"}
              color={"white"}
            />
          </Box>
          <Box bgColor={"red.500"} pt={1} px={1} borderRadius={4}>
            <Icon
              as={AiFillDelete}
              onClick={deleteBook}
              fontSize={"md"}
              color={"white"}
            />
          </Box>
        </HStack>
      </Td>

      {/* View book details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {content === "viewContent" ? viewContent : editContent}
      </Modal>
    </>
  );
}
