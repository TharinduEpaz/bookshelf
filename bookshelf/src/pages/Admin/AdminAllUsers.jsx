import React from 'react'
import { useDisclosure } from '@chakra-ui/react'; 
import SearchBar from '../../components/Admin/SearchBar';
import { Alert, AlertIcon } from '@chakra-ui/react';


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
import AdminUsersTable from '../../components/Admin/AdminUsersTable';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function AdminAllUsers() {

  
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
    
              <Select 
                placeholder='All' 
                w={'250px'} 
                size={'sm'} 
                borderRadius={5} 
                borderColor={'gray.200'} 
                focusBorderColor={'white.100'}
                pl={10}
                ml={10}
                mt={5}
                onChange={(e) => setSelectedRole(e.target.value)} 
                value={selectedRole}
               >
                  <option value='All'>All</option>
                  <option value='buyer'>Buyers</option>
                  <option value='moderator'>Moderators</option>
          
            
              </Select>

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
/>


              {showSuccessAlert && (
                <Alert status="success" mt={4}>
                <AlertIcon />
                User deleted successfully!
                </Alert>
                )}

              {showUpdateSuccessAlert && (
                <Alert status="success" mt={4}>
                <AlertIcon />
                User updated successfully!
                </Alert>
                )}




      {/* View modal */}
      {selectedUser && (
        <Modal isOpen={!!selectedUser} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Render user details here */}
              <p>ID: {selectedUser.id}</p>
              <p>First Name: {selectedUser.firstName}</p>
              <p>Last Name: {selectedUser.lastName}</p>
              <p>Email: {selectedUser.email}</p>
              <p>User Type: {selectedUser.role}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}


  {/* Update modal */}
  {updatedUserData && (
    <Modal isOpen={isOpen || updateModalOpen} onClose={handleUpdateModalClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="firstName"
            placeholder="First Name"
            value={updatedUserData.firstName}
            onChange={handleInputChange}
          />
          <Input
            name="lastName"
            placeholder="Last Name"
            value={updatedUserData.lastName}
            onChange={handleInputChange}
          />
          <Input
            name="email"
            placeholder="Email"
            value={updatedUserData.email}
            onChange={handleInputChange}
          />
          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="ghost" onClick={handleUpdateModalClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )}

{/* Delete modal */}
{deleteUserId && (
      <Modal isOpen={deleteModalOpen} onClose={handleDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this user?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="ghost" onClick={handleDeleteModalClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )}


              </Box>

      </Box>


  )
}