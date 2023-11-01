import React, { useState } from 'react';
import {
  IconButton,
  Input,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useBooksContext } from '../../context/booksContext';

function Search({ onAddBook }) {
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoading, fetchSingleBook, currentBook } = useBooksContext();

  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get('books/getBookNames', {
        withCredentials: true,
      });

      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filterItems = Object.values(results).filter((item) => {
    return item.title.toLowerCase().includes(input.toLowerCase());
  });

  const handleChange = (value) => {
    setInput(value);
    fetchResults();
    setFilteredItems(filterItems);
  };

  const handleResultClick = (id) => {
    onOpen();
    getBookDetails(id);
    setQuantity(1);
  };

  const getBookDetails = async (id) => {
    fetchSingleBook(id);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleGo = () => {
    if (currentBook) {
      const bookDetails = {
        id: selectedBook,
        title: currentBook.title,
        price: currentBook.price,
        quantity: quantity,
        total: currentBook.price * quantity,
      };

      if (typeof onAddBook === 'function') {
        onAddBook(bookDetails);
      }

      onClose();
    }
  };

  return (
    <>
      <Box
        mt={5}
        mb={5}
        w={'80%'}
        borderRadius="2xl"
        background={'rgba(255, 255, 255,0)'}
        bgGradient="linear(to left, rgba(255, 255, 235, 0.2), rgba(255, 255, 255, 0.2)"
        p={2}
        pl={5}
        pb={5}
        display={'flex'}
        alignItems={'center'}
        gap={5}
      >
        <Input
          type="text"
          w={'90%'}
          fontWeight={'extrabold'}
          placeholder="Search thousands of books"
          borderColor={'blue.100'}
          onChange={(e) => handleChange(e.target.value)}
          variant={'flushed'}
          h={'50px'}
        />
        <IconButton
          icon={<Search2Icon />}
          color="blue.400"
          ml={0}
          borderRadius={5}
          w={100}
          h={'50px'}
          bg={'none'}
        />
      </Box>
      <Box
        mt={0}
        w="30%"
        boxShadow="sm"
        background={'rgba(255, 255, 255, 0.7)'}
        borderRadius={10}
        backdropFilter="blur(8px)"
        p={5}
        left={'6%'}
        zIndex={'9999'}
        alignItems={'center'}
        gap={5}
        display={input.length > 0 ? '' : 'none'}
      >
        {filteredItems.slice(0, 10).map((result) => (
          <Box
            key={result.id}
            fontSize={20}
            fontWeight={'medium'}
            onClick={() => handleResultClick(result.id)}
            cursor={'pointer'}
            zIndex={'9999'}
          >
            {result.title}
          </Box>
        ))}
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentBook && (
              <div>
                <Image src={currentBook.image} alt={currentBook.title} />
                <h2>Title: {currentBook.title}</h2>
                <p>Author: {currentBook.author}</p>
                <p>Price: {currentBook.price}</p>
                <div>
                  <p>Quantity Needed: </p>
                  <Button onClick={handleDecreaseQuantity}>-</Button>
                  <span>{quantity}</span>
                  <Button onClick={handleIncreaseQuantity}>+</Button>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleGo}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Search;
