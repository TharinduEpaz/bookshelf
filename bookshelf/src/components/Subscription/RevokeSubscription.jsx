import React from 'react'

import { Text, Box, Button } from "@chakra-ui/react";

function RevokeSubscription() {
    return (
        <Box padding={5}>
            <Text fontSize={'2xl'} fontWeight={'extrabold'}>
                Revoke Subscription
            </Text>
            <Text fontSize={'xl'} padding={4}>
                After revoking the subscription you should return the current book to our delivery partner.
            </Text>

            <Button
                color={'red'}
                variant={'outline'}
                border={'1px'}
                borderRadius={10}
                marginLeft={5}>
                Add a Complaint
            </Button>
        </Box>
    )
}

export default RevokeSubscription
