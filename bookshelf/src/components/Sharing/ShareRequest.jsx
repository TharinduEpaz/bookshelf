import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Textarea,
  Input,
  Button,
  useColorModeValue,
  UnorderedList,
  Flex,
  ListItem,
  IconButton,
  ButtonGroup,
  Spinner
} from "@chakra-ui/react";
import { AiFillExclamationCircle } from "react-icons/ai";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";


function ShareRequest({ title, image }) {

  const [bookName, setBookName] = useState("");
  const [userName, setUserName] = useState("");
  const [details, setDetails] = useState("");
  const [listOfBooks, setListOfBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [bookImage, setBookImage] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [checkEligibility, setCheckEligibility] = useState("");

  const handleInputChange = (event) => {
    setNewBook(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (newBook.trim() !== "") {
      setListOfBooks([...listOfBooks, newBook]);
      setNewBook("");
    }
  };

  const handleRemoveButtonClick = (index) => {
    const updatedList = [...listOfBooks];
    updatedList.splice(index, 1);
    setListOfBooks(updatedList);
  };

  const handleImageChange = (files) => {
    if (files && files.length > 0) {
        setBookImage(files[0]);
    }
};


  const userId = "1302e961-a3a8-4c5d-a635-f1d6495c63df";
  const requestUrl = "http://localhost:3000/api/v1/bookSharing/requests";

const ShareRequest = async (e) => {
    e.preventDefault();
    console.log(listOfBooks);
    try {
        setIsLoading(true)
        const formData = new FormData();
        formData.append('bookName', bookName);
        formData.append('userName', userName);
        formData.append('details', details);
        formData.append('userId', userId);
        formData.append('listOfBooks',listOfBooks);
        if (bookImage) {
            formData.append('bookImage', bookImage);
        }
        // listOfBooks.forEach((book, index) => {
        //     formData.append(`listOfBooks[${index}]`, book);
        // });

        const response = await axios.post(requestUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);

        setBookName('');
        setUserName('');
        setDetails('');
        setListOfBooks([]);
        setBookImage(null);

        console.log(response);
        setIsLoading(false);
    } catch (error) {
        console.log(error.response);
    }
};



  return (
    <Box
      bgColor={"white"}
      border={"1px"}
      borderRadius={"10"}
      borderColor={"blue.200"}
      padding={10}
    >
      <Box
        m="auto"
        mt={1}
        h={100}
        boxShadow="sm"
        bg={useColorModeValue("blue.100", "gray.800")}
        p={4}
        display="grid"
        gridTemplateColumns="5% 95%"
      >
        <Box marginTop={2}>
          <AiFillExclamationCircle size={30} color="rgb(49,130,206)" />
        </Box>
        <Box>
          <Text as="b">Important </Text>
          <Text>
            You cannot post a share request unless you bought a book or
            subscription within the last 3 months
          </Text>
        </Box>
      </Box>

      <Box marginTop={10} border={10}>
        <Heading size={"md"} color={"rgb(32,73,116)"} marginBottom={5}>
          Post a Book to Share
        </Heading>
        <form onSubmit={ShareRequest}>
          <Text mb="8px">Name of the book:</Text>
          <Input
            type="text"
            size="sm"
            marginBottom={5}
            onChange={(e) => {
              setBookName(e.target.value);
            }}
            value={bookName}
            required
          />

          <Text mb="8px">Full Name:</Text>
          <Input
            type="text"
            size="sm"
            marginBottom={5}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={userName}
            required
          />

          <Text mb="8px">Picture of the book:</Text>
          <Input
            type="file"
            size="m"
            name="image"
            marginBottom={5}
            width={250}
            onChange={(e) => handleImageChange(e.target.files)}
            required
          />

          <Text mb="8px">Details:</Text>
          <Textarea
            type="text-area"
            size="sm"
            marginBottom={5}
            onChange={(e) => {
              setDetails(e.target.value);
            }}
            value={details}
            required
          />

          <Text mb="8px">List of books you would like to have:</Text>
          <UnorderedList fontWeight={"bold"} mb={10} mt={10}>
            {listOfBooks.map((book, index) => (
              <ListItem key={index}>
                {book}
                <IconButton
                  variant={"ghost"}
                  ml={5}
                  size={"sm"}
                  onClick={() => handleRemoveButtonClick(index)}
                  icon={<RxCross2 />}
                >
                  Remove
                </IconButton>
              </ListItem>
            ))}
          </UnorderedList>

          <Flex alignItems={"center"} gap={10}>
            <Input
              type="text"
              size="sm"
              value={newBook}
              onChange={handleInputChange}
              variant={"filled"}
              borderRadius={10}
              h={10}
            />
            <Button
              onClick={handleAddButtonClick}
              colorScheme="gray"
              borderRadius={10}
            >
              Add
            </Button>
          </Flex>

          
          <ButtonGroup variant='outline' spacing='5' mt={10}>
            <Button colorScheme="red"  variant={"outline"}>
              cancel
            </Button>
            <Button type="submit" colorScheme="purple" variant={'solid'} >
              Post Request {isLoading && <Spinner ml={5}/>}
            </Button>
          </ButtonGroup>
        </form>
      </Box>
    </Box>
  );
}

export default ShareRequest;