import React from 'react'
import { Link } from 'react-router-dom';
import AdminSidebar from "../../components/Admin/AdminSidebar";
import jsPDF from 'jspdf';
import "jspdf-autotable";

import {
    Box, 
    Button, 
    Flex,
    Text,
    Stack,
    Center
} from '@chakra-ui/react'

export default function AdminReports() {

    
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

  <Flex
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"} 
      flexWrap={"wrap"}
    >  

  
 </Flex>


    <Box>

    <Text mb={10} align={'center'} fontSize="lg" fontWeight={"bold"}>
                  Select Report Type
                </Text>

                <Stack spacing={4} width={400}>

                <Link to="/adminuserreport">
                <Button ml={270} w={300} colorScheme='blue'>User Details</Button>
                </Link>
                
                <Link to="/adminorderreport">
                <Button ml={270} w={300} colorScheme='blue'>Order Details</Button>
                </Link>

                <Link to="/admininventoryreports">
                <Button ml={270} w={300}  colorScheme='blue'>Inventory Details</Button>
                </Link>

                <Link to="/admindonationreport">
                <Button ml={270} w={300} colorScheme='blue'>Donations</Button>
                </Link>

                <Link to="/adminsubscriptionreports">
                <Button ml={270} w={300}  colorScheme='blue'>Subscriptions</Button>
                </Link>

                <Link to="/adminsharingreport">
                <Button ml={270} w={300} colorScheme='blue'>Book Sharing</Button>
                </Link>

                </Stack>
    </Box>

 </Box>
 </div>

  </Box>


  )
}
