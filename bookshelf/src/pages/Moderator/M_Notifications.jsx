import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NotificationCard from "../../components/Moderator/NotificationCard";

export default function Notifications() {
  return (
    <>
      <Box p={10}>
        <Flex>
          <Text fontSize="lg" fontWeight={"bold"}>
            Notifications
          </Text>
        </Flex>

        <Flex gap={10} direction={"column"} mt={10}>
          <Flex gap={2} direction={"column"}>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              Today
            </Text>
            <NotificationCard text="New user registered" time="9.52 P.M" />
            <NotificationCard text="New order received" time="8.00 P.M" />
          </Flex>

          <Flex gap={2} direction={"column"}>
            <Text fontSize={"sm"} fontWeight={"semibold"}>
              Yesterday
            </Text>
            <NotificationCard text="New user registered" time="9.52 P.M" />
            <NotificationCard text="New user registered" time="8.00 P.M" />
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
