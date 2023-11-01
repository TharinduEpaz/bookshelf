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

import {
  BiBookOpen,
} from "react-icons/bi";

import AdminSharingReportViewTable from '../../components/Admin/AdminSharingReportViewTable';
import { useEffect, useState } from "react";

export default function AdminSharingReports() {

  const [search, setSearch] = useState('');

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

  //Get all sharing
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
  const generateSearchPDF = () => {
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
  
    //Filter by Customer Name
    const filteredList = list.filter((sharing) => 
      sharing.userName.toLowerCase().includes(search.toLowerCase()));

    doc.autoTable({
      head: [columnsData], // The header row
      body: filteredList.map((sharing) => [
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
              Book Sharing Reports
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
          Generate Book Sharing Details
      </Button>



          
              <Spacer mt={10} />

              <Box>

                <Spacer mt={5} />

                <AdminSharingReportViewTable 
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

