import React, { useState } from "react";
import {
    Box,
    GridItem,
    SimpleGrid,
    Text,
    Image
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

const data = {
    isNew: true,
    imageURL:
        'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
    name: 'Wayfarer Classic',
    price: 4.5,
    rating: 4.2,
    numReviews: 34,
};
function ShareBookDetails(props) {
    // name={requestDetails[item].bookName}
    // userName={requestDetails[item].userName}
    // details={requestDetails[item].details}
    // date={requestDetails[item].createdAt}
    return (
       <>
            <Card border={"1px"}
                borderColor={"blue.200"}
                rounded={"md"}
                marginBottom={5}>
                <CardBody>

                    <SimpleGrid columns={10} spacing={4} >
                        <GridItem colSpan={1}>
                            <Image
                                src={props.imageURL}
                                roundedTop="lg"
                                boxSize={'100px'}
                                objectFit='revert'

                            />
                        </GridItem>

                        <GridItem colSpan={2}>
                            <Box marginTop={5}>
                                <Text fontSize="lg" as={'b'}>
                                    {props.bookName}
                                </Text>
                                <Text>
                                    by {" "} {props.userName}
                                </Text>
                            </Box>
                        </GridItem>

                        <GridItem colSpan={7}>
                            <Box marginLeft={24}>
                                <Text marginTop={8} fontSize="lg" textAlign={'end'}>
                                    Posted {props.createdAt}
                                </Text>
                            </Box>
                        </GridItem>
                    </SimpleGrid>
                </CardBody>
            </Card>
       </>
    );
}
export default ShareBookDetails;
