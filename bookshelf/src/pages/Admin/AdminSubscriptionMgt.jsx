import React from 'react'
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminSubscriptionMgtTabs from '../../components/Admin/AdminSubscriptionMgtTabs';

import {
    Box, 
    Flex,
    Card,
    CardBody,
    Icon,
    StatGroup,
    Text,
    Spacer,
    Button,
    Select,
} from '@chakra-ui/react'

import { BiBookOpen } from "react-icons/bi";
import AdminStatCard from "../../components/Admin/AdminStatCard";
import { useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";

export default function AdminSubscriptionMgt() {

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

 
           
              <Text fontSize="lg" fontWeight={"bold"} ml={30}>
                Subscriptions Summary
              </Text>
              <Spacer />
            

        <Box mb={100}>
            <Flex gap={10}>
              <Card
                mt={10}
                ml={20}
                p={2}
                pl={5}
                pr={5}
                boxShadow="sm"
                borderRadius="md"
                bgColor={"#EDF2F7"}
                w={300}
              >
                <CardBody>
                  <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                  <StatGroup gap={50}>
                    <AdminStatCard
                      lable="All Subscriptions"
                      value="200"
                      type="increase"
                      percentage="23.36"
                    />
                  </StatGroup>
                </CardBody>
              </Card>

              <Card
                mt={10}
                p={2}
                pl={2}
                pr={2}
                boxShadow="sm"
                borderRadius="md"
                bgColor={"#EDF2F7"}
                w={300}
              >
                <CardBody>
                  <Flex justifyContent={"space-between"}>
                    <Icon as={BiBookOpen} boxSize={8} color={"#3182CE"} />
                    <Select width={"100px"} ml={10}>
                      <option value="option1">All</option>
                      <option value="option2">This week</option>
                      <option value="option3">This Month</option>
                    </Select>
                  </Flex>
                  <StatGroup gap={50}>
                    <AdminStatCard
                      lable="New Subscriptions"
                      value="40"
                      type="increase"
                      percentage="23.36"
                    />
                  </StatGroup>
                </CardBody>
              </Card>
            </Flex>
            </Box>

    <AdminSubscriptionMgtTabs/>

 </Box>
 </div>

  </Box>

  )
}
