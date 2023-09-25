import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
} from "@chakra-ui/react";
import React from "react";

function HomeItemBox({ header, bgColor, icon }) {
  return (
    <Card
      w={180}
      zoom={0.8}
      borderRadius={10}
      bgColor={bgColor}
      transition={"all 0.5s ease-out"}
      
      _hover={{ boxShadow: "xl", zoom:'1', transition: "all 0.1s ease-in-out" }}
    >
      <CardHeader>{icon}</CardHeader>
      <CardBody>
        <Heading size={"sm"} color={"blue.800"}>
          {header}
        </Heading>
        <Button variant={"link"} size={"xs"} p={0}>
          Shop Now
        </Button>
      </CardBody>
    </Card>
  );
}

export default HomeItemBox;
