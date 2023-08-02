import React from 'react'
import BookDetails from "../../components/Subscription/BookDetails";

import {
    Box,
    Button,
    Grid,
    GridItem,
    Text
} from "@chakra-ui/react";

import { BsFillCalendar2DateFill } from "react-icons/bs";

function SelectReader() {
    return (
        <Box py={7} px={12}>
            <Text fontSize={'21'} color={'#204974'} as={'b'}>
                Next Delivery
            </Text>
            <Button bg={'white'} variant={'outline'} borderRadius={15} marginLeft={10} w={'auto'}>
                <strong>Extended Date</strong>
            </Button>

            <Grid templateRows={'repeat(1,1fr)'} templateColumns={'repeat(10,1fr)'} marginTop={10} >
                <GridItem marginTop={'3px'}>
                    <BsFillCalendar2DateFill size={'25px'} />
                </GridItem>
                <GridItem colSpan={3}>
                    <Text as={'b'} fontSize={'22'}>
                        2023-08-25
                    </Text>
                </GridItem>
            </Grid>
            <Box marginTop={10}>
                <Text fontSize={'21'} color={'#204974'} as={'b'}>
                    Book Details
                </Text>
            </Box>

            <BookDetails />

        </Box>

    )
}

export default SelectReader