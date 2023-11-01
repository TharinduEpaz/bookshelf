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
} from '@chakra-ui/react'


import AdminOrderReportViewTable from '../../components/Admin/AdminOrderReportViewTable';
import { useEffect, useState } from "react";

export default function AdminOrderReport() {

  const [search, setSearch] = useState('');

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



    //Report generation

  // Search Order Details Report
 const generateSearchPDF = () => {
  const doc = new jsPDF();
  const totalPagesExp = "{total_pages_count_string}";

  const columnsData = ["Order No", "Date", "Total Price (Rs.)", "Status"];

  let orderNumber = 1;

  //Filter by first name
  const filteredList = list.filter((order) => order.totalPrice.toLocaleString().includes(search.toLocaleString()));

  doc.autoTable({
    head: [columnsData],
    body: filteredList.map((order) => [orderNumber++, order.orderDate, order.totalPrice, order.orderStatus]),
    startY: 20,
    styles: {
      font: "helvetica",
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: 5,
      fillColor: [124, 195, 206],
    },
    columnStyles: {
      0: { cellWidth: 30 },
    },

    didDrawPage: function (data) {
      doc.text(
        "Page " + data.pageCount,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
      doc.setFontSize(10);
    },

    addPageContent: function (data) {
      doc.text(
        "Page " + data.pageCount,
        data.settings.margin.left,
        doc.internal.pageSize.height - 10
      );
    },
  });

  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(180, 10, `Page ${i} of ${totalPages}`);
  }

  doc.save("Order_Details.pdf");
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
             
          <Text fontSize="lg" fontWeight={"bold"} mb={5} mt={2} align={"center"}>
              Order Reports
            </Text>


    <FormControl ml={10} mb={5}>
    <InputGroup>
    <Input
      type="text"
      placeholder="Search By Price"
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
        onClick={generateSearchPDF}
        >
          Generate Order Details
      </Button>

          </Flex>

              <Spacer mt={10} />

              <Box>
                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <AdminOrderReportViewTable 
                  list={list} 
                  columnNames={columns} 
                  search={search}
                  />



              </Box>
            </Box>


    

 </Box>
 </div>

  </Box>


  )
}
