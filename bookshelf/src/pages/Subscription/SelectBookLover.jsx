import React from 'react'

import {
    Box, Grid, GridItem, Heading,Text
} from "@chakra-ui/react";

import SideNav from '../../components/Subscription/SideNav';
import SelectLoverIcon from '../../components/Subscription/SelectLoverIcon';
import SelectLover from '../../components/Subscription/SelectLover';
function SelectBookLover() {
    return (
        <Box m="auto"
            mt={10}
            w={1400}
            h={'auto'}
            backgroundColor="white"
            borderRadius={10}
            p={4}>

            <Heading>
                Subscription
            </Heading>

            <Grid templateRows={'repeat(60,1fr)'} templateColumns={'repeat(15,1fr)'} gap={'15px'} paddingTop={5}>
                <GridItem rowSpan={40} colSpan={4} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <SideNav />
                </GridItem>

                <GridItem rowSpan={15} colSpan={10} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <SelectLoverIcon/>
                </GridItem>

                <GridItem rowSpan={40} colSpan={10} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <SelectLover/>
                </GridItem>
            </Grid>

        </Box>
    )
}

export default SelectBookLover