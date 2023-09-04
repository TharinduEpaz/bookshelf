import React, { useState } from 'react';
import {
    Box,
    Heading,
    Text,
    Textarea,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useColorModeValue,
    UnorderedList,
    Flex,
    ListItem,
    IconButton,
} from '@chakra-ui/react';
import { MdAddBox, MdDelete } from 'react-icons/md';
import { AiFillExclamationCircle } from 'react-icons/ai';
import axios from 'axios'
import { BiCross } from 'react-icons/bi';
import {RxCross2} from 'react-icons/rx'


function ShareRequest({ title, image }) {
    const [bookList, setBookList] = useState(['']); // Initial state with one input field
    const[bookName,setBookName] = useState('');
    const[userName,setUserName] = useState('');
  const[details,setDetails] = useState('');
  
  const [listOfBooks, setListOfBooks] = useState([]);
  const [newBook, setNewBook] = useState('');

  console.log(listOfBooks);

  const handleInputChange = (event) => {
    setNewBook(event.target.value);
  };

  const handleAddButtonClick = () => {
    if (newBook.trim() !== '') {
      setListOfBooks([...listOfBooks, newBook]);
      setNewBook('');
    }
  };

  const handleRemoveButtonClick = (index) => {
    const updatedList = [...listOfBooks];
    updatedList.splice(index, 1);
    setListOfBooks(updatedList);
  };




  const userId ="1302e961-a3a8-4c5d-a635-f1d6495c63df"

  const requestUrl ="http://localhost:3000/api/v1/bookSharing/requests"
  const ShareRequest = async (e) => {
    e.preventDefault();
    try {
   
     const response = await axios.post(requestUrl,{ bookName : bookName, userName: userName, details : details, listOfBooks : listOfBooks, userId: userId});
     console.log(response.data);

     setBookName('');
     setUserName('');
     setDetails('');
     setListofBooks('');
     console.log(response);

    } catch (error) {
    
   console.log(error.response);
    }
 
 }



    // const handleInputChange = (index, value) => {
    //     const updatedList = [...bookList];
    //     updatedList[index] = value;
    //     setBookList(updatedList);
    // };

    // const handleAddInput = () => {
    //     setBookList([...bookList, '']); // Add an empty input field to the list
    // };

    // const handleDeleteInput = (index) => {
    //     const updatedList = [...bookList];
    //     updatedList.splice(index, 1); // Remove the input field at the specified index
    //     setBookList(updatedList);
    // };

    // const handleClick = () => {
    //     alert('Clicked');
    // };

    return (
        <Box bgColor={'white'} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} padding={10}>
            <Box m="auto" mt={1} h={100} boxShadow="sm" bg={useColorModeValue('blue.100', 'gray.800')} p={4} display='grid' gridTemplateColumns="5% 95%" >
                <Box marginTop={2}>
                    <AiFillExclamationCircle size={30} color="rgb(49,130,206)" />
                </Box>
                <Box>
                    <Text as='b'>Important </Text>
                    <Text>
                        You cannot post a share request unless you bought a book or subscription within the last 3 months
                    </Text>
                </Box>
            </Box>

            <Box marginTop={10} border={10}>
                <Heading size={'md'} color={'rgb(32,73,116)'} marginBottom={5}>
                    Post a Book to Share
                </Heading>
                <form onSubmit={ShareRequest}>
                <Text mb="8px">Name of the book:</Text>
                

               
                <Input type="text" size="sm" marginBottom={5} 
                    onChange={(e)=>{setBookName(e.target.value)}}
                    value={bookName}
                    
                />
                 <Text mb="8px">Full Name:</Text>
                 <Input type="text" size="sm" marginBottom={5} 
                    onChange={(e)=>{setUserName(e.target.value)}}
                    value={userName}
                    
                />
                

                <Text mb="8px">Picture of the book:</Text>
                <Input type="file" size="m" marginBottom={5} width={250} />

                <Text mb="8px">Details:</Text>
                <Textarea type="text-area" size="sm" marginBottom={5}
                    onChange={(e)=>{setDetails(e.target.value)}}
                    value={details}
                />

                <Text mb="8px">List of books you would like to have:</Text>
                {/* {bookList.map((book, index) => (
                    <InputGroup key={index} border={10} marginBottom={5}>
                        <Input
                            type="text"
                            size="sm"
                            value={book}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        {index === bookList.length - 1 ? (
                            <InputRightElement h="full">
                                <Button variant={''} size={''} marginTop={0.5} marginLeft={2} onClick={handleAddInput}>
                                    <MdAddBox size={35} />
                                </Button>
                            </InputRightElement>
                        ) : (
                            <InputRightElement h="full">
                                <Button
                                    variant={''}
                                    size={''}
                                    marginTop={0.5}
                                    marginLeft={2}
                                    onClick={() => handleDeleteInput(index)}
                                >
                                    <MdDelete size={32} />
                                </Button>
                            </InputRightElement>
                        )}
                    </InputGroup>
                ))} */}
          
      <UnorderedList fontWeight={'bold'} mb={10} mt={10}>
      {listOfBooks.map((book, index) => (
          <ListItem key={index}>{book}
          <IconButton variant={'ghost'}  ml={5}  size={'sm'}onClick={() => handleRemoveButtonClick(index)} icon={<RxCross2 />}>Remove</IconButton>
          </ListItem>
          
        ))}
      </UnorderedList>

      <Flex alignItems={'center'} gap={10}>

<Input
        type="text"
        size="sm"
        value={newBook}
        onChange={handleInputChange}
        variant={'filled'}
        borderRadius={10}
        h={10}

      />
      

      <Button onClick={handleAddButtonClick} colorScheme='gray' borderRadius={10} >Add</Button>

        </Flex>
                <Box marginTop={10}>
                <Button colorScheme="red" marginLeft={12}  variant={'outline'}  >cancel</Button>
                <Button colorScheme="purple" marginLeft={620} type='submit'>Post Request</Button>
                </Box>
          
                </form>
            </Box>
        </Box>
    );
}

export default ShareRequest;