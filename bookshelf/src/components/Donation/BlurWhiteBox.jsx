import {
  Box,
  Heading,
  Highlight,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import Search from "../Search";

function BlurWhiteBox({ title, image, mainButton,route,mainButton1,route1 }) {
  return (
    <Box
      m={"auto"}
      mt={10}
      w="80%"
      h="40vh"
      borderRadius="2xl"
      boxShadow="sm"
      bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.5))"
      // filter="blur(8px)"
      backdropFilter="blur(8px)"
      p={4}
    >
      <Grid
        h="35vh"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        
        // overflow={'hidden'}
      >
        <GridItem rowSpan={3} colSpan={3}>
          <Heading
            fontWeight={"100"}
            w={"100%"}
            lineHeight={"50px"}
            ml={5}
            mt={5}
            color={"blue.700"}
            fontSize={{lg:'2.5rem', sm:'2xl'}}
          >
            {title}
          </Heading>
        </GridItem>
        <GridItem rowSpan={5} colSpan={2}>
          <Image
            boxSize={"xsm"}
            objectFit={"cover"}
            src={image}
            position={"relative"}
            top={-5}
            
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={3}  alignItems={'top'} display={'flex'}>
        <Link to={route}>
           <Button ml={5} colorScheme="purple" pl={10} pr={10} borderRadius={100}>{mainButton}</Button> 
            </Link>
   
            <Link to={route1}>
           <Button ml={5} colorScheme="green" pl={10} pr={10} borderRadius={100}>{mainButton1}</Button> 
            </Link>
           
        </GridItem>
        
      </Grid>
    </Box>
  );
}

export default BlurWhiteBox;
