import React from 'react'
import { useDisclosure } from '@chakra-ui/react'; 
import jsPDF from 'jspdf';
import "jspdf-autotable";
import {FaSearch} from 'react-icons/fa'


import { 
    Checkbox, 
    Flex, 
    Select,
    Spacer,
    Text,
    Box,
    Button,
    IconButton,
    Input,
    InputGroup,
    FormControl
} from '@chakra-ui/react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminUsersReportViewTable from '../../components/Admin/AdminUsersReportViewTable';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AdminUserReport() {

  const [search, setSearch] = useState('');
  
  const columns = [
    "User ID",
    "First Name",
    "Last Name",
    "Email",
    "User Type",
  ];

  const [list, setUsersList] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');
  
 
  
 //Get all users
async function getAllUsers(role) {
  try {
    let url = "http://localhost:3000/api/v1/users/";
    if (role !== 'All') {
      url += `?role=${role}`;
    }

    const response = await fetch(url);
    const jsonData = await response.json();

    console.log('Filtered Data:', jsonData); 

    const filteredData = jsonData.map((users) => ({
      id: users.id,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      role: users.role,
    }));

    console.log('Filtered Users:', filteredData); 

    setUsersList(filteredData);
  } catch (err) {
    console.error(err.message);
  }
}

  useEffect(() => {
    getAllUsers(selectedRole); 
  }, [selectedRole]);



  //Report generation

  // Search User Details Report
 const generateSearchPDF = () => {
  const doc = new jsPDF();
  const totalPagesExp = "{total_pages_count_string}";

  const columnsData = ["User No", "First Name", "Last Name", "Email", "User Type"];

  let userNumber = 1;

  //Filter by first name
  const filteredList = list.filter((user) => user.firstName.toLowerCase().includes(search.toLowerCase()));

  doc.autoTable({
    head: [columnsData],
    body: filteredList.map((user) => [userNumber++, user.firstName, user.lastName, user.email, user.role]),
    startY: 20,
    styles: {
      font: "helvetica",
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: 5,
      fillColor: [124, 195, 206],
    },
    columnStyles: {
      0: { cellWidth: 20 },
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

  doc.save("User_Details.pdf");
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
              User Reports
            </Text>
             

 <FormControl ml={10} mb={5}>
    <InputGroup>
    <Input
      type="text"
      placeholder="Search User"
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
            placeholder='First Name' 
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
              <option value='buyer'>A-Z</option>
              <option value='moderator'>Z-A</option>
        
          </Select>


          <Select 
            placeholder='Last Name' 
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
              <option value='buyer'>A-Z</option>
              <option value='moderator'>Z-A</option>
        
          </Select>


          <Select 
            placeholder='User Type' 
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
              <option value='buyer'>All</option>
              <option value='moderator'>Moderators</option>
              <option value='moderator'>Buyers</option>
        
          </Select>


          <Button
            ml={100}
            mt={5}
            colorScheme="blue"
            onClick={generateSearchPDF} 
          >
            Generate User Details
          </Button>

  


          </Flex>


    <Box>

                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <AdminUsersReportViewTable
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











 
   


 
 