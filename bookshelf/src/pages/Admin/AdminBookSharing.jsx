import React from 'react'
import jsPDF from 'jspdf';
import "jspdf-autotable";
import AdminSidebar from "../../components/Admin/AdminSidebar";

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

import { Link } from "react-router-dom";
import AdminStatCard from '../../components/Admin/AdminStatCard';
import AdminDtataTable from '../../components/Admin/AdminDtataTable';
import { useEffect, useState } from "react";

export default function AdminBookSharing() {


  const columns = [
    "Sharing ID",
    "Customer Name",
    "Customer Id",
    "Book",
    //"Image",
    "Details",
    "Sharing List",
  ];

  const [list, setSharingList] = useState([]);

  const getSharing = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/bookSharing")
      const jsonData = await response.json()

      const filteredData = jsonData.map((share) => ({
        id: share.id,
        userName: share.userName,
        userId: share.userId,
        bookName: share.bookName,
        //image: share.image,
        details: share.details,
        listOfBooks: share.listOfBooks
        // listOfBooks: share.listOfBooks.map(book => book.slice(1, -1)).join(',')
      }));
      setSharingList(filteredData);

    } catch (error) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getSharing();
  },
  [])


    //Report Generation

    // All Sharing Details Report
  const generateTablePDF = () => {
    const doc = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";
  
    const columnsData = [
    "", 
    "Customer Name",
    "Customer Id",
    "Book",
    //"Image",
    "Details",
    "Sharing List",
  ];
  
    let sharingNumber = 1; // Initialize the sharing number to 1
  
    doc.autoTable({
      head: [columnsData], // The header row
      body: list.map((sharing) => [
        sharingNumber++, 
        sharing.userName,
        sharing.userId,
        sharing.bookName,
        sharing.details,
        sharing.listOfBooks
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
    doc.save("Book_Sharing_Details.pdf");
  };



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
              <Flex>
                <Text fontSize="lg" fontWeight={"bold"}>
                  Book Sharing
                </Text>
              </Flex>

              <Flex gap={20}>
                <Card
                  mt={5}
                  p={5}
                  pl={10}
                  pr={10}
                  boxShadow="sm"
                  borderRadius="md"
                  bgColor={"#EDF2F7"}
                  w={"fit-content"}
                >
                  <CardBody>
                    <Flex
                      justifyContent={"space-between"}
                    >
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                      <Select width={"100px"}>
                        <option value="option1">All</option>
                        <option value="option2">This week</option>
                        <option value="option2">This Month</option>
                      </Select>
                    </Flex>
                    <StatGroup gap={100}>
                      <AdminStatCard lable="All Sharing Requests" value="100" />
                      <AdminStatCard
                        lable="Pending"
                        value="20"
                        type="increase"
                        percentage="80"
                      />
                      <AdminStatCard
                        lable="Accepted"
                        value="70"
                        type="increase"
                        percentage="80"
                      />
                      <AdminStatCard
                        color={"red"}
                        lable="Canceled"
                        value="0"
                        type="increase"
                        percentage="80"
                      />
                    </StatGroup>
                  </CardBody>
                </Card>
              </Flex>

              <Spacer mt={10} />

              <Box>
                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <Text fontSize="lg" fontWeight={"bold"} mb={2}>
                  Book Sharing Details
                </Text>
                <AdminDtataTable list={list} columnNames={columns} />

              </Box>
            </Box>

      <Button 
        mt={18}
        ml={520}
        mb={20}
        colorScheme="blue" 
        onClick={generateTablePDF}
        >
          Generate Book Sharing Details
      </Button>


 </Box>
 </div>

  </Box>


  )
}

