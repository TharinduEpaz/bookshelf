import React, { useRef } from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Icon,
  StatGroup,
  Text,
  Spacer,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";


import { BiBookOpen } from "react-icons/bi";

import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import AdminDtataTable from "../../components/Admin/AdminDtataTable";
import AdminSubscriptionPlans from "../../components/Admin/AdminSubscriptionPlans";

export default function AdminSubscriptionReports() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Subscription plans
  const planColumnNames = [
    "Subscription",
    " Plans ",
    "Book Count",
    "Time Period",
    "Discount",
  ];

  const [planList, setPlanList] = useState([]);
  const [error, setError] = useState("");
  //const initialRef = useRef();


  //Get subscription plans
  const getPlans = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/subscriptions");
      const jsonData = await response.json();

      const filteredData = jsonData.map((plan) => ({
        firstName: plan.firstName,
        LastName: plan.LastName,
        book_count: plan.book_count,
        time_period: plan.time_period,
        discount: plan.discount,
      }));

      setPlanList(filteredData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);



  //Add subscription plan
  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [book_count, setBook_count] = useState("");
  const [time_period, setTime_period] = useState("");
  const [discount, setDiscount] = useState("");

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const addSubscriptionPlanUrl = "http://localhost:3000/api/v1/subscriptions/";

  const addSubscriptionPlan = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(addSubscriptionPlanUrl, {
        firstName: firstName,
        LastName: LastName,
        book_count: book_count,
        time_period: time_period,
        discount: discount,
      });
      console.log(response.data);
      setFirstName("");
      setLastName("");
      setBook_count("");
      setTime_period("");
      setDiscount("");

      setShowSuccessAlert(true);
      window.location.href = "/adminsubscriptions";
      
    } catch (error) {
      setError(error.response.data.msg);
      console.log(error.response);
    }
  };






  // Subscriptions
  const columns = [
    "Customer Id",
    "Subscription plan",
    "Book",
    "Tracking ID",
    "Actions",
  ];

  const list = [
    {
      id: "c0001",
      plan: "Book Reader",
      book: "Anne",
      tracking_id: "10",
      actions: "In-Progress",
    },
    {
      id: "c0002",
      plan: "Book Lover",
      book: "Village By The Sea",
      tracking_id: "15",
      actions: "In-Progress",
    },
    {
      id: "c0003",
      plan: "Book Worm",
      book: "Mary",
      tracking_id: "30",
      actions: "In-Progress",
    },
    {
      id: "c0004",
      plan: "Book Lover",
      book: "Anne",
      tracking_id: "20",
      actions: "In-Progress",
    },
    {
      id: "c0005",
      plan: "Book Lover",
      book: "Sheli",
      tracking_id: "17",
      actions: "In-Progress",
    },
  ];

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
              Subscription Reports
            </Text>


          <Flex gap={3} alignItems={'center'}>


          <Text width={200} mt={5} ml={20}>Select By</Text>

<Select 
  placeholder='All' 
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
    <option value='buyer'>Author</option>
    <option value='moderator'>Genre</option>
    <option value='moderator'>Category</option>

</Select>

<Button 
        ml={550}
        mt={5}
        colorScheme="blue" 
        //onClick={generateTablePDF}
        >
          Generate Subscription Details
      </Button>


        </Flex>


            <Spacer mt={10} />

            <Box>
              {/* <SearchPanel name={"Customer Orders"} filter={"orders"} /> */}
              <Spacer mt={5} />
              <AdminDtataTable list={list} columnNames={columns} />
            </Box>
          </Box>
        </Box>
      </div>
    </Box>
  );
}
