import React from 'react';
import {
  Container,
  Text,
  VStack,
  Box,
  Avatar,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { FaQuoteRight } from 'react-icons/fa';

const testimonial = {
  username: 'Ben Parker',
  position: 'CEO',
  company: 'Foodtesla',
  image:
    'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&auto=format&fit=crop&w=334&q=80',
  content: `Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit
    rhoncus. Accusantium quam, ultricies eget id, aliquam eget nibh et. Maecen aliquam,
    risus at semper`
};

const AboutAuthor = () => {
  return (
    <Container maxW="2xl" p={5}>
      <VStack spacing={3}>
        <Icon
          as={FaQuoteRight}
          w={8}
          h={8}
          color={useColorModeValue('gray.600', 'gray.300')}
          zIndex={5}
        />
        <Text p={5} color={useColorModeValue('gray.600', 'gray.300')} zIndex={5}>
          {testimonial.content}
        </Text>
        <VStack alignItems="center">
          <Avatar name="avatar" src={testimonial.image} size="lg" />
          <Box textAlign="center">
            <Text fontWeight="bold" fontSize="lg">
              {testimonial.username}
            </Text>
            <Text fontSize="md" color="gray.500">
              {testimonial.position} at {testimonial.company}
            </Text>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};



export default AboutAuthor;
