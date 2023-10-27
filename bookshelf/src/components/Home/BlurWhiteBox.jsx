import {
  Box,
  Heading,
  Highlight,
  Text,
  Image,
  Grid,
  GridItem,
  Button,
  Card,
  CardBody,
  
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React from "react";
import Search from "../Search";

function BlurWhiteBox({ title, image, mainButton,route }) {
  return (
    <Box
      m={"auto"}
      mt={10}
      w="80%"
      h="50vh"
      borderRadius="2xl"
      boxShadow="sm"
      bgGradient="linear(to left, rgba(255, 255, 235, 0.1), rgba(255, 255, 255, 0.05))"
      // filter="blur(8px)"
      backdropFilter="blur(8px)"
      p={4}
      
      
    >
      <Grid
        h="100%"
        templateRows="repeat(5, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
        // overflow={'hidden'}
      >
        <GridItem rowSpan={3} colSpan={3}>
          {/* <Heading
            fontWeight={"600"}
            w={"100%"}
            lineHeight={{lg:'50px',sm:'30px'}}
            ml={5}
            mt={5}
            color={"blue.700"}
            fontSize={{lg:'4.0rem', sm:'xl'}}
          >
            {title}
          </Heading> */}

<Text
  bgGradient='linear(to-br, #2A4365, #3182CE)'
  bgClip='text'
  fontSize={{lg:'5xl',md:'xl', sm:'xl'}}
  fontWeight='bold'
  fontFamily={'bricolage grotesque'}
  position={'absolute'}
  width={'50%'}
  ml={'5%'}
  mt={'3%'}
>
  {title}
</Text>




        </GridItem>
        <GridItem rowSpan={5} colSpan={2}>
          <Image
            boxSize={"xsm"}
            objectFit={"cover"}
            src={image}
            position={"relative"}
            top={-5}
            left={-100}
            
            
          />
        </GridItem>
        <GridItem rowSpan={2} colSpan={3} pt={'2%'} pl={'8%'}>
        {/* <Link to={route}>
           <Button ml={5} colorScheme="purple" pl={10} pr={10} borderRadius={100}>{mainButton}</Button> 
            </Link> */}
           <Search/>
          
           
        </GridItem>
        
      </Grid>
    </Box>
  );
}

export default BlurWhiteBox;