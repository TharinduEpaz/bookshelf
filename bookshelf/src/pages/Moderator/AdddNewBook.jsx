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
} from "@chakra-ui/react";
import SideMenu from "../../components/Moderator/SIdeMenu";
import ImageUploader from "../../components/Moderator/ImageUploader";

export default function Inventry() {
  const [value, setValue] = React.useState("1");

  const [bookName, setBookName] = React.useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { bookName };
      // const response = await fetch("http://localhost:3000/api/v1/books", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(body),
      // });

      const response= await fetch({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      console.log(response);
    } catch (err) {
      console.error(err.message);
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
        bgColor={"white"}
        // bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid templateColumns="repeat(5, 1fr)" gap={2} h={"100%"}>
          <GridItem
            colSpan={1}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <SideMenu />
          </GridItem>
          <GridItem
            colSpan={4}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
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
                        <Input type="text" 
                        placeholder="Name of the Book"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>Author</FormLabel>
                        <Input type="text" placeholder="Author of the Book" />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>ISBN</FormLabel>
                        <Input type="int" placeholder="ISBN of the Book" />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>Language</FormLabel>
                        <Select placeholder="Select the language of the book">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>Genre</FormLabel>
                        <Select placeholder="Select the genre of the book">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>
                          Featured Category
                        </FormLabel>
                        <Select placeholder="Select the category of the book">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                        </Select>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>
                          Available Types
                        </FormLabel>
                        <RadioGroup onChange={setValue} value={value}>
                          <Stack direction="row">
                            <Radio value="1">Paperback</Radio>
                            <Radio value="2">Hardcover</Radio>
                          </Stack>
                        </RadioGroup>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>
                          Selling Price (Rs)
                        </FormLabel>
                        <Input type="text" placeholder="Name of the Book" />
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>
                          Quantity in Stock
                        </FormLabel>
                        <NumberInput>
                          <NumberInputField placeholder="Quantity in Stock" />
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                          </NumberInputStepper>
                        </NumberInput>
                      </FormControl>

                      <FormControl>
                        <FormLabel fontWeight={"semibold"}>
                          Description
                        </FormLabel>
                        <Textarea placeholder="Add a Description about Book" />
                      </FormControl>
                    </Stack>
                  </GridItem>

                  <GridItem colSpan={1}>
                    <Stack spacing={5} mt={10}>
                      <ImageUploader />

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
                        <Button
                          colorScheme="red"
                          variant={"outline"}
                          size={"sm"}
                        >
                          Cancel
                        </Button>
                      </ButtonGroup>
                    </Stack>
                  </GridItem>
                </Grid>
              </form>
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}