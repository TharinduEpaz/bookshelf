import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Text,
  Input,
  Select,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  Textarea,
  Stack,
  ButtonGroup,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import ImageUploader from "../../components/Moderator/ImageUploader";

export default function AddNewBook() {
  const [value, setValue] = React.useState("1");

  const [bookName, setBookName] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [isbn, setIsbn] = React.useState("");
  const [language, setLanguage] = React.useState("");
  const [genre, setGenre] = React.useState("");
  const [featuredCategory, setFeaturedCategory] = React.useState("");
  const [availableTypes, setSelectedTypes] = React.useState([]);
  const [sellingPrice, setSellingPrice] = React.useState("");
  const [quantityInStock, setQuantityInStock] = React.useState("1");
  const [description, setDescription] = React.useState("");
  // const [fileName, setFileName] = React.useState("");
  // const [coverImgURL, setCoverImgURL] = React.useState("");

  const [image, setImage] = useState(null);

  const addBookURL = "http://localhost:3000/api/v1/books";

  //Check box
  const handleCheckboxChange = (value) => {
    if (availableTypes.includes(value)) {
      setSelectedTypes(availableTypes.filter((type) => type !== value));
    } else {
      setSelectedTypes([...availableTypes, value]);
    }
  };

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
        averageRating: 0,
        //image,
        // fileName,
      };
      const response = await axios.post(addBookURL, body);

      console.log(body);
      // set variables null
      setBookName("");
      setAuthor("");
      setIsbn("");
      setLanguage("");
      setGenre("");
      setFeaturedCategory("");
      setSelectedTypes([]);
      setSellingPrice("");
      setQuantityInStock("");
      setDescription("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Box p={10}>
        <Text fontSize={"3xl"} fontWeight={"bold"}>
          Add New Book
        </Text>

        <form onSubmit={onSubmitForm}>
          <Grid templateColumns="repeat(2, 1fr)" gap={200} h={"100%"}>
            <GridItem colSpan={1}>
              <Stack spacing={5} mt={10}>
                <FormControl>
                  <FormLabel fontWeight={"semibold"}>
                    Name of the Book
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Name of the Book"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight={"semibold"}>Author</FormLabel>
                  <Input
                    type="text"
                    placeholder="Author of the Book"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight={"semibold"}>ISBN</FormLabel>
                  <NumberInput>
                    <NumberInputField
                      placeholder="ISBN of the Book"
                      value={isbn}
                      onChange={(e) => setIsbn(e.target.value)}
                    />
                  </NumberInput>
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
                  <FormLabel fontWeight={"semibold"}>Genre</FormLabel>
                  <Select
                    placeholder="Select the genre of the book"
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
                    placeholder="Select the category of the book"
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
                  <NumberInput>
                    <NumberInputField
                      placeholder="Price of the Book"
                      value={sellingPrice}
                      onChange={(e) => setSellingPrice(e.target.value)}
                    />
                  </NumberInput>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight={"semibold"}>
                    Quantity in Stock
                  </FormLabel>
                  <NumberInput>
                    <NumberInputField
                      placeholder="Quantity in Stock"
                      value={quantityInStock}
                      onChange={(e) => setQuantityInStock(e.target.value)}
                    />
                    {/* <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper> */}
                  </NumberInput>
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
            </GridItem>

            <GridItem colSpan={1}>
              <Stack spacing={5} mt={10}>
                <ImageUploader onImageUpload={setImage} />

                {/* <FormControl bgColor={"#F4F5FA"} p={7} borderRadius={20}>
                      <Center flexDir={"column"}>
                        <Icon
                          as={BiSolidImageAdd}
                          w={10}
                          h={10}
                          color={"#5570F1"}
                        />
                        <FormLabel>Additional Images</FormLabel>
                        <Input type="file" accept="image/*" />
                      </Center>
                    </FormControl> */}

                <ButtonGroup justifyContent={"flex-end"}>
                  <Button type="sumbit" colorScheme="blue" size={"sm"}>
                    Add
                  </Button>
                  <Button colorScheme="red" variant={"outline"} size={"sm"}>
                    Cancel
                  </Button>
                </ButtonGroup>
              </Stack>
            </GridItem>
          </Grid>
        </form>
      </Box>
    </>
  );
}
