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
} from '@chakra-ui/react';
import { MdAddBox, MdDelete } from 'react-icons/md';
import { AiFillExclamationCircle } from 'react-icons/ai';


function Form({ title, image }) {
    const [bookList, setBookList] = useState(['']); // Initial state with one input field

    const handleInputChange = (index, value) => {
        const updatedList = [...bookList];
        updatedList[index] = value;
        setBookList(updatedList);
    };

    const handleAddInput = () => {
        setBookList([...bookList, '']); // Add an empty input field to the list
    };

    const handleDeleteInput = (index) => {
        const updatedList = [...bookList];
        updatedList.splice(index, 1); // Remove the input field at the specified index
        setBookList(updatedList);
    };

    const handleClick = () => {
        alert('Clicked');
    };

    return (
        <div>
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
                <Text mb="8px">Name of the book:</Text>
                <Input type="text" size="sm" marginBottom={5} />

                <Text mb="8px">Picture of the book:</Text>
                <Input type="file" size="m" marginBottom={5} width={250} />

                <Text mb="8px">Details:</Text>
                <Textarea type="text-area" size="sm" marginBottom={5} />

                <Text mb="8px">List of books you would like to have:</Text>
                {bookList.map((book, index) => (
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
                ))}

                <Button colorScheme="purple">Post Request</Button>
                <Button colorScheme="red" marginLeft={200} variant={'outline'}  >cancel</Button>
            </Box>
        </div>
    );
}

export default Form;
