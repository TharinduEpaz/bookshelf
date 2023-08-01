import React from 'react'

import {
    Box, Grid, GridItem, Heading,Text
} from "@chakra-ui/react";

import SideNav from '../../components/Subscription/SideNav';
import SelectLoverIcon from '../../components/Subscription/SelectLoverIcon';
import SelectLover from '../../components/Subscription/SelectLover';
function SelectBookLover() {
    return (
        <Box 
        //m="auto"
        //     mt={10}
        //     w={'auto'}
        //     h={'auto'}
        //     backgroundColor="white"
        //     borderRadius={10}
        //     p={4}
            height={'100%'}
            m={"auto"}
            mt={10}
            w="80%"
            borderRadius="md"
            boxShadow="sm"
            bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
            backdropFilter="blur(8px)"
            p={10}
        >

            <Heading>
                Subscription
            </Heading>

            <Grid templateRows={'repeat(5,1fr)'} templateColumns={'repeat(4,1fr)'} gap={'15px'} paddingTop={5}>
                <GridItem rowSpan={3} colSpan={1} border={'1px'} borderRadius={'10'} borderColor="rgba(0,0,0,0.2)">
                    <SideNav />
                </GridItem>

                <GridItem rowSpan={1} colSpan={3} border={'1px'} borderRadius={'10'} borderColor="rgba(0,0,0,0.2)">
                    <SelectLoverIcon/>
                </GridItem>

                <GridItem rowSpan={4} colSpan={3} border={'1px'} borderRadius={'10'} borderColor="rgba(0,0,0,0.2)">
                    <SelectLover/>
                </GridItem>
            </Grid>

        </Box>
    )
}

export default SelectBookLover