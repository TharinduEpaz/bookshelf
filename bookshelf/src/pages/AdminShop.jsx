import React from 'react'
import AdminSidebar from "../components/Admin/AdminSidebar";

import {
    Box, 
    Flex
} from '@chakra-ui/react'


export default function AdminShop() {
  return (
    
    <Box
    m={"auto"}
    mt={10}
    w="80%"
    h="100vh"
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

 </Box>
 </div>

  </Box>

  )
}
