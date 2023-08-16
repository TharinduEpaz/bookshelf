import React from 'react'
import { 
    Tabs, 
    TabList, 
    TabPanels, 
    Tab, 
    TabPanel 
} from '@chakra-ui/react'
import AdminAllUsers from '../../pages/AdminAllUsers'
import AdminAddModerator from '../../pages/AdminAddModerator'

export default function AdminUserMgtTabs() {
  return (
    
    <Tabs variant='soft-rounded' colorScheme='blue'>

  <TabList>
    <Tab>All User Details</Tab>
    <Tab>Add Moderator</Tab>
  </TabList>
  
  <TabPanels>
    <TabPanel>
      <AdminAllUsers/>
    </TabPanel>
    <TabPanel>
        <AdminAddModerator/>
    </TabPanel>
  </TabPanels>

</Tabs>

  )
}
