import React from 'react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import jsPDF from 'jspdf';
import "jspdf-autotable";

import {
    Box, 
    Flex,
    Card,
    CardBody,
    Icon,
    Spacer,
    Text,
    StatGroup,
    Select,
    Button
} from '@chakra-ui/react'

import {
  BiBookOpen,
} from "react-icons/bi";

//import { Link } from "react-router-dom";
//import DateFilter from "../../components/Moderator/DateFilter";
//import SearchPanel from "../../components/Moderator/SearchPanel";
import AdminStatCard from '../../components/Admin/AdminStatCard';
import AdminDtataTable from '../../components/Admin/AdminDtataTable';
import { useEffect, useState } from "react";

export default function AdminOrderReport() {

  const columns = [
    "Order ID",
    "Date",
    "Total Price (Rs.)",
    "Status",
    //"Buyer Id",
  ];


  const [list, setOrderList] = useState([]);

  const getOrders = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/orders")
      const jsonData = await response.json()

      const filteredData = jsonData.map((order) => ({
        id: order.id,
        orderDate: new Date(order.orderDate).toLocaleDateString(),
        totalPrice: order.totalPrice.toLocaleString(),
        orderStatus: order.orderStatus,
        //buyer_id: order.buyer_id
      }));
      
      setOrderList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getOrders();
  }, [])





  


  return (
   
    <Box
    m={"auto"}
    mt={10}
    w="100%"
    h="100%"
    minH={800}
    borderColor={'rgba(0, 0, 0, 0.20)'}
    borderWidth={'0.5px'}
    borderRadius="6px"
    bg='rgba(255, 255, 255, 0.90)'
    boxShadow="sm"
    bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
    // filter="blur(8px)"
    backdropFilter="blur(14.5px)"
    p={8}
    alignItems={"Center"}
    justifyContent={"Center"}
>



  <div>
  <Box
      borderColor={'rgba(0, 0, 0, 0.20)'}
      borderWidth={'0.5px'}
      borderRadius={'10px'}
      h="100%"
      w="95%"
      ml={35}
      mt={1}
      mb={40}
    >

  <Flex
      gap={5}
      alignItems={"center"}
      justifyContent={"center"}
      w={"100%"} 
      flexWrap={"wrap"}
    >  

 </Flex>

          <Box p={10}>
             
          <Text fontSize="lg" fontWeight={"bold"} mb={10} mt={2} align={"center"}>
              Order Reports
            </Text>


          <Flex gap={3} alignItems={'center'}>


          <Text width={200} mt={5} ml={20}>Select By</Text>

          <Select 
            placeholder='All' 
            w={'200px'} 
            size={'sm'} 
            borderRadius={5} 
            borderColor={'gray.200'} 
            focusBorderColor={'white.100'}
            pl={2}
            ml={2}
            mt={5}
            //onChange={(e) => setSelectedRole(e.target.value)} 
            //value={selectedRole}
           >
              <option value='buyer'>Date</option>
              <option value='moderator'>Price</option>
              <option value='moderator'>Status</option>
        
          </Select>
          

          <Button 
        ml={600}
        mt={5}
        colorScheme="blue" 
        //onClick={generateTablePDF}
        >
          Generate Order Details
      </Button>

          </Flex>

              <Spacer mt={10} />

              <Box>
                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <AdminDtataTable list={list} columnNames={columns} />



              </Box>
            </Box>


    

 </Box>
 </div>

  </Box>


  )
}
