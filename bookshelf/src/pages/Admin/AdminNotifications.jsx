import React from 'react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminNotificationsTable from '../../components/Admin/AdminNotificationsTable';
import { useEffect, useState } from "react";
import {FaSearch} from 'react-icons/fa'


import {
    Box, 
    Flex,
    Heading,
    FormControl,
    IconButton,
    Input,
    InputGroup
} from '@chakra-ui/react'

export default function AdminNotifications() {

  const [search, setSearch] = useState('');

  const columns = [
    "ID",
    "User ID",
    "Type",
    "Notification",
    "Status"
  ];


  const [list, setNotification] = useState([]);

  const getNotification = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/notifications")
      const jsonData = await response.json()

      const filteredData = jsonData.map((notification) => ({
        id: notification.id,
        userId: notification.userId,
        type: notification.type,
        message: notification.message,
        status: notification.status

      }));
      
      setNotification(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getNotification();
  }, [])



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
        ml={250}
      >
        Notifications
      </Heading>

      <FormControl ml={10} mb={5}>
    <InputGroup>
    <Input
      type="text"
      placeholder="Search By Type"
      colorScheme="blue"
      borderColor={'gray.200'}
      focusBorderColor={'white.100'}
      mt={5}
      ml={20}    
      w={500}
      borderRadius={5}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      
    />
    <IconButton icon={<FaSearch />} color="blue.300" mt={5} ml={2} borderRadius={100} variant={'ghost'} />
  </InputGroup>
  </FormControl>


      {/* <Stack spacing={4}>

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
</Stack> */}



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
   
       <AdminNotificationsTable
        list={list} 
        columnNames={columns} 
        search={search}
       /> 



      </Box>


 </Box>
 </div>

  </Box>

  )
}
