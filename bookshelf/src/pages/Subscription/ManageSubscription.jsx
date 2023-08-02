import React from 'react'
import {
    Box, Grid, GridItem, Heading
} from "@chakra-ui/react";

import SideNavManageSubscription from '../../components/Subscription/SideNavManageSubscription';
import ManageItems from '../../components/Subscription/ManageItems';

function ManageSubscription() {
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
                    <SideNavManageSubscription />
                </GridItem>

                <GridItem rowSpan={8} colSpan={5} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <ManageItems/>
                </GridItem>
            </Grid>

        </Box>

    )
}

export default ManageSubscription
