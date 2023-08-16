import { Card, CardBody, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export default function NotificationCard({ text, time }) {
  return (
    <>
      <Card>
        <CardBody>
          <Flex>
            <Text fontWeight={"regular"}>{text}</Text>
            <Spacer />
            <Text fontSize="xs" color="gray.500" mt={5}>
              {time}
            </Text>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
}
