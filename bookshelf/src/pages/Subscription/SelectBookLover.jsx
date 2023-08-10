import React from 'react'

import {
    Box, Grid, GridItem, Heading,Text
} from "@chakra-ui/react";

import SideNavDetails from '../../components/Subscription/SideNavDetails';
import SelectLover from '../../components/Subscription/SelectLover';
import { Outlet } from 'react-router-dom';
function SelectBookLover() {
    return (
        <Box 
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

            <Grid templateRows={'repeat(5,1fr)'} templateColumns={'repeat(5,1fr)'} gap={'15px'} paddingTop={5}>
                <GridItem rowSpan={3} colSpan={1} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                        <SideNavDetails />
                </GridItem>
                
                <GridItem rowSpan={5} colSpan={4} > 
                    <Outlet/>
                </GridItem>
            </Grid>

        </Box>
    )
}

export default SelectBookLover