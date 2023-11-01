import React from 'react'
import {
    Box, Grid, GridItem, Heading
} from "@chakra-ui/react";

import ManageItems from '../../components/Subscription/ManageItems';

function ManageSubscription() {
    return (

        <div
            height={'100%'}
            m={"auto"}
            mt={10}
            w="100%"
            borderRadius="md"
            boxShadow="sm"
            bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
             backdropFilter="blur(8px)"
            p={10}
        >
            <Box border={'1px'} borderRadius={'10'} borderColor={'blue.200'} bg={'white'}>
                <ManageItems />
            </Box>
            

        </div>

    )
}

export default ManageSubscription
