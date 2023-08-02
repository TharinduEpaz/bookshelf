import React from 'react'

import {
    Box, Grid, GridItem, Text
} from "@chakra-ui/react";

import { GiSandSnake } from "react-icons/gi";

function SelectWormIcon() {
    return (
        <Box py={3} px={10} >
         <Grid templateColumns="auto 1fr" gap={4} paddingTop={3}>
                {/* First column with icon */}
                <GridItem marginTop={4}>
                    {/* Add your desired icon from the react-icons library */}
                    <GiSandSnake size={70} color='darkgreen' />
                </GridItem>

                {/* Second column (spanning two rows) */}
                <GridItem textAlign={"start"}>
                    {/* First row in the second column */}
                    <Text fontWeight="500" fontSize="24">
                        BOOK
                    </Text>

                    {/* Second row in the second column */}
                    <Text fontSize="36" fontWeight="900">
                        Worm
                    </Text>
                </GridItem>
            </Grid>
        </Box>
    )
}

export default SelectWormIcon