import React from 'react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNotificationsTable from '../../components/Admin/AdminNotificationsTable';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import {
    Box, 
    Flex,
    Heading,
    Text,
    Stack
} from '@chakra-ui/react'

export default function AdminNotifications() {
  return (
    
    <Box
    m={"auto"}
    mt={10}
    w="80%"
    h="100%"
    minH={800}
    borderRadius="6px"
    bg='rgba(255, 255, 255, 0.90)'
    boxShadow="sm"
    bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
    // filter="blur(8px)"
    backdropFilter="blur(14.5px)"
    p={4}

  >

  <AdminSidebar />

  <div>
    <Box
      borderColor={'rgba(0, 0, 0, 0.20)'}
      borderWidth={'0.5px'}
      borderRadius={'10px'}
      h="100%"
      w="76%"
      ml={270}
      mt={1}
      p={5}
    >

<Heading
        fontSize={'20px'} 
        color={'#000'} 
        fontFamily={'Montserrat'} 
        fontStyle={'normal'} 
        fontWeight={'800'} 
        lineHeight={'normal'}
        //textAlign={'center'}
        mt={'10px'}
        mb={'20px'}
      >
        Notifications
      </Heading>


      <Stack spacing={4}>

  < Card variant="filled" size={'sm'} h={10}>
    <CardBody>
      <Text fontSize="md" color="black.500">
        12 new orders to checkout
      </Text>
    </CardBody>
  </Card>

  < Card variant="filled" size={'sm'} h={10}>
    <CardBody>
      <Text fontSize="md" color="black.500">
        23 new subscription requests 
      </Text>
    </CardBody>
  </Card>

  < Card variant="filled" size={'sm'} h={10}>
    <CardBody>
      <Text fontSize="md" color="black.500">
        14 new donation requests 
      </Text>
    </CardBody>
  </Card>


  < Card variant="filled" size={'sm'} h={10}>
    <CardBody>
      <Text fontSize="md" color="black.500">
        45 new sharing requests 
      </Text>
    </CardBody>
  </Card>
</Stack>



  <Flex
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"} 
      flexWrap={"wrap"}
    >  

 </Flex>

 <Box
         borderColor={'rgba(0, 0, 0, 0.20)'}
         borderWidth={'0.5px'}
         borderRadius={'10px'}
         h="50vh"
         w="100%"
         mt={10}
         mr={5}
         p={10}
      >
   
       <AdminNotificationsTable/> 



      </Box>


 </Box>
 </div>

  </Box>

  )
}
