import React from 'react'
import jsPDF from 'jspdf';
import "jspdf-autotable";
import {FaSearch} from 'react-icons/fa'

import {
  Box, 
    Flex,
    Spacer,
    Text,
    Select,
    Button,
    IconButton,
    Input,
    InputGroup,
    FormControl
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";


import { BiBookOpen } from "react-icons/bi";

import SubscriptionReportTableView from '../../components/Admin/SubscriptionReportTableView';

export default function AdminSubscriptionReports() {
  
  const [search, setSearch] = useState('');

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


        //Report Generation

    // All Subscription Details Report
  const generateSearchPDF = () => {
    const doc = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";
  
    const columnsData = [
    "", 
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
  
    let subNumber = 1; // Initialize the number to 1
  
    //Filter by Customer Name
    const filteredList = list.filter((sub) => 
    sub.orderStatus.toLowerCase().includes(search.toLowerCase()));

    doc.autoTable({
      head: [columnsData], // The header row
      body: filteredList.map((sub) => [
        subNumber++,
        sub.orderDate,
        sub.orderStatus,
        sub.totalPrice,
        sub.user_id,
        sub.isPaid,
      ]), // The data rows with sequential sharing numbers
      
      startY: 20, // Y-position to start the table
      styles: {
        // Style the table
        font: "helvetica",
        fontStyle: "bold",
        fontSize: 8,
        cellPadding: 3,
        fillColor: [124, 195, 206], // Light blue background color
      },
      columnStyles: {
        0: { cellWidth: 8 }, 
      },
  
      didDrawPage: function (data) {
        // Add page number at the bottom
        doc.text(
          "Page " + data.pageCount,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
        doc.setFontSize(10);
      },
  
      addPageContent: function (data) {
        // Add total pages count to the header
        doc.text(
          "Page " + data.pageCount,
          data.settings.margin.left,
          doc.internal.pageSize.height - 10
        );
        // doc.text("Total Pages: " + totalPagesExp, 100, 10);
      },
    });
  
    // Calculate total pages
    const totalPages = doc.internal.getNumberOfPages();
    // Set the total pages count on each page
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(180, 10, `Page ${i} of ${totalPages}`);
    }
  
    // Save the PDF with a name
    doc.save("Subscription_Details.pdf");
  };





 
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
              Subscription Reports
            </Text>



         

            <FormControl ml={10} mb={5}>
    <InputGroup>
    <Input
      type="text"
      placeholder="Search Customer Name"
      colorScheme="blue"
      borderColor={'gray.200'}
      focusBorderColor={'white.100'}
      mt={5}
      ml={100}    
      w={900}
      borderRadius={5}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      
    />
    <IconButton icon={<FaSearch />} color="blue.300" mt={5} ml={2} borderRadius={100} variant={'ghost'} />
  </InputGroup>
  </FormControl>


         
          <Button 
        ml={1000}
        mt={5}
        colorScheme="blue" 
        onClick={generateSearchPDF}
        >
          Generate Subscription Details
      </Button>


    


            <Spacer mt={10} />

            <Box>
              {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}
              <Spacer mt={5} />
              <SubscriptionReportTableView 
                list={list} 
                columnNames={columns} 
                search={search}

                />
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
