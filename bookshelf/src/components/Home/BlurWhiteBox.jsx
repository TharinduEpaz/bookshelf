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
import React from "react";
import Search from "../Search";

function BlurWhiteBox({ title, image }) {
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
            fontWeight={"600"}
            w={"100%"}
            lineHeight={{lg:'50px',sm:'30px'}}
            ml={5}
            mt={5}
            color={"blue.700"}
            fontSize={{lg:'2.0rem', sm:'xl'}}
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
           <Button ml={5} colorScheme="purple" w={100} borderRadius={100}>Shop</Button> 
           <Search />
           
        </GridItem>
        
      </Grid>
    </Box>
  );
}

export default BlurWhiteBox;