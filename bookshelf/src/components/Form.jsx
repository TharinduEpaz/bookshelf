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
    WrapItem,
    Avatar,
} from '@chakra-ui/react';
import { MdAddBox, MdDelete } from 'react-icons/md';
import { AiFillExclamationCircle } from 'react-icons/ai';
import { Link as RouterLink } from "react-router-dom";


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
        <Box m="auto" mt={10} w={1800} h={800} boxShadow="sm" backgroundColor="white" p={4}>
            <Box display="grid" gridTemplateColumns="20% 80%" gridGap={5}>
                <Box border={'1px'} borderRadius={'10'} borderColor={'rgb(32,73,116)'}>
                    <WrapItem>
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size={'xl'}  marginTop={'8'} marginLeft={'120'}/>
                    </WrapItem>
                    <Text textAlign={'center'} color={'rgb(32,73,116)' } fontSize={'2xl'}>Hasindu sudeepana </Text>
                    <Heading textAlign={'center'} marginTop={'15'}> 
                        <Text as='b' color={'rgb(32,73,116)'} fontSize={'2xl'} >Book Sharing</Text>
                    </Heading>
                    <RouterLink to="#">
                        <Text as='b' fontSize={'2xl'}  marginTop={'-500'}>Post Share Request</Text>                        
                    </RouterLink>
                    <RouterLink to="#">
                        <Text fontSize={'2xl'} lineHeight={'10'} >View Other Request</Text>
                    </RouterLink>
                    <RouterLink to="#">
                        <Text fontSize={'2xl'} lineHeight={'10'}>Manage Your Request</Text>
                    </RouterLink>
                    <RouterLink to="#">
                        <Text fontSize={'2xl'} lineHeight={'10'}>Chat</Text>
                    </RouterLink>

                </Box>
                <Box width={'80%'} border={'1px'} borderRadius={'10'} borderColor={'rgb(32,73,116)'} marginLeft={100} padding={'10'}>
                    {/* Add your content for the second column */}

                    <Box m="auto" mt={5} h={100} boxShadow="sm" bg={useColorModeValue('blue.100', 'gray.800')} p={4} display='grid' gridTemplateColumns="5% 95%" >
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
                        <Input type="file" size="m" marginBottom={5} width={250}/>

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
                        <Button colorScheme="purple" marginLeft={+500}>cancel</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Form;
