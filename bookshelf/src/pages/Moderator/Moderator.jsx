import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import SideMenu from "../../components/Moderator/SIdeMenu";


export default function Moderator() {
  return (
    <>
      <Box
        h="auto"
        m={"auto"}
        mt={10}
        w="95%"
        borderRadius="md"
        boxShadow="sm"
        bgColor={"white"}
        // bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid
          templateColumns="repeat(7, 1fr)"
          gap={2}
          h={"100%"}
          minHeight={"80vh"}
        >
          <GridItem
            colSpan={1}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <SideMenu />
          </GridItem>
          <GridItem
            colSpan={6}
            border={"1px"}
            borderColor={"blue.200"}
            rounded={"md"}
          >
            <Outlet />
          </GridItem>
        </Grid>
      </Box>
    </>
  )
}
