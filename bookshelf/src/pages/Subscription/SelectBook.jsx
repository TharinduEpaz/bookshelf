import React from 'react'
import {
  Box, Grid, GridItem, Heading, Text
} from "@chakra-ui/react";

import SideNavSelectBook from '../../components/Subscription/SideNavSelectBooks';
import SelectBookShop from '../../components/Subscription/SelectBookShop';


function SelectBook() {
  return (
    
      <Box
        height={'100%'}
        m={"auto"}
        mt={10}
        w="90%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        backdropFilter="blur(8px)"
        p={10}
      >

        <Heading>
          Subscription
        </Heading>

        <Grid templateRows={'repeat(8,1fr)'} templateColumns={'repeat(6,1fr)'} gap={'15px'} paddingTop={5}>
        <GridItem rowSpan={5} colSpan={1} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
            <SideNavSelectBook />
          </GridItem>

          <GridItem rowSpan={8} colSpan={5} >
            <SelectBookShop/>
          </GridItem>
        </Grid>

      </Box>
    
  )
}

export default SelectBook
