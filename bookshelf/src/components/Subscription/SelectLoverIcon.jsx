import React from 'react'

import {
    Box, Grid, GridItem, Text
} from "@chakra-ui/react";

import { PiHandHeartFill } from "react-icons/pi";

function SelectLoverIcon() {
    return (
        <Box py={7} px={12}>

            <Text fontSize={'2xl'} color={'#204974'} as={'b'} >
                Current Subscription
            </Text>
            <Grid templateColumns="auto 1fr" gap={4} paddingTop={5}>
                {/* First column with icon */}
                <GridItem marginTop={6}>
                    {/* Add your desired icon from the react-icons library */}
                    <PiHandHeartFill size={50} />
                </GridItem>

                {/* Second column (spanning two rows) */}
                <GridItem textAlign={"start"}>
                    {/* First row in the second column */}
                    <Text fontWeight="500" fontSize="3xl">
                        BOOK
                    </Text>

                    {/* Second row in the second column */}
                    <Text fontSize="4xl" fontWeight="900">
                        Lover
                    </Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default SelectLoverIcon