import React from "react";
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
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Stack,
  ButtonGroup,
  RadioGroup,
  Radio,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";
import SideMenu from "../../components/Moderator/SIdeMenu";
import ImageUploader from "../../components/Moderator/ImageUploader";

export default function Inventry() {
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
  const [fileName, setFileName] = React.useState("");
  // const [coverImgURL, setCoverImgURL] = React.useState("");

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
        bookName,
        author,
        isbn,
        language,
        genre,
        featuredCategory,
        availableTypes,
        sellingPrice,
        quantityInStock,
        description,
        fileName,
      };
      // const response = await fetch("http://localhost:3000/api/v1/books", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });

      console.log(body);
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
                  <Input
                    type="int"
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
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel fontWeight={"semibold"}>Genre</FormLabel>
                  <Select
                    placeholder="Select the genre of the book"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
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
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
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
                    type="int"
                    placeholder="Price of the Book"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                  />
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
                <ImageUploader onImageUpload={setFileName} />

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
