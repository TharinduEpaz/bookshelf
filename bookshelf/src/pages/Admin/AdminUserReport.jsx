import React from 'react'
import { useDisclosure } from '@chakra-ui/react'; 
import SearchBar from '../../components/Admin/SearchBar';
import { Alert, AlertIcon } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import "jspdf-autotable";


import { 
    Checkbox, 
    Flex, 
    Select,
    Spacer,
    Text,
    Box,
    Center,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input 
} from '@chakra-ui/react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminUsersTable from '../../components/Admin/AdminUsersTable';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AdminUserReport() {

  
  const columns = [
    "User ID",
    "First Name",
    "Last Name",
    "Email",
    "User Type",
  ];

  const [list, setUsersList] = useState([]);
  const [selectedRole, setSelectedRole] = useState('All');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUpdateSuccessAlert, setShowUpdateSuccessAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    role: '',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  //Edit modal
  const handleUpdateModalOpen = (user) => {
    setUpdatedUserData(user);
    setUpdateModalOpen(true);
    onOpen();
  };
  
  const handleUpdateModalClose = () => {
    setUpdateModalOpen(false);
    setUpdatedUserData({
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
    });
    onClose();
  };


  //Edit user
  const handleUpdate = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/users/${updatedUserData.id}`,
        updatedUserData
      );
  
      if (response.status === 200) {
        // index of the updated user in the list
        const userIndex = list.findIndex(user => user.id === updatedUserData.id);
        
        if (userIndex !== -1) {
          // Create a new array with the updated user data
          const updatedList = [...list];
          updatedList[userIndex] = { ...updatedUserData }; // Make sure to spread the object
          setUsersList(updatedList);
          setShowUpdateSuccessAlert(true);
          handleUpdateModalClose();
        }
      } else {
        console.error('Failed to update user:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };
  
  
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  //Delete modal
  const handleDeleteModalOpen = (userId) => {
    setDeleteUserId(userId);
    setDeleteModalOpen(true);
  };
  
  const handleDeleteModalClose = () => {
    setDeleteUserId(null);
    setDeleteModalOpen(false);
  };
  

  //Delete user
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
        method: "DELETE"
      });
  
      if (response.ok) {
        console.log('User deleted successfully');
        setShowSuccessAlert(true);
        getAllUsers(selectedRole); 
        handleDeleteModalClose(); // Close the delete modal
      } else {
        console.error('Failed to delete user');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  


  const handleDelete = async () => {
    try {
      await deleteUser(deleteUserId);
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };





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

/*
  const toggleModal = (userId) => {
    setUserModals((prevModals) => ({
      ...prevModals,
      [userId]: !prevModals[userId]
    }));
  };

  */

  
  //Report generation

  //Single User Report
  const pdfUserDetails = (user) => {
    const doc = new jsPDF('portrait', 'px', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

// Background Color
    doc.setFillColor(229, 255, 255); // Light blue background
    doc.rect(0, 0, pageWidth, pageHeight, 'F'); // Fill the entire page with the background color

    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
  
    // Title
    doc.text(30, 30, 'User Details');
    
    // x and y positions for content
    let y = 60;
    let x = 100;
  
    // User details
    doc.setFontSize(12);
    doc.setTextColor(30, 30, 30);
    doc.text(30, y, `User ID: ${user.id}`);
    y += 20;
    doc.text(30, y, `First Name: ${user.firstName}`);
    y += 20;
    doc.text(30, y, `Last Name: ${user.lastName}`);
    y += 20;
    doc.text(30, y, `Email: ${user.email}`);
    y += 20;
    doc.text(30, y, `User Type: ${user.role}`);
  
    
    doc.setLineWidth(1);
    doc.rect(20, 50, 370, y - 20); // Border around content
    doc.save('User_details.pdf');
  };



  // All User Details Report
  const generateTablePDF = () => {
  const doc = new jsPDF();
  const totalPagesExp = "{total_pages_count_string}";

  const columnsData = ["User No", "First Name", "Last Name", "Email", "User Type"];

  let userNumber = 1; // Initialize the user number to 1

  doc.autoTable({
    head: [columnsData], // The header row
    body: list.map((user) => [userNumber++, user.firstName, user.lastName, user.email, user.role]), // The data rows with sequential user numbers
    startY: 20, // Y-position to start the table
    styles: {
      // Style the table
      font: "helvetica",
      fontStyle: "bold",
      fontSize: 10,
      cellPadding: 5,
      fillColor: [124, 195, 206], // Light blue background color
    },
    columnStyles: {
      0: { cellWidth: 20 }, // Adjust the width of the "User Number" column
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
  doc.save("All_User_Details.pdf");
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
        ml={200}
        mt={5}
        colorScheme="blue" 
        //onClick={generateTablePDF}
        >
          Generate User Details
      </Button>


          </Flex>


    <Box>

                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <AdminUsersTable
  list={list}
  columnNames={columns}
  deleteUser={handleDeleteModalOpen}
  setSelectedUser={setSelectedUser}
  updateUser={handleUpdateModalOpen} // Make sure this is passed correctly
  pdfUserDetails={pdfUserDetails}
/>


            </Box>


              </Box>


              </Box>
              </div>

      </Box>


  )
}











 
   


 
 