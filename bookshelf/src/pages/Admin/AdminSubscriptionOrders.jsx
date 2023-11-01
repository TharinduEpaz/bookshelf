import React, { useRef } from "react";
import jsPDF from 'jspdf';
import "jspdf-autotable";

import {
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spacer,
  Text,
  StatGroup,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";
import SearchBar from '../../components/Admin/SearchBar';


import AdminDtataTable from "../../components/Admin/AdminDtataTable";

export default function AdminSubscriptionOrders() {
  

  // Subscriptions
  const columns = [
    "Subscription Id",
    "Date",
    "Status",
    "Price",
    "Customer Id",
    "isPaid",
    // "Order Items",
    // "Adress",
    "Contact No"
  ];

  const [list, setSubList] = useState([]);

  const getSub= async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/subscriptionOrders")
      const jsonData = await response.json()

      const filteredData = jsonData.map((sub) => ({
        id: sub.id,
        orderDate: sub.orderDate,
        orderStatus: sub.orderStatus,
        totalPrice: sub.totalPrice,
        user_id: sub.user_id,
        isPaid: sub.isPaid,
        // orderItems: sub.orderItems,
        // address: sub.address,
        phone: sub.phone
      }));
      
      setSubList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getSub();
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


    <Flex gap={10} alignItems={'center'}>

    <SearchBar/>
     
    </Flex>
    
      
            {/* Table2: Subscription Details Table */}
            <Box>
              <Spacer mt={5} />
              <AdminDtataTable 
                list={list} 
                columnNames={columns} 
                />
            </Box>
          </Box>
      
    



   
  );
}
