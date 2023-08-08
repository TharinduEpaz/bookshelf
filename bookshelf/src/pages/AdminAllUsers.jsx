import React from 'react'
import SearchBar from '../components/Admin/SearchBar';

import { 
    Checkbox, 
    Flex, 
    Select,
    Spacer,
    Text,
    Box,
    Center,
    Button
} from '@chakra-ui/react'
import AdminUsersTable from '../components/Admin/AdminUsersTable';

export default function AdminAllUsers() {

  const columns = [
    "User ID",
    "User Name",
    "User Type",
    "Email",
    "Action",
  ];
  const list = [
    {
      id: "u0001",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0002",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0003",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0004",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0005",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0006",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0007",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0008",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0009",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0010",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0011",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0012",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0013",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0014",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    {
      id: "u0015",
      name: "Anne Rex",
      type: "Buyer",
      email: "ann@gmail.com",
      action: <Button colorScheme='blue' size='md'>Action</Button>,
    },
    
  ];


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
                placeholder='Buyers' 
                w={'250px'} 
                size={'sm'} 
                borderRadius={5} 
                borderColor={'gray.200'} 
                focusBorderColor={'white.100'}
                pl={10}
                ml={10}
                mt={5}
               >
                  <option value='option1'>Moderators</option>
                  <option value='option2'>Subscribers</option>
                  <option value='option3'>Donators</option>
            
              </Select>

          </Flex>


    <Box>
                {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}

                <Spacer mt={5} />

                <AdminUsersTable list={list} columnNames={columns} />
              </Box>

      </Box>


  )
}
