import React from 'react'
import SearchBar from '../components/Admin/SearchBar';
import AdminBuyersTable from '../components/Admin/AdminBuyersTable';

import { 
    Checkbox, 
    Flex, 
    Select,
    Spacer,
    Text,
    Box,
    Center
} from '@chakra-ui/react'

export default function AdminAllUsers() {
  return (
    
    <Box
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

    <AdminBuyersTable/>

      </Box>


  )
}
