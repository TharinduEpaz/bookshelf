import React from 'react'
import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel 
} from '@chakra-ui/react'

import AdminSubscriptions from '../../pages/Admin/AdminSubscriptions'
import AdminSubscriptionOrders from '../../pages/Admin/AdminSubscriptionOrders'

export default function AdminSubscriptionMgtTabs() {
  return (
    
    <Tabs variant='soft-rounded' colorScheme='blue'>

  <TabList ml={60}>
    <Tab>Subscription Details</Tab>
    <Tab>Subscription Plans</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
        <AdminSubscriptionOrders/>
    </TabPanel>
    <TabPanel>
        <AdminSubscriptions/>
    </TabPanel>
  </TabPanels>

</Tabs>

  )
}
