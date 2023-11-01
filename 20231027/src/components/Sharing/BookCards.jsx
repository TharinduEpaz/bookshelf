import React, { useState } from "react";
import {
    Box,
    GridItem,
    SimpleGrid,
    Text,
    Image,
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

function ShareBookDetails(name, imageURL, author) {
    return (
        <>
            <Card>
                <CardBody>

                    <SimpleGrid columns={5} spacing={4} >
                        <GridItem>
                            <Box border={"1px"}
                                borderColor={"blue.200"}
                                rounded={"md"}>
                                <Image
                                    src={imageURL}
                                    

                                />
                                
                            
                            </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Box>

                                <Text pt="2" fontSize="sm">
                                    {name}
                                    by {author}
                                </Text>
                            </Box>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <Box>

                                <Text pt="2" fontSize="sm" marginLeft={50}>
                                    See a detailed analysis of all your business clients.
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
