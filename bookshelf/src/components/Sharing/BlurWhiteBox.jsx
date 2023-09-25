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
  import { Link as RouterLink } from "react-router-dom";
  
  export function BlurWhiteBox({ title, image, mainButton,route }) {
    return (
      <Box
        m={"auto"}
        mt={2}
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
              lineHeight={"50px"}
              ml={5}
              mt={5}
              color={"blue.700"}
              fontSize={{lg:'2.5rem', sm:'xl'}}
            >
              {title}
            </Heading>
          </GridItem>
          <GridItem rowSpan={5} colSpan={2} objectFit={'cover'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Image

            boxSize={"xsm"}
          
            src={image}
            position={"relative"}
            top={-2}
            // width={'100%'}
            height={'100%'}              
            />
          </GridItem>
          <GridItem rowSpan={2} colSpan={3}  alignItems={'top'} display={'flex'}>
          
                <RouterLink  to="/postRequest">
                    <Button ml={5} pl={10} pr={10} colorScheme="purple" w={130} borderRadius={100}>Post Request</Button>
                </RouterLink>
          
             {/* <Search /> */}
             
          </GridItem>
          
        </Grid>
      </Box>
    );
  }
  
  export default BlurWhiteBox;
  