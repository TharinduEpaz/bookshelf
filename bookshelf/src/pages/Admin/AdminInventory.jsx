import React from "react";
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

import {
  BiBookOpen,
  BiErrorCircle,
  BiFilterAlt,
  BiPlus,
  BiSearchAlt,
} from "react-icons/bi";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import { Link } from "react-router-dom";
import AdminDtataTable from "../../components/Admin/AdminDtataTable";
import { useEffect, useState } from "react";

//import SearchPanel from "../../components/Moderator/SearchPanel";



export default function AdminInventory() {

  const columns = [
    // "Book ID",
    "Book Name",
    "Author",
    "Genre",
    "Unit Price",
    "In-Stock",
    "ISBN",
    "Description",
    "Average Rating",
    "Language",
    "Featured Category"
  ];


  const [list, setBookList] = useState([]);

  const getBooks = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/books")
      const jsonData = await response.json()

      const filteredData = jsonData.map((book) => ({
        // id: book.id,
        title: book.title,
        author: book.author,
        genre: book.genre,
        unitPrice: book.price,
        inStock: book.stock,
        ISBN:book.ISBN,
        description:book.description,
        averageRating:book.averageRating,
        language:book.language,
        featuredCategory:book.featuredCategory
      }));
      
      setBookList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getBooks();
  }, [])




  // All Inventory Details Report
  const generateTablePDF = () => {
    const doc = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";
  
    const columnsData = [
    "", 
    "Book Name", 
    "Author", 
    "Genre", 
    "Unit Price", 
    //"In-Stock" , 
    "ISBN",
    //"Description",
    //"Average Rating",
    "Language",
    "Featured Category"];
  
    let bookNumber = 1; // Initialize the book number to 1
  
    doc.autoTable({
      head: [columnsData], // The header row
      body: list.map((book) => [
        bookNumber++, 
        book.title, 
        book.author, 
        book.genre, 
        `Rs.${book.unitPrice.toFixed(2)}`, 
        //book.stock,
        book.ISBN,
        //book.description,
        //book.averageRating,
        book.language,
        book.featuredCategory 
      ]), // The data rows with sequential book numbers
      
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
        0: { cellWidth: 8 }, // Adjust the width of the ""Book" Number" column
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
    doc.save("Inventory_Details.pdf");
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
                  Inventory Summary
                </Text>
                <Spacer />
                <Link to="adminaddnewbook">
                  <Button colorScheme="blue" size={"sm"}>
                    <Icon as={BiPlus} />
                    <Text ml={2}>Add a New Book</Text>
                  </Button>
                </Link>
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
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                    <StatGroup gap={200}>
                      <AdminStatCard
                        lable="All Books"
                        value="500"
                      />
                      <AdminStatCard
                        lable="Active"
                        value="480"
                        type="increase"
                        percentage="80"
                      />
                    </StatGroup>
                  </CardBody>
                </Card>
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
                    <Icon as={BiErrorCircle} boxSize={8} color={"#E53E3E"} />
                    <AdminStatCard
                      lable="Low Stock Alert"
                      value="10"
                      type="decrease"
                      percentage="5.05"
                    />
                  </CardBody>
                </Card>
              </Flex>

              <Spacer mt={10} />

              <Box>
                {/* <SearchPanel name="Inventory Items" filter="inventory" /> */}

                <Spacer mt={5} />

                <AdminDtataTable 
                  list={list} 
                  columnNames={columns} />
              </Box>
            </Box>



            <Button 
        mt={18}
        ml={620}
        mb={20}
        colorScheme="blue" 
        onClick={generateTablePDF}
        >
          Generate Inventory Details
      </Button>


 </Box>


 </div>

  </Box>


  );
}
