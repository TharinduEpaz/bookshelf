import React, { useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Stack,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Divider,
  Image,
} from "@chakra-ui/react";
import Search from "../../components/Sharing/Search";
import Filter from "../../components/Sharing/Filter";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";

import { MdAddBox, MdDelete } from "react-icons/md";
import { AiFillExclamationCircle } from "react-icons/ai";

function ShareBook() {
  return (
    <Box
      border={"1px"}
      borderRadius={"10"}
      borderColor={"blue.200"}
      padding={10}
    >
      <Grid
        templateRows="50px 50px repeat(8, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={2}
        h={"100%"}
      >
        <GridItem rowSpan={1} colSpan={5}>
          <Search />
        </GridItem>
        <GridItem rowSpan={1} colSpan={5} p={2}>
          <Filter />
        </GridItem>

        <GridItem
          rowSpan={8}
          colSpan={4}
          border={"1px"}
          borderColor={"blue.200"}
          rounded={"md"}
        >
          <Card>
            <CardBody>
              {/* <Text>
                View a summary of all your customers over the last month.
              </Text> */}
              <SimpleGrid columns={5} spacing={4}>
                <GridItem>
                  <Box>
                  <Image
      src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
      alt='Green double couch with wooden legs'
      borderRadius='lg'
    />
                    
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box>
                    
                    <Text pt="2" fontSize="sm">
                      Check out the overview of your clients.
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
        </GridItem>
      </Grid>
    </Box>
  );
}
export default ShareBook;
