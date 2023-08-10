import React from "react";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "../components/Account/Sidebar";
import { Outlet } from "react-router-dom";

function Account() {
  return (
    <>
      <Box
        height={"100%"}
        m={"auto"}
        mt={10}
        w="80%"
        borderRadius="md"
        boxShadow="sm"
        bgGradient="linear(to top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.5))"
        // filter="blur(8px)"
        backdropFilter="blur(8px)"
        p={10}
      >
        <Grid templateColumns="repeat(4, 1fr)" templateRows="repeat(1,1fr)">
          <GridItem colSpan={1} rowSpan={1}>
            <Sidebar />
          </GridItem>

          <GridItem colSpan={3} rowSpan={1}>
            <Outlet />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Account;
