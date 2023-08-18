import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Text,
  Card,
  CardHeader, 
  CardBody,
} from '@chakra-ui/react'

import SelectMonth from './SelectMonth';

function AdminDbSummary({ title, text, image }) {
  return (

    <Card 
      w={270}
      h={180}
      bg={'var(--gray-100, #EDF2F7)'} 
      borderRadius={'8px'} 
      boxShadow={'0px 4px 10px 0px rgba(33, 78, 238, 0.25)'}
    >

    <CardHeader>
   
      <Flex>
        {image}
        <SelectMonth/>
      </Flex>
     

  <Heading 
        fontSize={'16px'} 
        color={'#000'} 
        fontFamily={'Montserrat'} 
        fontStyle={'normal'} 
        fontWeight={'500'} 
        lineHeight={'normal'}
        textAlign={'center'}
        mt={'18px'}
        mb={'0'}
      >
         {title}
      </Heading>
  
    </CardHeader>
  
    <CardBody>
      <Text
        fontSize={'34px'} 
        color={'#000'} 
        fontFamily={'Montserrat'} 
        fontStyle={'normal'} 
        fontWeight={'600'} 
        lineHeight={'0.1'}
        textAlign={'center'}
        mt={'0'}
      >
        {text}
      </Text>
    </CardBody>
  
  </Card>

  );
}

export default AdminDbSummary;