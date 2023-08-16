import React from "react";
import { 
  Tabs, TabList, TabPanels, Tab, TabPanel, Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  

} from "@chakra-ui/react";

function Orders() {
  return (
    <>
      <Box
        position={"relative"}
        h={"100%"}
        borderRadius={"10px"}
        ml={2}
        pt={5}
        border={"1px solid #E2E8F0"}
      >
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList ml={5}>
            <Tab>All Orders</Tab>
            <Tab>Awaiting Delivery</Tab>
            <Tab>Awaiting Payment</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TableContainer bg={'white'} borderRadius={10} mt={5} shadow={'md'}>
                <Table variant='simple'>
          
                  <Thead>
                    <Tr>
                      <Th>Order</Th>
                      <Th>Due Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Order 456847</Td>
                      <Td>23 Apr 2023</Td>
                      <Td>Delivered</Td>
                    </Tr>
                    <Tr>
                      <Td>0rder 345929</Td>
                      <Td>31 Sep 2023</Td>
                      <Td>Processing</Td>
                    </Tr>
                    <Tr>
                      <Td>Order 3993024</Td>
                      <Td>22 Aug 2022</Td>
                      <Td>Cancelled</Td>
                    </Tr>
                  </Tbody>
                 
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
            <TableContainer bg={'white'} borderRadius={10} mt={5} shadow={'md'}>
                <Table variant='simple'>
          
                  <Thead>
                    <Tr>
                      <Th>Order</Th>
                      <Th>Due Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Order 456847</Td>
                      <Td>23 Apr 2023</Td>
                      <Td>Delivered</Td>
                    </Tr>
                    <Tr>
                      <Td>0rder 345929</Td>
                      <Td>31 Sep 2023</Td>
                      <Td>Processing</Td>
                    </Tr>
                    <Tr>
                      <Td>Order 3993024</Td>
                      <Td>22 Aug 2022</Td>
                      <Td>Cancelled</Td>
                    </Tr>
                  </Tbody>
                 
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
            <TableContainer bg={'white'} borderRadius={10} mt={5} shadow={'md'}>
                <Table variant='simple'>
          
                  <Thead>
                    <Tr>
                      <Th>Order</Th>
                      <Th>Due Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Order 456847</Td>
                      <Td>23 Apr 2023</Td>
                      <Td>Delivered</Td>
                    </Tr>
                    <Tr>
                      <Td>0rder 345929</Td>
                      <Td>31 Sep 2023</Td>
                      <Td>Processing</Td>
                    </Tr>
                    <Tr>
                      <Td>Order 3993024</Td>
                      <Td>22 Aug 2022</Td>
                      <Td>Cancelled</Td>
                    </Tr>
                  </Tbody>
                 
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel>
            <TableContainer bg={'white'} borderRadius={10} mt={5} shadow={'md'}>
                <Table variant='simple'>
          
                  <Thead>
                    <Tr>
                      <Th>Order</Th>
                      <Th>Due Date</Th>
                      <Th>Status</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Order 456847</Td>
                      <Td>23 Apr 2023</Td>
                      <Td>Delivered</Td>
                    </Tr>
                    <Tr>
                      <Td>0rder 345929</Td>
                      <Td>31 Sep 2023</Td>
                      <Td>Processing</Td>
                    </Tr>
                    <Tr>
                      <Td>Order 3993024</Td>
                      <Td>22 Aug 2022</Td>
                      <Td>Cancelled</Td>
                    </Tr>
                  </Tbody>
                 
                </Table>
              </TableContainer>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}

export default Orders;
