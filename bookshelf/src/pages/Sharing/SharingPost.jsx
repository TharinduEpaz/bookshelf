import React from 'react'
import {
  Box, 
  Grid,
  GridItem,
 
} from '@chakra-ui/react';
import Form from "../../components/Sharing/Form"
import SideNav from "../../components/Sharing/SideNav";

function SharingPost() {
  return (
    <div>
      <Box m="auto" mt={10} w={1800} h={800} boxShadow="sm" backgroundColor="white" p={4} display={'flex'} alignItems={'center'} justifyContent={'left'}> 
        <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(6,1fr)'} gap={'10px'}>
          <GridItem rowSpan={1} colSpan={2} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
            <SideNav/>
          </GridItem>

          <GridItem rowSpan={1} colSpan={4} width={'130%'} border={'1px'} borderRadius={'10'} borderColor={'blue.200'} padding={'10'} >
            <Form/>
          </GridItem>
        </Grid>
      </Box>
    </div>
  )
}

export default SharingPost
