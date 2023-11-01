import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import axios from "axios";

// const data = {
//   id: 1234,
//   imageURL:
//     'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=4600&q=80',
//   name: 'Wayfarer Classic',
//   author: 'Ravi Silva',
//   price: 'Rs. 1000',
//   rating: 4.5,
// };

function DonationCard({name, regNum, type}) {
  const id = "HJ0825-2015";
  
  const imageURL =
    "https://image.shutterstock.com/image-photo/image-260nw-1847355181.jpg";

  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("rgba(2,2,2,0)", "gray.800")}
        maxW={"200px"}
        h={"330px"}
        borderWidth="1px"
        rounded="lg"
        shadow={"sm"}
        position="relative"
      >
        {/* {data.isNew && (
            <Circle
              size="10px"
              position="absolute"
              top={2}
              right={2}
              bg="red.200"
            />
          )} */}

        <Image
          src={imageURL}
          alt={`Picture of ${name}`}
          roundedTop="lg"
          boxSize={"200px"}
          objectFit="scale-down"
        />

        <Box p="6">
          <Flex mt="1" justifyContent="center" alignContent="center">
            <Box fontSize="sm" fontWeight="light" lineHeight="tight">
              <Heading size={"sm"}>{name}</Heading>
              {regNum}
            </Box>
          </Flex>

          <Flex alignContent="center" direction={"column"} mt={2}>
            {/* <Rating rating={rating} /> */}
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              <Box
                as="span"
                color={"gray.600"}
                fontSize="lg"
                justifyContent={"center"}
                display={"flex"}
                mt={"2"}
              >
                {type}
              </Box>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}

export default DonationCard;
