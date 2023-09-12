import React from 'react'
import {
    Box, Grid, GridItem, Text
} from "@chakra-ui/react";

import ChangeSubscription from '../../components/Subscription/ChangeSubscription';
import SubscriptionDetails from './SubscriptionDetails';
import AddComplaint from './AddComplaint'
import RevokeSubscription from './RevokeSubscription';
import Faq from './Faq';

function ManageItems() {
    return (
        <Box padding={10}>

            <Text fontSize={24} as={'b'} >
                Change Subscription
            </Text>

            <Grid templateRows={'repeat(8,1fr)'} templateColumns={'repeat(1,1fr)'} gap={'15px'} paddingTop={5}>
               
                <GridItem rowSpan={2} colSpan={1} >
                    <ChangeSubscription/>
                </GridItem>

                <GridItem rowSpan={2} colSpan={1}>
                    <SubscriptionDetails/>
                </GridItem>

                <GridItem rowSpan={2} colSpan={1} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <AddComplaint />
                </GridItem>

                <GridItem rowSpan={2} colSpan={1} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <RevokeSubscription />
                </GridItem>

                <GridItem rowSpan={2} colSpan={1} border={'1px'} borderRadius={'10'} borderColor={'blue.200'}>
                    <Faq/>
                </GridItem>
            </Grid>
        </Box>
    )
}
export default ManageItems
