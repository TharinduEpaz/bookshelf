import React from "react";
import jsPDF from 'jspdf';
import "jspdf-autotable";
import {FaSearch} from 'react-icons/fa'


import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Select,
  IconButton,
  Input,
  InputGroup,
  FormControl
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminDonationReportViewTable from "../../components/Admin/AdminDonationReportViewTable";

export default function AdminDonationReport() {

  const [search, setSearch] = useState('');

  const columns = [
    "ID",
    "Organization Name",
    "Organization Type",
    "Registration No",
    "Contact Number",
    "Address",
    "Email",
    "Account",
    "Contact Person",
    "Contact Person No",
    "Contact Person Email",
    "Contact Person NIC",
    "Description",
    "Approval"
  ];

  const [list, setDonations] = useState([]);

  const getDonations = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/donations")
      const jsonData = await response.json()

      const filteredData = jsonData.map((donations) => ({
        id: donations.id,
        orgName: donations.orgName,
        orgType: donations.orgType,
        orgRegisteredNumber: donations.orgRegisteredNumber,
        orgTelephone: donations.orgTelephone,
        orgAddress: donations.orgAddress,
        orgEmail: donations.orgEmail,
        orgConfirmationDocument: donations.orgConfirmationDocument,
        contactPersonName: donations.contactPersonName,
        contactPersonPhone: donations.contactPersonPhone,
        contactPersonEmail: donations.contactPersonEmail,
        contactPersonNIC: donations.contactPersonNIC,
        description: donations.description,
        approval: donations.approval
      }));
      
      setDonations(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getDonations();
  }, [])



      //Report generation

  // Search Donation Details Report
  const generateSearchPDF = () => {
    const doc = new jsPDF();
    const totalPagesExp = "{total_pages_count_string}";

    const columnsData = [
    "", 
    "ID",
    "Organization Name",
    "Organization Type",
    "Registration No",
    "Contact Number",
    "Address",
    "Email",
    "Account",
    "Contact Person",
    "Contact Person No",
    "Contact Person Email",
    "Contact Person NIC",
    "Description",
    "Approval"
  ];
  
    let donationNumber = 1; // Initialize the book number to 1
  
    //Filter by title
    const filteredList = list.filter((donations) => 
      book.title.toLowerCase().includes(search.toLowerCase()));

    doc.autoTable({
      head: [columnsData], // The header row
      body: filteredList.map((donations) => [
        donationNumber++, 
        donations.orgName,
        donations.orgType,
        donations.orgRegisteredNumber,
        donations.orgTelephone,
        donations.orgAddress,
        donations.orgEmail,
        donations.orgConfirmationDocument,
        donations.contactPersonName,
        donations.contactPersonPhone,
        donations.contactPersonEmail,
        donations.contactPersonNIC,
        donations.description,
        donations.approval
      ]), 
      
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
              Inventory Reports
            </Text>


    <FormControl ml={10} mb={5}>
    <InputGroup>
    <Input
      type="text"
      placeholder="Search By Organization"
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
        ml={1050}
        mt={5}
        colorScheme="blue" 
        //onClick={generateSearchPDF}
        >
          Generate Donation Details
      </Button>



              <Spacer mt={1} />

              <Box>
                {/* <SearchPanel name="Inventory Items" filter="inventory" /> */}

                <Spacer mt={5} />

                <AdminDonationReportViewTable 
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
