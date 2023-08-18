import { Box ,Grid,GridItem} from '@chakra-ui/react';
import React from 'react';
import Sidenav from '../../components/Sharing/sidenav';
import { Outlet } from 'react-router-dom';

function PostRequest() {
  return (
   <div>
        <Box height={'100%'}
            m={"auto"}
            mt={10}
            w="80%"
            borderRadius="md"
            boxShadow="sm"
            bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
            backdropFilter="blur(8px)"
            p={10} >
            <Grid templateRows={'repeat(5,1fr)'} templateColumns={'repeat(5,1fr)'} gap={'15px'} paddingTop={5}>
                <GridItem rowSpan={3} colSpan={1} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                      <Sidenav/>
                </GridItem>
                
                <GridItem rowSpan={5} colSpan={4} > 
                    <Outlet/>
                </GridItem>
            </Grid>
        </Box>
   </div>
  
  )
}

export default PostRequest