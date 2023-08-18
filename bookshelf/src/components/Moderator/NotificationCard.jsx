import { Card, CardBody, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

export default function NotificationCard({ text, time, description }) {
  return (
    <>
      <Card>
        <CardBody>
          <Flex>
            <Stack>
            <Text fontWeight={"semibold"}>{text}</Text>
            <Text>{description}</Text>
            </Stack>
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
