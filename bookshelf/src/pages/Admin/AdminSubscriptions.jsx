import React, { useRef } from "react";
import {
  Box, 
  Flex,
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
import SearchBar from '../../components/Admin/SearchBar';
import AdminSubscriptionPlans from "../../components/Admin/AdminSubscriptionPlans";


export default function AdminSubscriptions() {

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
     
    </Flex>
    
      
           
              <Spacer mt={5} />
              

            {/* Table1: Subscription Plans Details Table */}

            {error && (
              <Alert status="error">
                {" "}
                <AlertIcon /> {error}
              </Alert>
            )}

            {showSuccessAlert && (
                <Alert status="success" mt={4}>
                <AlertIcon />
                User successfully added!
                </Alert>
                )}


       
            <Button onClick={onOpen} ml={450} mt={2} mb={5} colorScheme="blue">
              + Add New Subscription Plan
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Add New Subscription Plan Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                <form onSubmit={addSubscriptionPlan}>
                  <FormControl>
                    <FormLabel>Plan First name</FormLabel>
                    <Input 
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      //ref={initialRef} 
                      placeholder="First name" 
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Plan Last name</FormLabel>
                    <Input 
                      type="text"
                      value={LastName}
                      onChange={(e) => setLastName(e.target.value)}
                      //ref={initialRef} 
                      placeholder="Last name" 
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Book Count</FormLabel>
                    <Input 
                      type="text"
                      value={book_count}
                      onChange={(e) => setBook_count(e.target.value)}
                      //ref={initialRef} 
                      placeholder="Book Count" 
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Time Period</FormLabel>
                    <Input 
                      type="text"
                      value={time_period}
                      onChange={(e) => setTime_period(e.target.value)}
                      //ref={initialRef} 
                      placeholder="Time Period" 
                    />
                  </FormControl>

                  <FormControl mt={4}>
                    <FormLabel>Discount</FormLabel>
                    <Input 
                      type="text"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      //ref={initialRef} 
                      placeholder="Discount" 
                    />
                  </FormControl>

                  <Button 
                  type="submit"
                  colorScheme='blue' 
                  variant='solid' 
                  mt={10} 
                  mr={5} 
                  ml={5} 
                  mb={10}>
                  Save
                  </Button>
                  
                  <Button onClick={onClose}>Cancel</Button>
                  </form>

                </ModalBody>

                <ModalFooter>
                  
                </ModalFooter>
              </ModalContent>
            </Modal>
            

            <Box
              ml={0}
              mt={0}
              p={2}
              pl={5}
              pr={5}
              mb={100}
              boxShadow="sm"
              borderRadius="md"
              bgColor={"#EDF2F7"}
              w={"100%"}
            >
              <AdminSubscriptionPlans
                planList={planList}
                planColumnNames={planColumnNames}
              />
            </Box>




            </Box>
         
      
    



   
  );
}
