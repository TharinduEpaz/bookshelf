import React from 'react'
import { useDisclosure } from '@chakra-ui/react'; 
import SearchBar from '../components/Admin/SearchBar';

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
} from '@chakra-ui/react'
import AdminUsersTable from '../components/Admin/AdminUsersTable';
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
  const [userModals, setUserModals] = useState({});

  async function getAllUsers() {
    try {
      const response = await fetch("http://localhost:3000/api/v1/users/");
       

      const jsonData = await response.json();

      const filteredData = jsonData.map((users) => ({
        id: users.id,
        firstName: users.firstName,
        lastName: users.lastName,
        email: users.email,
        role: users.role,
      }));

      setUsersList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getAllUsers();
  }, [])



  const toggleModal = (userId) => {
    setUserModals((prevModals) => ({
      ...prevModals,
      [userId]: !prevModals[userId]
    }));
  };

  

  return (
    
    <Box
        m={"auto"}
        mt={10}
        w="100%"
        h="100%"
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
               >
                  <option value='option1'>Buyers</option>
                  <option value='option1'>Moderators</option>
                  <option value='option2'>Subscribers</option>
                  <option value='option3'>Donators</option>
            
              </Select>

          </Flex>


    <Box>

                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <AdminUsersTable  list={list} columnNames={columns} onSuspendClick={toggleModal} />

                 {list.map((user) => (
            <Modal key={user.id} isOpen={userModals[user.id]} onClose={() => toggleModal(user.id)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Delete User</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>Are you sure you want to suspend the user?</Text>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={() => toggleModal(user.id)}>
                  Suspend
                </Button>
                <Button variant="ghost" onClick={() => toggleModal(user.id)}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        ))}


              </Box>

      </Box>


  )
}
