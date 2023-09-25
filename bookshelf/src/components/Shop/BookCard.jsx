import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Heading,
  } from '@chakra-ui/react';
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
  import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
  
  const data = {
    isNew: true,
    imageURL:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    
  };
  
  function Rating({ rating, numReviews }) {
    return (
      <Box display="flex" alignItems="center" justifyContent={'center'}>
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                color={'#D69E2E'}
                  key={i}
                  style={{ marginLeft: '1' }}
                  
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} color={'#D69E2E'} style={{ marginLeft: '1' }} />;
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} color={'#D69E2E'} />;
          })}
        
      </Box>
    );
  }
  
  function BookCard({name, author, price,imageURL, rating,id}) {
    return (
      <Flex  alignItems="center" justifyContent="center">
      
        <Box
          bg={useColorModeValue('rgba(2,2,2,0)', 'gray.800')}
          
         maxW={'200px'}
         h={'400px'}
          borderWidth="1px"
          rounded="lg"
          shadow={'sm'}
        
          position="relative">
          {data.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          )}
  
          <Image
            src={imageURL}
            alt={`Picture of ${name}`}
            roundedTop="lg"
            boxSize={'200px'}
            objectFit='scale-down'
            
           
          />
  
          <Box p="6">
        
            <Flex mt="1" justifyContent="center" alignContent="center">
              <Box
                fontSize="sm"
                fontWeight="light"
               
                lineHeight="tight"
                >
                <Heading size={'sm'}>{name}</Heading>
                 by {author}
              </Box>
              
            </Flex>
  
            <Flex  alignContent="center" direction={'column'} mt={2}>
              <Rating rating={rating} />
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'gray.600'} fontSize="lg" justifyContent={'center'} display={'flex'} mt={'2'}>
                  Rs. {price}
                </Box>
                
              </Box>
            </Flex>
          </Box>
        </Box>
        
      </Flex>
    );
  }
  
  export default BookCard;