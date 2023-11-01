import React, { useEffect, useState } from "react";
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
  Skeleton,
  Heading,

} from "@chakra-ui/react";

import  AxiosInstance  from "../../utils/axiosInstance";

function Orders() {

  const [orders,setOrders] = useState(null)
  const [subscriptions,setSubscriptions] = useState(null)
  const [isLoading,setIsLoading]= useState(false)

  useEffect(()=>{
    async function getOrders(){
      try {
        setIsLoading(true)
        const response = await AxiosInstance.get('orders/getmyorders')
        setOrders(response.data)
        console.log(orders);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    getOrders();
  },[])

  useEffect(()=>{
    async function getOrders(){
      try {
        setIsLoading(true)
        const response = await AxiosInstance.get('orders/getmysubscriptionorders')
        setSubscriptions(response.data)
        console.log(orders);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
        setIsLoading(false)
      }
    }
    getOrders();
  },[])

  return (
    <>
      <Box
        position={"relative"}
        h={"100%"}
        borderRadius={"10px"}
        ml={2}
        pt={5}
        border={"1px solid #E2E8F0"}
        pl={5}
        pr={5}
      >
        <Heading size={'md'} ml={5}>Shop Orders</Heading>
              <TableContainer bg={'white'} borderRadius={10} mt={5} shadow={'md'}>
                <Table variant='simple'>
          
                  <Thead>
                    <Tr>
                      <Th>Order</Th>
                      <Th>Order Items</Th>
                      <Th>Order Date</Th>
                      <Th>Status</Th>
                      <Th>Payment</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {isLoading && (
                    <>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    </>
                    
                  )}
                  {orders && orders.map((item)=>{
                    return(
                    <Tr key={item.id}>
                      <Td>{'Order' + " " + item.id.slice(0,5).toUpperCase()}</Td>
                      <Td style={{ whiteSpace: 'normal' }}>{item.orderItems.map((item=>{return item.title + ' , '}))}</Td>
                      <Td>{item.orderDate.slice(0,10)}</Td>
                      <Td>{item.orderStatus}</Td>
                      <Td>{item.isPaid ? 'Done' : 'Unsuccessful'}</Td>

                    </Tr>
                    )
                  })}
               
                  </Tbody>
                 
                </Table>
              </TableContainer>



              <Heading size={'md'} mt={10} ml={5}>Subscription Orders</Heading>
              <TableContainer bg={'white'} borderRadius={10} mt={5} shadow={'md'}>
                <Table variant='simple'>
          
                  <Thead>
                    <Tr>
                      <Th>Order</Th>
                      <Th>Order Items</Th>
                      <Th>Order Date</Th>
                      <Th>Status</Th>
                      <Th>Payment</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                  {isLoading && (
                    <>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    <Tr>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                      <Th><Skeleton >grgrg</Skeleton></Th>
                   
                    </Tr>
                    </>
                    
                  )}
                  {subscriptions && subscriptions.map((item)=>{
                    return(
                    <Tr key={item.id}>
                      <Td>{'Order' + " " + item.id.slice(0,5).toUpperCase()}</Td>
                      <Td style={{ whiteSpace: 'normal' }}>{item.orderItems.map((item=>{return item.title + ' , '}))}</Td>
                      <Td>{item.orderDate.slice(0,10)}</Td>
                      <Td>{item.orderStatus}</Td>
                      <Td>{item.isPaid ? 'Done' : 'Unsuccessful'}</Td>

                    </Tr>
                    )
                  })}
               
                  </Tbody>
                 
                </Table>
              </TableContainer>
           
      </Box>
    </>
  );
}

export default Orders;
