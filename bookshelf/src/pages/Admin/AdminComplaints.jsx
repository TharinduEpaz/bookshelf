import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminComplaintsTable from "../../components/Admin/AdminComplaintsTable";
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

export default function AdminComplaints() {

  const [search, setSearch] = useState('');

  const columns = [
    "Complain ID",
    "Customer Name",
    // "Email",
    "Complain",
  ];

   const [list, setComplaintList] = useState([]);

   //Get all complaints
   const getComplaints = async () => {
    try {
      const response = await fetch ("http://localhost:3000/api/v1/subscriptionComplaints")
      const jsonData = await response.json()

      const filteredData = jsonData.map((complaint) => ({
        id: complaint.id,
        name: complaint.name,
        // email: complaint.email,
        complaint: complaint.complaint,
      })
      );

      setComplaintList(filteredData);

    } catch (error) {
      console.error(err.message);
    }
   }

   useEffect(() => {
    getComplaints();
  }, [])


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
        >

          <Flex
            gap={5}
            alignItems={"center"}
            justifyContent={"center"}
            w={"100%"}
            flexWrap={"wrap"}
          >

          </Flex>

          <Box p={5}>
            <Flex>
              <Text fontSize="lg" fontWeight={"bold"} ml={250} mb={5}>
                Complaints
              </Text>
            </Flex>

            <Box>

    <FormControl ml={5} mb={2}>
    <InputGroup>
    <Input
      type="text"
      placeholder="Search By Customer Name"
      colorScheme="blue"
      borderColor={'gray.200'}
      focusBorderColor={'white.100'}
      mt={5}
      ml={5}    
      w={"80%"}
      borderRadius={5}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      
    />
    <IconButton icon={<FaSearch />} color="blue.300" mt={5} ml={2} borderRadius={100} variant={'ghost'} />
  </InputGroup>
  </FormControl>

              <Spacer mt={5} />

              <AdminComplaintsTable 
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
